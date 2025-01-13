document.getElementById('calcType').addEventListener('change', handleCalculationType);
document.getElementById('calculateBtn').addEventListener('click', performCalculation);

function handleCalculationType() {
    const calcType = document.getElementById('calcType').value;
    const inputFields = document.getElementById('inputFields');
    inputFields.innerHTML = ''; // Clear previous inputs

    // Dynamically render input fields based on selected calculation type
    if (['addition', 'subtraction', 'multiplication', 'division'].includes(calcType)) {
        inputFields.innerHTML = `
            <label>Enter Number 1:</label>
            <input type="number" id="num1">
            <label>Enter Number 2:</label>
            <input type="number" id="num2">
        `;
    } else if (calcType === 'weight') {
        inputFields.innerHTML = `
            <label>Enter the Price per Kg (₹):</label>
            <input type="number" id="pricePerKg">
            <label>Enter the Amount You Have (₹):</label>
            <input type="number" id="amount">
        `;
    } else if (calcType === 'cost') {
        inputFields.innerHTML = `
            <label>Enter the Price per Kg (₹):</label>
            <input type="number" id="pricePerKg">
            <label>Enter the Specific Weight (kg):</label>
            <input type="number" id="specificWeight">
        `;
    }
}

function performCalculation() {
    const calcType = document.getElementById('calcType').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results

    try {
        let resultHTML = '';
        if (['addition', 'subtraction', 'multiplication', 'division'].includes(calcType)) {
            const num1 = parseFloat(document.getElementById('num1').value);
            const num2 = parseFloat(document.getElementById('num2').value);

            if (isNaN(num1) || isNaN(num2)) throw 'Please enter valid numbers.';

            let result;
            switch (calcType) {
                case 'addition': result = num1 + num2; break;
                case 'subtraction': result = num1 - num2; break;
                case 'multiplication': result = num1 * num2; break;
                case 'division':
                    if (num2 === 0) throw 'Division by zero is not allowed.';
                    result = num1 / num2;
                    break;
            }
            resultHTML = `
                <div class="result-section">
                    <h3>Result:</h3>
                   <h3>${calcType.toUpperCase()}: ${result}</h3>
                </div>
            `;
        } else if (calcType === 'weight') {
            const pricePerKg = parseFloat(document.getElementById('pricePerKg').value);
            const amount = parseFloat(document.getElementById('amount').value);

            if (pricePerKg <= 0 || amount <= 0) throw 'Please enter positive numbers.';

            const weightKg = Math.floor(amount / pricePerKg);
            const weightGrams = ((amount % pricePerKg) / pricePerKg) * 1000;

            resultHTML = `
                <div class="result-section">
                    <h3>Weight Calculation:</h3>
                    <h3>${weightKg} kg and ${weightGrams.toFixed(2)} grams</h3>
                </div>
            `;
        } else if (calcType === 'cost') {
            const pricePerKg = parseFloat(document.getElementById('pricePerKg').value);
            const specificWeight = parseFloat(document.getElementById('specificWeight').value);

            if (pricePerKg <= 0 || specificWeight <= 0) throw 'Please enter positive numbers.';

            const totalCost = pricePerKg * specificWeight;

            resultHTML = `
                <div class="result-section">
                    <h3>Cost Calculation:</h3>
                    <h3>Total Cost: ₹${totalCost.toFixed(2)}</h3>
                </div>
            `;
        }

        resultDiv.innerHTML = resultHTML;
    } catch (error) {
        resultDiv.innerHTML = `
            <div class="result-section" style="background-color: red; color: white;">
                <h3>Error:</h3>
                <p>${error}</p>
            </div>
        `;
    }
}
