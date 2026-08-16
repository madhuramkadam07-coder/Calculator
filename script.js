const result = document.getElementById("result");
const expression = document.getElementById("expression");
const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");

let a = "", b = "", op = "";
let history = [];

function display() {
    result.textContent = b || "0";
    expression.textContent = a && op ? `${a} ${op}` : "Ready";
}

function add(n) {
    if (n === "." && b.includes(".")) return;
    b += n;
    display();
}

function choose(o) {
    if (!b && !a) return;
    if (b) {
        if (a) calc();
        a = b;
        b = "";
    }
    op = o;
    display();
}

function calc() {
    if (!a || !b || !op) return;

    let x = Number(a), y = Number(b), ans;

    if (op === "+") ans = x + y;
    else if (op === "−") ans = x - y;
    else if (op === "×") ans = x * y;
    else if (op === "÷") {
        if (y === 0) {
            result.textContent = "Error";
            expression.textContent = "Cannot divide by zero";
            a = b = op = "";
            return;
        }
        ans = x / y;
    }

    ans = Number(ans.toFixed(10));

    history.unshift({
        expression: `${x} ${op} ${y}`,
        result: ans
    });

    showHistory();

    expression.textContent = `${x} ${op} ${y}`;
    result.textContent = ans;

    b = String(ans);
    a = op = "";
}

function showHistory() {
    historyList.innerHTML = "";

    if (history.length === 0) {
        historyList.innerHTML =
            `<p style="color:#94a3b8;text-align:center;margin-top:30px">
            No calculation history yet.</p>`;
        return;
    }

    history.forEach(item => {
        historyList.innerHTML +=
            `<div class="history-item">
                <span>${item.expression}</span>
                <strong>= ${item.result}</strong>
            </div>`;
    });
}

function clear() {
    a = b = op = "";
    display();
}

function backspace() {
    b = b.slice(0, -1);
    display();
}

document.querySelectorAll(".buttons button").forEach(button => {
    button.onclick = () => {
        let key = button.textContent.trim();

        if (!isNaN(key) || key === ".") add(key);
        else if ("+−×÷".includes(key)) choose(key);
        else if (key === "=") calc();
        else if (key === "AC") clear();
        else if (key === "⌫") backspace();
    };
});

clearHistory.onclick = () => {
    history = [];
    showHistory();
};

showHistory();
display();