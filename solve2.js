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

// Second test case JSON
const jsonTestcase2 = `
{
"keys": {
    "n": 10,
    "k": 7
  },
  "1": {
    "base": "6",
    "value": "13444211440455345511"
  },
  "2": {
    "base": "15",
    "value": "aed7015a346d635"
  },
  "3": {
    "base": "15",
    "value": "6aeeb69631c227c"
  },
  "4": {
    "base": "16",
    "value": "e1b5e05623d881f"
  },
  "5": {
    "base": "8",
    "value": "316034514573652620673"
  },
  "6": {
    "base": "3",
    "value": "2122212201122002221120200210011020220200"
  },
  "7": {
    "base": "3",
    "value": "20120221122211000100210021102001201112121"
  },
  "8": {
    "base": "6",
    "value": "20220554335330240002224253"
  },
  "9": {
    "base": "12",
    "value": "45153788322a1255483"
  },
  "10": {
    "base": "7",
    "value": "1101613130313526312514143"
  }
}
`;

// Solve and print the results for the second test case
const coefficients2 = solveFromJson(jsonTestcase2);
console.log(`The polynomial coefficients are: ${coefficients2}`);