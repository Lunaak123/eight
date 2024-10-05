document.getElementById('fileInput').addEventListener('change', handleFile);

function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetList = document.getElementById('sheet-list');
        sheetList.innerHTML = ''; // Clear any existing sheet list

        workbook.SheetNames.forEach((sheetName) => {
            const button = document.createElement('button');
            button.textContent = sheetName;
            button.addEventListener('click', () => {
                const fileUrl = URL.createObjectURL(file);
                const sheetUrl = `sheet.html?fileUrl=${encodeURIComponent(fileUrl)}&sheetName=${encodeURIComponent(sheetName)}`;
                window.location.href = sheetUrl;
            });
            sheetList.appendChild(button);
        });
    };
    reader.readAsArrayBuffer(file);
}
