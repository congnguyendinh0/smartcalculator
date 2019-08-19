let calc = document.getElementById("calculator");
let allowed_key = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "&plusmn;",
                    "DEL", "AC", "*", "/", "+", "-", "^2", "="];
let displayed_keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "*", "/", "+", "-"];
let number_list = [{code: 48, txt: 0}, {code: 96, txt: 0}, 
                {code: 49, txt: 1}, {code: 97, txt: 1},
                {code: 50, txt: 2}, {code: 98, txt: 2},
                {code: 51, txt: 3}, {code: 99, txt: 3},
                {code: 52, txt: 4}, {code: 100, txt: 4},
                {code: 53, txt: 5}, {code: 101, txt: 5},
                {code: 54, txt: 6}, {code: 102, txt: 6},
                {code: 55, txt: 7}, {code: 103, txt: 7},
                {code: 56, txt: 8}, {code: 104, txt: 8},
                {code: 57, txt: 9}, {code: 105, txt: 9}];
            
let operator_list =[               
                {code: 106, txt: '*'},
                {code: 107, txt: '+'},
                {code: 109, txt: '-'},
                {code: 110, txt: '.'},
                {code: 111, txt: '/'},
                {code: 106, txt: '*'}];


document.onkeydown = function() {type_to_screen(event)};
// Use Keyboard to calculate
function type_to_screen(event) {
    let key_code = event.which || event.keyCode;
    let calc_screen = document.getElementById("calculator_screen");

    // Print out all the numbers from 0 - 9
    for (key of number_list) {
        if (key_code == key.code) {
            print_it(calc_screen, key.txt);
        }
    }

    // Print out all the operators
    for (key of operator_list) {
        if (key_code == key.code) {
            // Handle the operator (replace operator if the last character on screen is also a operator)
            let current_str = calc_screen.innerHTML;
            let last_char = current_str.substr(current_strg.length - 1, current_strg.length);

            let check_it = false;
            for (i = 0; i < operator_list.length; i++) {
                if (last_char == operator_list[i].txt) {
                    check_it = true;
                    i = operator_list.length;
                }
            }

            if (check_it == true) {
                current_str = current_str.substr(0, current_str.length - 1);
                calc_screen.innerHTML = current_str + key.txt;
            } else {
                print_it(calc_screen, key.txt);
            }
        }
    }

    // For "AC" Button (delete everything from the screen)
    if (key_code == 27) {
        calc_screen.innerHTML = '0';
    }

    // for DEL Button (also for Backspace key)
    if (key_code == 8 || key_code == 46) {
        let current_strg = calc_screen.innerHTML;
        calc_screen.innerHTML = current_strg.substr(0, current_strg.length - 1);

        let screen_str = calc_screen.innerHTML;
        if (screen_str.length == 0) {
            calc_screen.innerHTML = '0';
        }
    }

    
}

function print_it(calc_screen, code) {
    if (calc_screen.innerHTML == 0) {   
        calc_screen.innerHTML = code;
    } else {
        calc_screen.innerHTML += code;
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
    let left_part_values = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ",", "&plusmn;"];
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
    let right_part_values = ["DEL", "AC", "*", "/", "+", "-", "^2", "="];
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