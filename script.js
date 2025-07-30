document.addEventListener('DOMContentLoaded', () => {
    const previousOperandElement = document.getElementById('previous-operand');
    const currentOperandElement = document.getElementById('current-operand');
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const equalsButton = document.getElementById('equals');
    const clearButton = document.getElementById('clear');
    const backspaceButton = document.getElementById('backspace');
    const decimalButton = document.getElementById('decimal');
    
    let currentOperand = '0';
    let previousOperand = '';
    let operation = undefined;
    let resetScreen = false;
    
    function updateDisplay() {
        currentOperandElement.textContent = currentOperand;
        if (operation) {
            previousOperandElement.textContent = `${previousOperand} ${operation}`;
        } else {
            previousOperandElement.textContent = previousOperand;
        }
    }
    
    function appendNumber(number) {
        if (currentOperand === '0' || resetScreen) {
            currentOperand = number;
            resetScreen = false;
        } else {
            currentOperand += number;
        }
    }
    
    function addDecimal() {
        if (resetScreen) {
            currentOperand = '0.';
            resetScreen = false;
            return;
        }
        if (currentOperand.includes('.')) return;
        if (currentOperand === '') {
            currentOperand = '0.';
        } else {
            currentOperand += '.';
        }
    }
    
    function chooseOperation(op) {
        if (currentOperand === '' && previousOperand === '') return;
        if (currentOperand === '') {
            operation = op;
            return;
        }
        if (previousOperand !== '') {
            compute();
        }
        operation = op;
        previousOperand = currentOperand;
        currentOperand = '';
    }
    
    function compute() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        
        currentOperand = computation.toString();
        operation = undefined;
        previousOperand = '';
        resetScreen = true;
    }
    
    function clear() {
        currentOperand = '0';
        previousOperand = '';
        operation = undefined;
    }
    
    function backspace() {
        if (currentOperand.length === 1 || (currentOperand.length === 2 && currentOperand.startsWith('-'))) {
            currentOperand = '0';
        } else {
            currentOperand = currentOperand.slice(0, -1);
        }
    }
    
    // Button event listeners
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.textContent);
            updateDisplay();
        });
    });
    
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            chooseOperation(button.textContent);
            updateDisplay();
        });
    });
    
    equalsButton.addEventListener('click', () => {
        compute();
        updateDisplay();
    });
    
    clearButton.addEventListener('click', () => {
        clear();
        updateDisplay();
    });
    
    backspaceButton.addEventListener('click', () => {
        backspace();
        updateDisplay();
    });
    
    decimalButton.addEventListener('click', () => {
        addDecimal();
        updateDisplay();
    });
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') {
            appendNumber(e.key);
            updateDisplay();
        } else if (e.key === '.') {
            addDecimal();
            updateDisplay();
        } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            const op = e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key;
            chooseOperation(op);
            updateDisplay();
        } else if (e.key === 'Enter' || e.key === '=') {
            compute();
            updateDisplay();
        } else if (e.key === 'Escape') {
            clear();
            updateDisplay();
        } else if (e.key === 'Backspace') {
            backspace();
            updateDisplay();
        }
    });
});