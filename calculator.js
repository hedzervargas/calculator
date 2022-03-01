class Calculator {
  constructor(input, answer, alert) {
    this.inputText = input;
    this.answerText = answer;
    this.alert = alert;
    this.clear();
  }
  clear() {
    this.input = "";
    this.answer = "";
    this.operator = "";
    this.prevOperator = "";
    this.percentageUsed = false;
    this.justCalculated = false;
    this.updateDisplay();
  }
  backspace() {
    if (this.input.length > 0) {
      this.input = this.input.slice(0, -1);
      this.updateDisplay();
      this.percentageUsed = false;
    }
  }
  typeNumber(number) {
    if (this.input.length + 1 > 14) {
      this.showAlert("Number is too long");
      return;
    }
    if (number === "." && this.input.includes(".")) return;
    if (!isNaN(parseFloat(this.input + number))) {
      let temporaryAnswer =
        Math.round(
          eval(`${this.answer}${this.operator}${this.input}${number}`) * 10000
        ) / 10000;
      temporaryAnswer = temporaryAnswer.toString();
      if (temporaryAnswer.length > 14) {
        this.showAlert(`Answer won't fit in screen`);
        return;
      }
    }
    if (this.justCalculated) {
      this.input = number;
      this.justCalculated = false;
    } else {
      this.input += number;
    }
    this.updateDisplay();
  }
  typeOperator(operator) {
    this.operator = operator;
    if (
      (this.input.length === 1 && !this.input.includes(".")) ||
      this.input.length > 1
    ) {
      this.answer = eval(
        `${this.answer}${this.prevOperator}${this.input.toString()}`
      );
      this.answer = Math.round(this.answer * 10000) / 10000;
      this.input = "";
      this.updateDisplay();
    }
    this.prevOperator = this.operator;
    this.percentageUsed = false;
  }
  typePercentage() {
    if (this.percentageUsed === false) {
      if (
        (this.input.length === 1 && !this.input.includes(".")) ||
        this.input.length > 1
      ) {
        this.percentageUsed = true;
        if (this.answer) {
          this.input = (this.answer * this.input) / 100;
          this.input = Math.round(this.input * 10000) / 10000;
        } else {
          this.input = this.input / 100;
        }
        this.updateDisplay();
      }
    }
  }
  calculate() {
    if (
      (this.input.length === 1 && !this.input.includes(".")) ||
      this.input.length > 1
    ) {
      this.input = eval(this.answer + this.operator + this.input);
      this.input = Math.round(this.input * 10000) / 10000;
      this.answer = "";
      this.operator = "";
      this.prevOperator = "";
      this.percentageUsed = false;
      this.justCalculated = true;
      this.updateDisplay();
    }
  }
  updateDisplay() {
    this.input = this.input.toString();
    this.answer = this.answer.toString();
    this.inputText.textContent = this.input;
    this.answerText.textContent = this.answer + " " + this.operator;
  }
  showAlert(message) {
    this.alert.textContent = message;
    this.alert.classList.add("show-alert");
    setTimeout(() => {
      this.alert.classList.remove("show-alert");
    }, 2000);
  }
}

const form = document.querySelector(".form");
const input = document.querySelector(".input");
const answer = document.querySelector(".answer");
const alertElement = document.querySelector(".alert");
const allButtons = [...document.querySelector(".keys").children];

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const percent = document.querySelector(".percent");
const backspace = document.querySelector(".Backspace");
const clear = document.querySelector(".clear");
const is = document.querySelector(".is");

const calculator = new Calculator(input, answer, alertElement);

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    calculator.typeNumber(number.textContent);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    calculator.typeOperator(operator.textContent);
  });
});

percent.addEventListener("click", () => {
  calculator.typePercentage();
});

backspace.addEventListener("click", () => {
  calculator.backspace();
});

clear.addEventListener("click", () => {
  calculator.clear();
});

is.addEventListener("click", () => {
  calculator.calculate();
});

window.addEventListener("keydown", (e) => {
  const key = e.key;
  allButtons.forEach((button) => {
    if (button.textContent === key || button.classList.contains(key)) {
      button.click();
    }
  });
});
