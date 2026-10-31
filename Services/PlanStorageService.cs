using System.Text;
using System.Text.Json;
using Microsoft.JSInterop;
using _3DColorsPlanner.Models;

namespace _3DColorsPlanner.Services;

public class PlanStorageService
{
    private const string BackupFormat = "3dcolorsplanner-backup";
    private const int BackupVersion = 2;
    private const string StorageKey = "3dcolorsplanner.browser-data.v1";
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        WriteIndented = true,
    };

    private readonly IJSRuntime _js;

    public PlanStorageService(IJSRuntime js)
    {
        _js = js;
    }

    public async Task<CfsPlan> LoadAsync()
    {
        return await LoadActivePlanAsync();
    }

    public async Task SaveAsync(CfsPlan plan)
    {
        plan = NormalizePlan(plan);
        plan.UpdatedAt = DateTime.UtcNow;
        var store = await ReadStoreAsync();
        var index = store.Plans.FindIndex(saved => saved.Id == plan.Id);
        if (index < 0)
        {
            store.Plans.Add(plan);
        }
        else
        {
            store.Plans[index] = plan;
        }

        store.ActivePlanId = plan.Id;
        await WriteStoreAsync(store);
    }

    public async Task<List<PlanSummary>> LoadPlansAsync()
    {
        var store = await ReadStoreAsync();
        if (store.Plans.Count == 0)
        {
            store.Plans.Add(new CfsPlan());
        }

        store.Plans = store.Plans.Select(NormalizePlan).ToList();
        if (store.ActivePlanId is null || store.Plans.All(item => item.Id != store.ActivePlanId.Value))
        {
            store.ActivePlanId = store.Plans[0].Id;
        }

        await WriteStoreAsync(store);

        return store.Plans
            .OrderByDescending(item => item.UpdatedAt)
            .Select(item => new PlanSummary(item.Id, item.Name, item.UpdatedAt))
            .ToList();
    }

    public async Task<CfsPlan> LoadActivePlanAsync()
    {
        var store = await ReadStoreAsync();
        if (store.Plans.Count == 0)
        {
            store.Plans.Add(new CfsPlan());
        }

        var active = store.Plans.FirstOrDefault(item => item.Id == store.ActivePlanId) ?? store.Plans[0];
        store.ActivePlanId = active.Id;
        active = NormalizePlan(active);
        await WriteStoreAsync(store);
        return active;
    }

    public async Task<CfsPlan> LoadPlanAsync(Guid id)
    {
        var store = await ReadStoreAsync();
        return NormalizePlan(store.Plans.FirstOrDefault(item => item.Id == id)
            ?? throw new InvalidDataException("No se encontró el plan seleccionado."));
    }

    public async Task SetActivePlanAsync(Guid id)
    {
        var store = await ReadStoreAsync();
        if (store.Plans.All(item => item.Id != id))
        {
            throw new InvalidDataException("No se encontró el plan seleccionado.");
        }

        store.ActivePlanId = id;
        await WriteStoreAsync(store);
    }

    public async Task<CfsPlan> CreatePlanAsync(string name)
    {
        var plan = new CfsPlan { Name = name.Trim() };
        var store = await ReadStoreAsync();
        store.Plans.Add(plan);
        store.ActivePlanId = plan.Id;
        await WriteStoreAsync(store);
        return plan;
    }

    public async Task DeletePlanAsync(Guid id)
    {
        var store = await ReadStoreAsync();
        if (store.Plans.Count <= 1)
        {
            throw new InvalidOperationException("Debe quedar al menos un plan guardado.");
        }

        var planToRemove = store.Plans.FirstOrDefault(item => item.Id == id);
        if (planToRemove is null)
        {
            throw new InvalidDataException("No se encontró el plan que quieres eliminar.");
        }

        store.Plans.Remove(planToRemove);
        if (store.ActivePlanId == id)
        {
            store.ActivePlanId = store.Plans[0].Id;
        }

        await WriteStoreAsync(store);
    }

    public string CreateBackupJson(CfsPlan plan, List<FavoriteColor> favoriteColors)
    {
        var backup = new PlanBackup
        {
            Format = BackupFormat,
            FormatVersion = BackupVersion,
            ExportedAtUtc = DateTime.UtcNow,
            Plan = NormalizePlan(plan),
            FavoriteColors = NormalizeFavoriteColors(favoriteColors),
        };

        return JsonSerializer.Serialize(backup, JsonOptions);
    }

    public async Task<PlanImportResult> ReadImportAsync(Stream stream)
    {
        using var document = await JsonDocument.ParseAsync(stream);
        var root = document.RootElement;
        if (root.ValueKind == JsonValueKind.Array)
        {
            var legacyFavorites = JsonSerializer.Deserialize<List<FavoriteColor>>(root.GetRawText(), JsonOptions)
                ?? throw new InvalidDataException("No se pudieron leer los colores favoritos.");
            return new PlanImportResult(null, NormalizeFavoriteColors(legacyFavorites), false, true);
        }

        if (root.ValueKind != JsonValueKind.Object)
        {
            throw new InvalidDataException("El archivo debe contener un objeto JSON.");
        }

        if (TryGetProperty(root, "Format", out _))
        {
            var backup = JsonSerializer.Deserialize<PlanBackup>(root.GetRawText(), JsonOptions)
                ?? throw new InvalidDataException("No se pudo leer la copia de seguridad.");

            if (!string.Equals(backup.Format, BackupFormat, StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidDataException("El archivo no es una copia de seguridad de 3DColors Planner.");
            }

            if (backup.FormatVersion > BackupVersion || backup.FormatVersion < 1)
            {
                throw new InvalidDataException($"La versión de copia ({backup.FormatVersion}) no es compatible.");
            }

            if (backup.Plan is null)
            {
                throw new InvalidDataException("La copia no contiene un plan.");
            }

            return new PlanImportResult(
                NormalizePlan(backup.Plan),
                NormalizeFavoriteColors(backup.FavoriteColors),
                false,
                false);
        }

        if (TryGetProperty(root, "Steps", out _))
        {
            var legacyPlan = JsonSerializer.Deserialize<CfsPlan>(root.GetRawText(), JsonOptions)
                ?? throw new InvalidDataException("No se pudo leer el plan JSON.");
            return new PlanImportResult(NormalizePlan(legacyPlan), null, true, false);
        }

        throw new InvalidDataException("El JSON no tiene el formato de copia esperado ni contiene una lista de pasos.");
    }

    public string CreateCsv(CfsPlan plan)
    {
        plan = NormalizePlan(plan);
        var csv = new StringBuilder();
        csv.AppendLine("id,name,current_print_reference,next_print_reference,slot,previous_color,new_color,new_material,current_slot_1,current_slot_2,current_slot_3,current_slot_4,current_material_1,current_material_2,current_material_3,current_material_4,final_slot_1,final_slot_2,final_slot_3,final_slot_4,final_material_1,final_material_2,final_material_3,final_material_4,notes,created_at_utc");

        foreach (var step in plan.Steps)
        {
            var values = new List<string>
            {
                step.Id.ToString(), step.Name, step.CurrentPrintReference, step.NextPrintReference,
                (step.ChangedSlotIndex + 1).ToString(), step.CurrentColors[step.ChangedSlotIndex],
                step.ReplacementColor, step.ReplacementMaterialName,
            };
            values.AddRange(step.CurrentColors);
            values.AddRange(step.CurrentMaterialNames);
            values.AddRange(step.FinalColors);
            values.AddRange(step.FinalMaterialNames);
            values.Add(step.Notes);
            values.Add(step.CreatedAt.ToUniversalTime().ToString("O"));
            csv.AppendLine(string.Join(',', values.Select(CsvCell)));
        }

        return csv.ToString();
    }

    public async Task<List<FavoriteColor>> LoadFavoriteColorsAsync()
    {
        var store = await ReadStoreAsync();
        return NormalizeFavoriteColors(store.FavoriteColors);
    }

    public async Task SaveFavoriteColorsAsync(List<FavoriteColor> colors)
    {
        var sanitized = NormalizeFavoriteColors(colors);

        var store = await ReadStoreAsync();
        store.FavoriteColors = sanitized;
        await WriteStoreAsync(store);
    }

    public List<FavoriteColor> NormalizeFavoriteColors(List<FavoriteColor>? colors)
    {
        var sanitized = (colors ?? new List<FavoriteColor>())
            .OfType<FavoriteColor>()
            .Where(color => !string.IsNullOrWhiteSpace(color.Name) && !string.IsNullOrWhiteSpace(color.Hex))
            .Select(color => new FavoriteColor
            {
                Name = color.Name.Trim(),
                Hex = color.Hex.Trim().ToUpperInvariant(),
            })
            .Where(color => IsValidHex(color.Hex))
            .DistinctBy(color => color.Hex, StringComparer.OrdinalIgnoreCase)
            .ToList();

        if (sanitized.Count == 0)
        {
            sanitized = GetDefaultFavoriteColors();
        }

        return sanitized;
    }

    private static CfsPlan NormalizePlan(CfsPlan? plan)
    {
        plan ??= new CfsPlan();
        if (plan.Id == Guid.Empty)
        {
            plan.Id = Guid.NewGuid();
        }

        plan.Name = string.IsNullOrWhiteSpace(plan.Name) ? "Plan de colores SparkX I7" : plan.Name.Trim();
        if (plan.UpdatedAt == default)
        {
            plan.UpdatedAt = DateTime.UtcNow;
        }

        plan.Steps ??= new List<CfsPlanStep>();
        plan.Steps.RemoveAll(step => step is null);

        var usedIds = new HashSet<Guid>();
        foreach (var step in plan.Steps)
        {
            step.Name = string.IsNullOrWhiteSpace(step.Name) ? "Cambio de color" : step.Name.Trim();
            step.CurrentPrintReference ??= string.Empty;
            step.NextPrintReference ??= string.Empty;
            step.Notes ??= string.Empty;
            step.CurrentColors ??= new List<string>();
            step.CurrentColors = Enumerable.Range(0, 4)
                .Select(index => index < step.CurrentColors.Count && IsValidHex(step.CurrentColors[index])
                    ? step.CurrentColors[index].ToUpperInvariant()
                    : "#D9D9D9")
                .ToList();
            step.CurrentMaterialNames ??= new List<string>();
            step.CurrentMaterialNames = Enumerable.Range(0, 4)
                .Select(index => index < step.CurrentMaterialNames.Count
                    ? step.CurrentMaterialNames[index]?.Trim() ?? string.Empty
                    : string.Empty)
                .ToList();
            step.ChangedSlotIndex = Math.Clamp(step.ChangedSlotIndex, 0, 3);
            step.ReplacementColor = IsValidHex(step.ReplacementColor)
                ? step.ReplacementColor.ToUpperInvariant()
                : "#FF8C00";
            step.ReplacementMaterialName = step.ReplacementMaterialName?.Trim() ?? string.Empty;
            if (step.Id == Guid.Empty || !usedIds.Add(step.Id))
            {
                step.Id = Guid.NewGuid();
                usedIds.Add(step.Id);
            }

            if (step.CreatedAt == default)
            {
                step.CreatedAt = DateTime.UtcNow;
            }

            step.RefreshFinalColors();
            step.RefreshFinalMaterialNames();
        }

        return plan;
    }

    private static bool TryGetProperty(JsonElement element, string propertyName, out JsonElement value)
    {
        foreach (var property in element.EnumerateObject())
        {
            if (string.Equals(property.Name, propertyName, StringComparison.OrdinalIgnoreCase))
            {
                value = property.Value;
                return true;
            }
        }

        value = default;
        return false;
    }

    private async Task<BrowserStore> ReadStoreAsync()
    {
        var json = await _js.InvokeAsync<string?>("planner.getStorageItem", StorageKey);
        if (string.IsNullOrWhiteSpace(json))
        {
            return new BrowserStore { FavoriteColors = GetDefaultFavoriteColors() };
        }

        try
        {
            var store = JsonSerializer.Deserialize<BrowserStore>(json, JsonOptions) ?? new BrowserStore();
            store.Plans ??= new List<CfsPlan>();
            store.FavoriteColors = NormalizeFavoriteColors(store.FavoriteColors);
            return store;
        }
        catch (JsonException)
        {
            return new BrowserStore { FavoriteColors = GetDefaultFavoriteColors() };
        }
    }

    private async Task WriteStoreAsync(BrowserStore store)
    {
        store.FavoriteColors = NormalizeFavoriteColors(store.FavoriteColors);
        var json = JsonSerializer.Serialize(store, JsonOptions);
        await _js.InvokeVoidAsync("planner.setStorageItem", StorageKey, json);
    }

    private static bool IsValidHex(string? value) =>
        value is { Length: 7 } && value[0] == '#' && value.AsSpan(1).ToString().All(Uri.IsHexDigit);

    private static string CsvCell(string value)
    {
        var safeValue = value.Length > 0 && value[0] is '=' or '+' or '-' or '@' or '\t' or '\r'
            ? "'" + value
            : value;
        return "\"" + safeValue.Replace("\"", "\"\"") + "\"";
    }

    private static List<FavoriteColor> GetDefaultFavoriteColors() => new()
    {
        new() { Name = "Blanco", Hex = "#FFFFFF" },
        new() { Name = "Negro", Hex = "#000000" },
        new() { Name = "Rojo", Hex = "#FF0000" },
        new() { Name = "Naranja", Hex = "#FF8C00" },
        new() { Name = "Amarillo", Hex = "#F9F21A" },
        new() { Name = "Verde", Hex = "#00A651" },
        new() { Name = "Azul", Hex = "#01139D" },
        new() { Name = "Morado", Hex = "#8D3BFF" },
        new() { Name = "Rosa", Hex = "#F894FF" },
        new() { Name = "Gris", Hex = "#B8B8B8" },
        new() { Name = "Cian", Hex = "#00D9FF" },
    };

    private static List<string> BuildDefaultColors() => new() { "#D9D9D9", "#D9D9D9", "#D9D9D9", "#D9D9D9" };

    private sealed class BrowserStore
    {
        public List<CfsPlan> Plans { get; set; } = new();
        public Guid? ActivePlanId { get; set; }
        public List<FavoriteColor> FavoriteColors { get; set; } = new();
    }
}
