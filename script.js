let input = "";
let history = [];

const result = document.getElementById("result");
const expression = document.getElementById("expression");
const historyList = document.getElementById("historyList");

function add(value) {
  input += value;
  result.textContent = input || "0";
}

function clearAll() {
  input = "";
  expression.textContent = "";
  result.textContent = "0";
}

function del() {
  input = input.slice(0, -1);
  result.textContent = input || "0";
}

function calculate() {
  if (!input) return;

  try {
    let answer = Function("return " + input)();

    if (!isFinite(answer)) throw Error();

    expression.textContent = input + " =";
    result.textContent = answer;

    history.unshift(input + " = " + answer);
    showHistory();

    input = String(answer);
  } catch {
    result.textContent = "Error";
  }
}

function showHistory() {
  historyList.innerHTML = history.length
    ? history.map(x => `<div class="history-item">${x}</div>`).join("")
    : "No history";
}

function clearHistory() {
  history = [];
  showHistory();
}