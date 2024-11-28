let runningTotal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector(".screen");

// ***
// This function is triggered when a button
// is clicked. It determines if the clicked
// value is a number or an operator and calls
// the appropriate handler function.
// ***
function buttonCLick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }

  screen.innerText = buffer;
}

// ***
// Handles operations for special symbols
// (clear "C", equals "=", backspace "←",
// and math operators like +, −, ×, ÷).
// It determines the behavior based on
// the symbol pressed.
// ***
function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator == null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.slice(0, buffer.length - 1);
      }
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
}
// ***
// Handles the math operations
// (addition, subtraction, multiplication, division).
// It keeps track of the running total and updates
// it based on the current operator.
// ***
function handleMath(symbol) {
  if (buffer === "0") {
    return;
  }
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = symbol;
  buffer = "0";
}

// ***
// Performs the actual arithmetic operation
// by using the operator that was most
// recently selected.
// ***
function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "−") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else if (previousOperator === "÷") {
    runningTotal /= intBuffer;
  }
}

// ***
// Handles the input of digits. It
// either replaces the current buffer
// (if it's "0") or appends the
// new digit to the buffer.
// ***
function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

// ***
// Initializes the calculator by adding event
// listeners to the calculator's buttons.
// When a button is clicked, it triggers
// the buttonCLick function.
// ***
function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonCLick(event.target.innerText);
    });
}

init();
