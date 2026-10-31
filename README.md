# SparkX CFS Planner

Aplicación web Blazor para planificar cambios de color del CFS de una impresora 3D SparkX I7.

## Qué hace

- Guarda los colores actuales del CFS
- Registra qué pieza o archivo vas a imprimir con esos colores
- Define qué slot se cambia y a qué nuevo color
- Guarda el nombre del material montado en cada slot y el material nuevo
- Muestra una vista visual de los colores antes y después del cambio
- Permite crear, cambiar y eliminar varios planes con nombre
- Permite reordenar la secuencia arrastrando los pasos o usando las flechas
- Incluye una vista de impresión que el navegador puede guardar como PDF
- Guarda planes y favoritos en `localStorage` del navegador, sin un servidor de datos
- Exporta un backup JSON versionado que incluye el plan y los colores favoritos
- Importa backups JSON y planes JSON de versiones anteriores (reemplaza el plan actual después de pedir confirmación)
- Exporta un CSV con los colores individuales de cada slot antes y después del cambio
- Guarda la referencia a archivos o rutas de impresión

## Ejecutar

```bash
dotnet run --project .\3DColorsPlanner\3DColorsPlanner.csproj
```

Después abre la URL:

```text
http://localhost:5066
```

## Datos guardados

Los datos se guardan en el almacenamiento local del navegador y quedan separados por navegador, perfil y sitio. No se sincronizan entre equipos; borrar los datos del sitio o usar navegación privada puede eliminarlos. Usa «Backup JSON» para conservar una copia portable.

Los JSON que estaban antes en `3DColorsPlanner\Data` no se pueden leer automáticamente desde WebAssembly. Para recuperar los datos, importa `3DColorsPlanner\Data\cfs-plan.json` y `3DColorsPlanner\Data\favorite-colors.json` por separado desde «Importar JSON».

## Publicar como sitio estático

El proyecto se puede publicar en un hosting estático, como GitHub Pages:

```bash
dotnet publish .\3DColorsPlanner\3DColorsPlanner.csproj -c Release -o .\publish
```

El contenido publicable queda en `publish\wwwroot`; incluye `404.html` como fallback para las rutas internas de GitHub Pages, por ejemplo `/print`.

Los backups y CSV se descargan desde el navegador. El CSV sirve para consultar o trabajar en una hoja de cálculo; el backup JSON es el formato recomendado para restaurar el plan completo.

## Flujo recomendado

1. Selecciona un plan existente o crea uno con nombre.
2. Elige los colores y materiales actuales del CFS.
3. Indica el archivo o ruta que vas a imprimir con ese estado.
4. Selecciona el slot, el color y el nombre del material nuevo.
5. Guarda el paso y ajusta la secuencia con arrastre o flechas si hace falta.
6. Abre «Imprimir / PDF» y selecciona «Guardar como PDF» en el diálogo del navegador.
