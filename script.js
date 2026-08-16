const result = document.getElementById("result");

document.querySelectorAll(".buttons button").forEach(button => {

    button.onclick = () => {

        if (button.textContent === "AC") {
            result.textContent = "0";
        }

        else if (button.textContent === "⌫") {
            result.textContent =
                result.textContent.slice(0, -1) || "0";
        }

        else if (button.textContent === "=") {
            result.textContent =
                eval(result.textContent.replace("×", "*").replace("÷", "/"));
        }

        else {
            result.textContent =
                result.textContent === "0"
                ? button.textContent
                : result.textContent + button.textContent;
        }
    };

});