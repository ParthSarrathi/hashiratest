// Function to expand a polynomial from its roots
function expandPolynomial(roots) {
    if (roots.length === 0) {
        return [1];
    }

    let coefficients = [1, -roots[0]];

    for (let i = 1; i < roots.length; i++) {
        const root = roots[i];
        let newCoeffs = new Array(coefficients.length + 1).fill(0);
        
        for (let j = 0; j < coefficients.length; j++) {
            newCoeffs[j] += coefficients[j];
            newCoeffs[j + 1] += -root * coefficients[j];
        }
        coefficients = newCoeffs;
    }

    return coefficients;
}

// Function to solve the problem from a JSON string
function solveFromJson(jsonDataStr) {
    try {
        const data = JSON.parse(jsonDataStr);
        const k = data.keys.k;
        const roots = [];

        for (let i = 1; i <= k; i++) {
            const rootKey = String(i);
            if (data[rootKey]) {
                const base = parseInt(data[rootKey].base, 10);
                const value = data[rootKey].value;
                const decimalValue = parseInt(value, base);
                roots.push(decimalValue);
            }
        }
        const coefficients = expandPolynomial(roots);
        return coefficients;
    } catch (e) {
        return `Error processing JSON: ${e.message}`;
    }
}

// First test case JSON
const jsonTestcase1 = `
{
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
}
`;

// Solve and print the results for the first test case
const coefficients1 = solveFromJson(jsonTestcase1);
console.log(`The polynomial coefficients are: ${coefficients1}`);