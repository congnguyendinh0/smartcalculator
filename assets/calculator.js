let calc = document.getElementByIdd("calculator");

function setup_calculator() {
    let calculator_screen = document.createElement("div");
    calculator_screen.setAttribute("id", "calculator_screen");
    calc.appendChild(calculator_screen);
    calculator_screen.innerHTML = hallo;

}

setup_calculator();