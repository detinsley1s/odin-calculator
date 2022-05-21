let currentScreenValue = '0';
let mathValues = [];
let operations = [];
let operatorPressed = false;
const calcScreen = document.querySelector('#screen');

function updateScreen() {
    calcScreen.innerHTML = currentScreenValue;
}

function doMath() {
    if (operations.at(-1) === '+') {
        mathValues[0] += mathValues[1];
    }
    else if (operations.at(-1) === '-') {
        mathValues[0] -= mathValues[1];
    }
    else if (operations.at(-1) === '*') {
        mathValues[0] *= mathValues[1];
    }
    else {
        if (mathValues[1] !== 0) {
            mathValues[0] /= mathValues[1];
        }
        else {
            currentScreenValue = 'Invalid!'
        }
    }
    mathValues.pop();
    operations.pop();
}

const buttons = document.querySelectorAll('button');
for (let button of buttons) {
    button.addEventListener('click', () => {
        const clickedValue = button.innerHTML;
        if (clickedValue >= '0' && clickedValue <= '9') {
            if (currentScreenValue === '0' || operatorPressed) {
                currentScreenValue = clickedValue;
                operatorPressed = false;
            }
            else {
                if (currentScreenValue.length < 8) {
                    currentScreenValue += clickedValue;
                }
            }
        }
        else if (clickedValue === '.') {
            // add code for entering immediately after an operator
            if (!currentScreenValue.includes('.') && currentScreenValue.length < 8) {
                currentScreenValue += clickedValue;
            }
        }
        else if (clickedValue === 'CLEAR') {
            currentScreenValue = '0';
            mathValues = [];
            operations = [];
        }
        else if (clickedValue === '+') {
            if (!operatorPressed) {
                operatorPressed = true;
                if (mathValues.length <= 1) {
                    mathValues.push(Number(currentScreenValue));
                }
                if (mathValues.length === 2) {
                    doMath();
                }
                operations.push('+');
                currentScreenValue = '' + mathValues[0];
            }
        }
        else if (clickedValue === '-') {
            if (!operatorPressed) {
                operatorPressed = true;
                if (mathValues.length <= 1) {
                    mathValues.push(Number(currentScreenValue));
                }
                if (mathValues.length === 2) {
                    doMath();
                }
                operations.push('-');
                currentScreenValue = '' + mathValues[0];
            }
        }
        else if (clickedValue === '*') {
            // Figure out PEMDAS
            if (!operatorPressed) {
                operatorPressed = true;
                if (mathValues.length <= 1) {
                    mathValues.push(Number(currentScreenValue));
                }
                if (mathValues.length === 2 && (operations.at(-1) === '*' || operations.at(-1) === '/')) {
                    doMath();
                }
                operations.push('*');
                currentScreenValue = '' + mathValues[0];
            }
        }
        else if (clickedValue === '/') {
            if (!operatorPressed) {
                operatorPressed = true;
                if (mathValues.length <= 1) {
                    mathValues.push(Number(currentScreenValue));
                }
                if (mathValues.length === 2 && (operations.at(-1) === '*' || operations.at(-1) === '/')) {
                    doMath();
                }
                operations.push('/');
                currentScreenValue = '' + mathValues[0];
            }
        }
        else {
            if (currentScreenValue.length > 1) {
                currentScreenValue = currentScreenValue.substring(0, currentScreenValue.length - 1);
            }
        }
        updateScreen();
    });
}