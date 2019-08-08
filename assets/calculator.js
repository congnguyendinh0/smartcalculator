let calc = document.getElementById("calculator");
let allowed_key = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "^2",
                    "DEL", "AC", "*", "/", "+", "-", "ANS", "="];

document.onkeypress = function() {type_to_screen(event)};
// Use Keyboard to calculate
function type_to_screen(event) {
    let key_code = event.which || event.keyCode;
    let char_code = String.fromCharCode(key_code);
    let calc_screen = document.getElementById("calculator_screen");
    if (calc_screen.innerHTML == 0) {
        calc_screen.innerHTML = char_code;
    } else {
        calc_screen.innerHTML += char_code;
    }
    
}

// Setup calculator
function setup_calculator() {
    // create screen
    let calculator_screen = document.createElement("div");
    calculator_screen.setAttribute("id", "calculator_screen");
    calc.appendChild(calculator_screen);
    calculator_screen.innerHTML = 0;
    

    // create inner left part (0-9 buttons & comma & ^2 buttons) & container
    let left_part = document.createElement("div");
    left_part.setAttribute("id", "left_part");
    calc.appendChild(left_part);

    // left part container
    let left_part_container = document.createElement("div");
    left_part_container.setAttribute("id", "left_part_container");
    left_part.appendChild(left_part_container);

    // Keys of left part
    let left_part_values = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ",", "^2"];
    for (taste of left_part_values) {
        let num_btn = document.createElement("button");
        num_btn.setAttribute("class","btn");
        left_part_container.appendChild(num_btn);
        num_btn.innerHTML = taste;
        num_btn.addEventListener("click", play_sound);
    };


    // create inner right part (operation buttons)  & container
    let right_part = document.createElement("div");
    right_part.setAttribute("id","right_part");
    calc.appendChild(right_part);

    // right part container
    let right_part_container = document.createElement("div");
    right_part_container.setAttribute("id","right_part_container");
    right_part.appendChild(right_part_container);

    // Keys of right part
    let right_part_values = ["DEL", "AC", "*", "/", "+", "-", "ANS", "="];
    for (taste of right_part_values) {
        let num_btn = document.createElement("button");
        num_btn.setAttribute("class","btn");
        right_part_container.appendChild(num_btn);
        num_btn.innerHTML = taste;
    }
}

// Sounds
var bleep = new Audio();
bleep.src = "assets/C3.mp3";
function play_sound() {
    bleep.play(); // Play button sound now
}

setup_calculator();