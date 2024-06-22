document.getElementById('addRow').addEventListener('click', addRow);
document.getElementById('reset').addEventListener('click', resetTable);
document.getElementById('calculate').addEventListener('click', calculateGPA);
document.querySelectorAll('.removeRow').forEach(button => {
    button.addEventListener('click', removeRow);
});

function addRow() {
    const table = document.getElementById('gpaTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    const toggleCell = newRow.insertCell(0);
    const courseCell = newRow.insertCell(1);
    const gradeCell = newRow.insertCell(2);
    const weightCell = newRow.insertCell(3);
    const removeCell = newRow.insertCell(4);
    
    toggleCell.innerHTML = '<input type="checkbox" class="row-toggle" checked>';
    courseCell.innerHTML = '<input type="text" placeholder="Course Name" class="input-field">';
    gradeCell.innerHTML = `<select class="input-field">
        <option value="NaN">--</option>
        <option value="4">A</option>
        <option value="3.7">A-</option>
        <option value="3.3">B+</option>
        <option value="3">B</option>
        <option value="2.7">B-</option>
        <option value="2.3">C+</</option>
        <option value="2">C</option>
        <option value="1.7">C-</option>
        <option value="1.3">D+</option>
        <option value="1">D</option>
        <option value="0.7">D-</option>
        <option value="0">F</option>
    </select>`;
    weightCell.innerHTML = '<input type="number" placeholder="Class Weight" class="input-field">';
    removeCell.innerHTML = '<button class="removeRow">❌</button>';
    
    removeCell.querySelector('.removeRow').addEventListener('click', removeRow);
}

function removeRow(event) {
    const row = event.target.closest('tr');
    row.remove();
}

function resetTable() {
    const table = document.getElementById('gpaTable').getElementsByTagName('tbody')[0];
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
    addRow();
    document.getElementById('gpaResult').style.display = 'none';
    document.getElementById('errorMessages').style.display = 'none';
}

function calculateGPA() {
    const rows = document.querySelectorAll('#gpaTable tbody tr');
    let totalCredits = 0;
    let totalPoints = 0;
    let errorMessage = "";
    let hasError = false;

    rows.forEach(row => {
        const toggle = row.querySelector('.row-toggle').checked;
        if (toggle) {
            const grade = parseFloat(row.querySelector('select').value);
            const weight = parseFloat(row.querySelector('input[type="number"]').value);

            if (isNaN(grade)) {
                errorMessage = "ERROR: Choose a letter grade";
                hasError = true;
            } else if (isNaN(weight)) {
                errorMessage = "ERROR: Enter a value for Weight";
                hasError = true;
            } else if (weight < 0 || weight > 5) {
                errorMessage = "ERROR: Enter the correct range from 0-5";
                hasError = true;
            } else {
                totalCredits += weight;
                totalPoints += grade * weight;
            }
        }
    });

    const errorContainer = document.getElementById('errorMessages');
    if (hasError) {
        errorContainer.innerHTML = `<p>${errorMessage}</p>`;
        errorContainer.style.display = 'block';
        document.getElementById('gpaResult').style.display = 'none';
    } else {
        errorContainer.style.display = 'none';
        const gpa = totalPoints / totalCredits;
        document.getElementById('gpaValue').innerText = isNaN(gpa) ? '0.00' : gpa.toFixed(2);
        document.getElementById('gpaResult').style.display = 'block';
    }
}

addRow(); 
