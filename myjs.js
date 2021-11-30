class Calculator {
    constructor(currentOperandTextElement, prevOperandTextElement){
        this.currentOperandTextElement = currentOperandTextElement;
        this.prevOperandTextElement = prevOperandTextElement;
        this.clear();
    }
    clear(){
        this.currentOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }

    delete(){
        if(this.currentOperand=="") {
            this.currentOperand=this.prevOperand;
            this.prevOperand='';
        }
        this.currentOperand= this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number == '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand =='' ) return
        if(this.prevOperand !='' ) this.compute();
        this.operation = operation;
        this.prevOperand = this.currentOperand + ' ';
        this.prevOperand += operation.toString();
        this.currentOperand = '';
    }

    compute(){
        let result;
        //converse string to num
        const prev = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currentOperand);

        // is Not A Number
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;

            default:
                return;
        }

        this.currentOperand = result;
        this.prevOperand = '';
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.prevOperandTextElement.innerText = this.prevOperand;
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const prevOperandTextElement = document.querySelector('[data-previous-operand]');


const calculator= new Calculator(currentOperandTextElement, prevOperandTextElement);

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
       
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
        
    })
})

equalsButton.addEventListener('click', button =>{
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button =>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button =>{
    calculator.delete();
    calculator.updateDisplay();
})