let display = document.getElementById('display'); // get the display element
let buttons = document.querySelectorAll('.btn'); // get all button elements with class btn

// Retrieve stored values from local storage
let currentInput = localStorage.getItem('currentInput') || ''; // stores the current input
let operator = localStorage.getItem('operator') || ''; // stores the current operator
let firstOperand = localStorage.getItem('firstOperand') || ''; // stores the first operand

// Update the display with the current input or set to 0 if empty
display.textContent = currentInput || '0';

// function to handle button clicks
buttons.forEach(button => button.addEventListener('click', () => {
    let value = button.getAttribute('data-value'); // get the value of the clicked button

    // Handle different button values
    if (value === 'C') { // If C is clicked, reset everything
        currentInput = '';
        operator = '';
        firstOperand = '';
        display.textContent = '0'; // resets the display

        // Clear local storage
        localStorage.removeItem('currentInput');
        localStorage.removeItem('operator');
        localStorage.removeItem('firstOperand');

    } else if (value === '=') { // if = is clicked, perform the calculation
        if (operator && currentInput && firstOperand) {
            let result = calculate(firstOperand, operator, currentInput);
            display.textContent = result; // show the result
            currentInput = result.toString(); // set the current input to the result for further operations
            operator = ''; // clears the operator
            firstOperand = ''; // clear first operand

            // Store the result in local storage
            localStorage.setItem('currentInput', currentInput);
            localStorage.removeItem('operator');
            localStorage.removeItem('firstOperand');
        }
    } else if (['+', '-', '*', '/'].includes(value)) {
        // if an operator is clicked, store the operator and first operand
        if (currentInput) {
            operator = value;
            firstOperand = currentInput;
            currentInput = ''; // resets current input for the next number

            // Store operator and first operand in local storage
            localStorage.setItem('operator', operator);
            localStorage.setItem('firstOperand', firstOperand);
            localStorage.removeItem('currentInput');
        }
    } else {
        // for numbers and decimal points, update the current input
        currentInput += value;
        display.textContent = currentInput; // update display

        // Store the current input in local storage
        localStorage.setItem('currentInput', currentInput);
    }
}));

// function to perform the calculation
function calculate(operand1, operator, operand2) {
    let num1 = parseFloat(operand1);
    let num2 = parseFloat(operand2);

    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 === 0 ? 'Error' : num1 / num2; // avoids division by zero
        default:
            return 0;
    }
}
