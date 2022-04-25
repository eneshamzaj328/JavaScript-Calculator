const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.querySelector('.equals');
const deleteButton = document.querySelector('.delete');
const allClearButton = document.querySelector('.all-clear');
const outputC = document.querySelector(".output"); 
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

function calculator(previousOperandTextElement, currentOperandTextElement) {
    clear();
    return previousOperandTextElement, currentOperandTextElement;
}

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
}

function del() {
    currentOperand = currentOperand.toString().slice(0, -1);
}

function addNumber(number) {
    if(number === "." && currentOperand.includes(".")) return;
    currentOperand = currentOperand.toString() + number.toString();
}

function operate(operationButton) {
    if(currentOperand === '') return;
    if(previousOperand !== '') {
        compute();
    }
    operation = operationButton;
    previousOperand = currentOperand;
    currentOperand = '';
}

const compute = () => {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if(isNaN(prev) || isNaN(current)) return;
    switch(operation) {
        case "÷":
            computation = prev / current;
        break;
        case "*":
            computation = prev * current;
        break;
        case "+":
            computation = prev + current;
        break;
        case "-":
            computation = prev - current;
        break;
        default:
            return
    }
    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
}

function getDisplayNumber(number) {
    const numberStr  = number.toString();
    const numberInt = parseFloat(numberStr.split('.')[0]);
    const numberDec = numberStr.split('.')[1];

    let intDisplay;

    isNaN(numberInt) 
    ?   intDisplay = ''
    :   intDisplay = numberInt.toLocaleString("en", {
        maximumFractionDigits: 0
    });

    if(numberDec != null) {
        return intDisplay + "." + numberDec;
    } else {
        return intDisplay;
    }
}

function updateDisplay() {
    currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
    if(operation != null) {
        previousOperandTextElement.innerText = `${getDisplayNumber(previousOperand)} ${operation}`;
    } else {
        previousOperandTextElement.innerText = '';
    }
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        addNumber(button.innerText);
        updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        operate(button.innerText);
        updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    compute();
    updateDisplay();
});

allClearButton.addEventListener('click', () => {
    clear();
    updateDisplay();
});

deleteButton.addEventListener('click', () => {
    del();
    updateDisplay();
});

// Keyboard Support
window.addEventListener('keydown', e => {
    numberButtons.forEach((button, index) => {
        if(numberButtons[index].innerText == e.key) {
            numberButtons[index].innerText = e.key.toString();
            addNumber(e.key.toString());
            updateDisplay();
        }
    });

    switch(e.key) {
        case "c":
            clear();
            updateDisplay();
        break;
        case "Backspace":  
            del();
            updateDisplay();
        break;
        case "/":
            operate("÷");
            updateDisplay();
        break;
        case "*":
            operate("*");
            updateDisplay();
        break;
        case "+":
            operate("+");
            updateDisplay();
        break;
        case "-":
            operate("-");
            updateDisplay();
        break;
        case ".":
            addNumber(e.key.toString());
            updateDisplay();
        break;
        case "Enter":
            compute();
            updateDisplay();
        break;
        default:
            return;
    }
});