namespace _3DColorsPlanner.Models;

public class CfsPlan
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = "Plan de colores SparkX I7";
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public List<CfsPlanStep> Steps { get; set; } = new();
}

public class CfsPlanStep
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = "Cambio de color";
    public string CurrentPrintReference { get; set; } = string.Empty;
    public string NextPrintReference { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
    public List<string> CurrentColors { get; set; } = new() { "#D9D9D9", "#D9D9D9", "#D9D9D9", "#D9D9D9" };
    public List<string> CurrentMaterialNames { get; set; } = new() { "", "", "", "" };
    public int ChangedSlotIndex { get; set; }
    public string ReplacementColor { get; set; } = "#FF8C00";
    public string ReplacementMaterialName { get; set; } = string.Empty;
    public List<string> FinalColors { get; set; } = new() { "#D9D9D9", "#D9D9D9", "#D9D9D9", "#D9D9D9" };
    public List<string> FinalMaterialNames { get; set; } = new() { "", "", "", "" };
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public void RefreshFinalColors()
    {
        var updatedColors = CurrentColors.ToList();

        if (ChangedSlotIndex >= 0 && ChangedSlotIndex < updatedColors.Count)
        {
            updatedColors[ChangedSlotIndex] = string.IsNullOrWhiteSpace(ReplacementColor)
                ? updatedColors[ChangedSlotIndex]
                : ReplacementColor;
        }

        FinalColors = updatedColors;
    }

    public void RefreshFinalMaterialNames()
    {
        var updatedNames = CurrentMaterialNames.ToList();
        if (ChangedSlotIndex >= 0 && ChangedSlotIndex < updatedNames.Count)
        {
            updatedNames[ChangedSlotIndex] = ReplacementMaterialName?.Trim() ?? string.Empty;
        }

        FinalMaterialNames = updatedNames;
    }
}

public class FavoriteColor
{
    public string Name { get; set; } = string.Empty;
    public string Hex { get; set; } = "#FFFFFF";
}

public class PlanBackup
{
    public string Format { get; set; } = "3dcolorsplanner-backup";
    public int FormatVersion { get; set; } = 1;
    public DateTime ExportedAtUtc { get; set; } = DateTime.UtcNow;
    public CfsPlan? Plan { get; set; } = new();
    public List<FavoriteColor>? FavoriteColors { get; set; } = new();
}

public record PlanImportResult(CfsPlan? Plan, List<FavoriteColor>? FavoriteColors, bool IsLegacyPlan, bool IsLegacyFavorites);

public record PlanSummary(Guid Id, string Name, DateTime UpdatedAt);
