/*-------------------------------- Constants --------------------------------*/
const calculator = document.querySelector('#calculator');

/*-------------------------------- Variables --------------------------------*/
let operator = '';
let firstInput = '';
let secondInput = '';

/*------------------------ Cached Element References ------------------------*/
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');

/*----------------------------- Event Listeners -----------------------------*/
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('number')) {
            handleNumber(target.innerText);
        } else if (target.classList.contains('operator') && target.innerText !== 'C') {
            handleOperator(target.innerText);
        } else if (target.classList.contains('equals')) {
            calculate();
        } else if (target.classList.contains('operator') && target.innerText === 'C') {
            clearCalculator();
        }
    });
});

/*-------------------------------- Functions --------------------------------*/

function handleNumber(number) {
    firstInput += number;
    updateDisplay(firstInput);
}

function handleOperator(oper) {
    if (firstInput === '') {
        return;
    }
    if (secondInput !== '') {
        calculate();
    }
    operator = oper;
    secondInput = firstInput; // Move to second input
    firstInput = ''; // Clear first input for next number
}

function calculate() {
    let result;
    const prev = parseInt(secondInput);
    const current = parseInt(firstInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    firstInput = result.toString();
    operator = '';
    updateDisplay(firstInput);
}

function clearCalculator() {
    firstInput = '';
    secondInput = '';
    operator = '';
    updateDisplay('0');
}

function updateDisplay(value) {
    display.innerText = value || '0';
}

updateDisplay('0');