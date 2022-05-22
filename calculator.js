const calcScreen = document.querySelector('#screen');
let isError = false;

function operate(mathValues, op) {
    if (op === '+') {
        mathValues[0] += mathValues[1];
    }
    else if (op === '-') {
        mathValues[0] -= mathValues[1];
    }
    else if (op === '*') {
        mathValues[0] *= mathValues[1];
    }
    else {
        if (mathValues[1] !== 0) {
            mathValues[0] /= mathValues[1];
        }
        else {
            mathValues[0] = 'Invalid!'
            isError = true;
        }
    }
    mathValues.pop();
    if (mathValues[0] > 99999999 || mathValues[0] < -9999999) {
        mathValues[0] = 'OVERFLOW';
        isError = true;
    }
    if (!isError) {
        let mathValStr = String(mathValues[0]);
        if (mathValStr.length > 8 && mathValStr.includes('.')) {
            const dotIdx = mathValStr.indexOf('.');
            mathValStr = mathValues[0].toFixed(7 - dotIdx < 0 ? 0 : 7 - dotIdx);
            mathValues[0] = Number(mathValStr);
        }
    }

    return mathValues;
}

function runCalculator() {
    const buttons = document.querySelectorAll('button');
    let mathValues = [];
    let operator = '';
    let currentScreenValue = '0';
    let operatorPressed = false;
    let equalsPressed = false;
    for (let button of buttons) {
        button.addEventListener('click', () => {
            const clickedValue = button.innerText;

            // The screen hasn't overflowed and no division by 0 was attempted
            if (!isError) {
                if (clickedValue >= '0' && clickedValue <= '9') {
                    if (currentScreenValue === '0' || operatorPressed || equalsPressed) {
                        currentScreenValue = clickedValue;
                        operatorPressed = false;
                        equalsPressed = false;
                    }
                    else {
                        if (currentScreenValue.length < 8) {
                            currentScreenValue += clickedValue;
                        }
                    }
                }
                else if (clickedValue === '.') {
                    if (!currentScreenValue.includes('.') && 
                            (currentScreenValue.length < 8 || equalsPressed || operatorPressed)) {
                        if (equalsPressed || operatorPressed) {
                            equalsPressed = false;
                            operatorPressed = false;
                            currentScreenValue = '0';
                        }
                        currentScreenValue += '.';
                    }
                }
                else if (clickedValue === 'CLEAR') {
                    currentScreenValue = '0';
                    mathValues = [];
                    operator = '';
                    operatorPressed = false;
                    equalsPressed = false;
                }
                else if (clickedValue === '+') {
                    if (!operatorPressed) {
                        operatorPressed = true;
                        if (mathValues.length <= 1) {
                            mathValues.push(Number(currentScreenValue));
                        }
                        if (mathValues.length === 2) {
                            mathValues = operate(mathValues, operator);
                        }
                        currentScreenValue = String(mathValues[0]);
                    }
                    operator = '+';
                    equalsPressed = false;
                }
                else if (clickedValue === '−') {
                    if (!operatorPressed) {
                        operatorPressed = true;
                        if (mathValues.length <= 1) {
                            mathValues.push(Number(currentScreenValue));
                        }
                        if (mathValues.length === 2) {
                            mathValues = operate(mathValues, operator);
                        }
                        currentScreenValue = String(mathValues[0]);
                    }
                    operator = '-';
                    equalsPressed = false;
                }
                else if (clickedValue === '×') {
                    if (!operatorPressed) {
                        operatorPressed = true;
                        if (mathValues.length <= 1) {
                            mathValues.push(Number(currentScreenValue));
                        }
                        if (mathValues.length === 2) {
                            mathValues = operate(mathValues, operator);
                        }
                        currentScreenValue = String(mathValues[0]);
                    }
                    operator = '*';
                    equalsPressed = false;
                }
                else if (clickedValue === '÷') {
                    if (!operatorPressed) {
                        operatorPressed = true;
                        if (mathValues.length <= 1) {
                            mathValues.push(Number(currentScreenValue));
                        }
                        if (mathValues.length === 2) {
                            mathValues = operate(mathValues, operator);
                        }
                        currentScreenValue = String(mathValues[0]);
                    }
                    operator = '/';
                    equalsPressed = false;
                }
                else if (clickedValue === '=') {
                    if (mathValues.length > 0 && !operatorPressed) {
                        mathValues.push(Number(currentScreenValue));
                        mathValues = operate(mathValues, operator);
                        currentScreenValue = String(mathValues[0]);
                        mathValues = []
                    }
                    operator = '';
                    equalsPressed = true;
                }
                else {
                    if (currentScreenValue.length > 1 && !equalsPressed) {
                        currentScreenValue = currentScreenValue.substring(0, currentScreenValue.length - 1);
                    }
                }
            }
            else {
                if (clickedValue === 'CLEAR') {
                    currentScreenValue = '0';
                    mathValues = [];
                    operator = '';
                    isError = false;
                    operatorPressed = false;
                    equalsPressed = false;
                }
            }
            
            //update screen
            calcScreen.innerText = currentScreenValue;
        });
    }

    detectKeyboardInput();
}

function detectKeyboardInput() {
    window.addEventListener('keydown', e => {
        switch (e.key) {
            case '0':
                document.getElementById('zero-button').click();
                break;
            case '1':
                document.getElementById('one-button').click();
                break;
            case '2':
                document.getElementById('two-button').click();
                break;
            case '3':
                document.getElementById('three-button').click();
                break;
            case '4':
                document.getElementById('four-button').click();
                break;
            case '5':
                document.getElementById('five-button').click();
                break;
            case '6':
                document.getElementById('six-button').click();
                break;
            case '7':
                document.getElementById('seven-button').click();
                break;
            case '8':
                document.getElementById('eight-button').click();
                break;
            case '9':
                document.getElementById('nine-button').click();
                break;
            case 'Enter':
            case '=':
                document.getElementById('equals-button').click();
                break;
            case '/':
                document.getElementById('divide-button').click();
                break;
            case '+':
                document.getElementById('add-button').click();
                break;
            case '-':
                document.getElementById('subtract-button').click();
                break;
            case '*':
                document.getElementById('multiply-button').click();
                break;
            case 'Backspace':
                document.getElementById('backspace-button').click();
                break;
            case 'Delete':
                document.getElementById('clear-button').click();
                break;
            case '.':
                document.getElementById('decimal-button').click();
                break;
            default:
                console.log('key not used');
        }
        e.preventDefault();
    });
}

runCalculator();