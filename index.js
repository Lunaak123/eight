document.getElementById('loadFile').addEventListener('click', handleFile);

async function handleFile() {
    const fileUrl = document.getElementById('fileInput').value;
    if (!fileUrl) {
        alert("Please enter a valid URL.");
        return;
    }

    try {
        const response = await fetch(fileUrl);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });

        const sheetList = document.getElementById('sheet-list');
        sheetList.innerHTML = ''; // Clear any existing sheet list

        workbook.SheetNames.forEach((sheetName) => {
            const button = document.createElement('button');
            button.textContent = sheetName;
            button.addEventListener('click', () => {
                const sheetUrl = `sheet.html?fileUrl=${encodeURIComponent(fileUrl)}&sheetName=${encodeURIComponent(sheetName)}`;
                window.location.href = sheetUrl;
            });
            sheetList.appendChild(button);
        });
    } catch (error) {
        console.error("Error loading the file:", error);
        alert("Failed to load the Excel file. Please check the URL.");
    }
}
