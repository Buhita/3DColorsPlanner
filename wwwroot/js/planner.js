window.planner = {
    getStorageItem: (key) => window.localStorage.getItem(key),
    setStorageItem: (key, value) => window.localStorage.setItem(key, value),
    downloadFile: (fileName, contentType, base64Content) => {
        const link = document.createElement('a');
        link.href = `data:${contentType};base64,${base64Content}`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
    confirmImport: (fileName) => window.confirm(`Importar "${fileName}" puede reemplazar el plan o los favoritos actuales. ¿Quieres continuar?`),
    confirmDeletePlan: (planName) => window.confirm(`¿Eliminar el plan "${planName}" y todos sus pasos?`),
    printPage: () => window.print()
};

document.addEventListener('click', (event) => {
    if (event.target.closest('#blazor-error-ui .dismiss')) {
        document.getElementById('blazor-error-ui').style.display = 'none';
    }
});
