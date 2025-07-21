let earningsRows = [];
let deductionRows = [];

function addEarningsRow() {
    const table = document.getElementById('earningsBody');
    const row = document.createElement('tr');
    row.innerHTML = `
                <td><input type="text" placeholder="Earnings Type" style="font-size:12px;" aria-label="New Earnings Type"></td>
                <td><input type="number" placeholder="Enter Amount" oninput="calculateTotals()" style="font-size:12px;" aria-label="New Earnings Amount"></td>
            `;
    table.appendChild(row);
}

function addDeductionsRow() {
    const table = document.getElementById('deductionsBody');
    const row = document.createElement('tr');
    row.innerHTML = `
                <td><input type="text" placeholder="Deduction Type" style="font-size:12px;" aria-label="New Deduction Type"></td>
                <td><input type="number" placeholder="Enter Amount" oninput="calculateTotals()" style="font-size:12px;" aria-label="New Deduction Amount"></td>
            `;
    table.appendChild(row);
}

function addAnotherField() {
    const table = document.getElementById('additionalFieldsTable');
    const row = document.createElement('tr');
    row.innerHTML = `
                <td><input type="text" placeholder="Field Name" style="font-size:12px;" aria-label="New Field Name"></td>
                <td><input type="text" placeholder="Value" style="font-size:12px;" aria-label="New Field Value"></td>
            `;
    table.appendChild(row);
}

function calculateTotals() {
    let totalEarnings = 0;
    document.querySelectorAll('#earningsBody input[type="number"]').forEach(input => {
        const value = Number(input.value) || 0;
        if (value < 0) {
            input.value = 0;
            alert('Negative values are not allowed.');
        }
        totalEarnings += value;
    });
    document.getElementById('totalEarnings').textContent = `₹ ${totalEarnings.toFixed(2)}`;
    document.getElementById('totalEarningsDisplay').textContent = `₹ ${totalEarnings.toFixed(2)}`;

    let totalDeductions = 0;
    document.querySelectorAll('#deductionsBody input[type="number"]').forEach(input => {
        const value = Number(input.value) || 0;
        if (value < 0) {
            input.value = 0;
            alert('Negative values are not allowed.');
        }
        totalDeductions += value;
    });
    document.getElementById('totalDeductions').textContent = `₹ ${totalDeductions.toFixed(2)}`;
    document.getElementById('totalDeductionsDisplay').textContent = `₹ ${totalDeductions.toFixed(2)}`;

    const totalNetPayable = totalEarnings - totalDeductions;
    document.getElementById('totalNetPayable').textContent = `₹ ${totalNetPayable.toFixed(2)}`;
}

function loadLogo() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        if (file.size > 1024 * 1024) {
            alert('File size exceeds 1MB limit.');
            return;
        }
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                if (img.width !== 240 || img.height !== 240) {
                    alert('Image must be 240x240 pixels.');
                    return;
                }
                const uploadButton = document.getElementById('uploadButton');
                uploadButton.style.backgroundImage = `url('${event.target.result}')`;
                uploadButton.innerText = '';
                uploadButton.style.backgroundSize = 'cover';
                uploadButton.style.backgroundColor = 'transparent';
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function printPayslip() {
    window.print();
}

function resetForm() {
    document.getElementById('fileInput').value = '';
    document.getElementById('date').value = '';
    document.querySelectorAll('.employee-summary input').forEach(input => {
        input.value = input.type === 'number' ? '0' : '';
    });
    document.getElementById('earningsBody').innerHTML = `
                <tr><td>Basic</td><td><input type="number" value="0" oninput="calculateTotals()" style="font-size:12px;" aria-label="Basic Earnings"></td></tr>
                <tr><td>House Rent Allowance</td><td><input type="number" value="0" oninput="calculateTotals()" style="font-size:12px;" aria-label="House Rent Allowance"></td></tr>
            `;
    document.getElementById('deductionsBody').innerHTML = `
                <tr><td>Income Tax</td><td><input type="number" value="0" oninput="calculateTotals()" style="font-size:12px;" aria-label="Income Tax"></td></tr>
                <tr><td>Provident Fund</td><td><input type="number" value="0" oninput="calculateTotals()" style="font-size:12px;" aria-label="Provident Fund"></td></tr>
            `;
    document.getElementById('additionalFieldsTable').innerHTML = `
                <tr><td>Pay Period</td><td><input type="text" placeholder="Eg. 22" style="font-size:12px;" aria-label="Pay Period"></td></tr>
                <tr><td>Loss of Pay Days</td><td><input type="number" value="0" style="font-size:12px;" aria-label="Loss of Pay Days"></td></tr>
                <tr><td>Paid Days</td><td><input type="number" value="0" style="font-size:12px;" aria-label="Paid Days"></td></tr>
            `;
    const uploadButton = document.getElementById('uploadButton');
    uploadButton.style.backgroundImage = '';
    uploadButton.innerText = 'Upload Logo';
    uploadButton.style.backgroundColor = 'transparent';
    uploadButton.style.background = 'linear-gradient(45deg, #4a90e2, #357abd)';
    calculateTotals();
}