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
            
let operator_list = [               
                {code: 106, txt: '*'},
                {code: 107, txt: '+'},
                {code: 109, txt: '-'},
                {code: 111, txt: '/'}];
                

// Use Keyboard to calculate
document.onkeydown = function() {type_to_screen(event)};
function type_to_screen(event) {
    let key_code = event.which || event.keyCode;
    let calc_screen = document.getElementById("calculator_screen");
    let result_screen = document.getElementById("result_screen");

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
            let last_char = current_str.substr(current_str.length - 1, current_str.length);

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
        calc_screen.innerHTML = '';
        result_screen.innerHTML = 0;
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
    if (calc_screen.innerHTML == "") {   
        calc_screen.innerHTML = code;
    } else {
        calc_screen.innerHTML += code;
    }
}

function print_operator(calc_screen, code) {
    if (calc_screen.innerHTML == "") {
        calc_screen.innerHTML = "0" + code;
    } else {
        calc_screen.innerHTML += code;
    }
}

// fuer komma
function print_dot(calc_screen, code) { 
    let screen_str = calc_screen.innerHTML;
    let check_it = screen_str.endsWith(".");  // screen 
    if (check_it == false) {                    // screen does not end with point

        let testEndsWithOp = false;                   // 
        for (let i = 0; i < operator_list.length; i++) {
            testEndsWithOp = screen_str.endsWith(operator_list[i].txt);

            if (testEndsWithOp) {
                i = operator_list.length;
            }
        }

        if (screen_str == "" || testEndsWithOp) {                     // then if it is empty
            calc_screen.innerHTML += 0 + code;
        } else {  
          // double point
            let last_dot_pos = screen_str.lastIndexOf(".");     
            let test_str = screen_str.substr(last_dot_pos + 1, screen_str.length - 1);
            let testdot =  false;

            for (let i = 0; i < operator_list.length; i++) {
                testdot= test_str.includes(operator_list[i].txt);   /// checks if element of operator list exist
                if(testdot) {
                    calc_screen.innerHTML += code;
                    i = operator_list.length;
                }
               
                
            }
            if(!screen_str.includes(code)&&testdot == false) // no operator and dot  // screen_str ninmmt nur werte aus calc_screen  
            {
                calc_screen.innerHTML += code;
            }
            
                    
        }

    }
    
}

// Setup calculator
function setup_calculator() {
    // create screen
    let big_screen = document.createElement("div");
    big_screen.setAttribute("id", "big_screen");
    calc.appendChild(big_screen);
 
    let calculator_screen = document.createElement("div");
    calculator_screen.setAttribute("id", "calculator_screen");
    big_screen.appendChild(calculator_screen);
    calculator_screen.innerHTML = '';
    
    let result_screen = document.createElement("div");
    result_screen.setAttribute("id", "result_screen");
    big_screen.appendChild(result_screen);
    result_screen.innerHTML = 0;

    // create inner left part (0-9 buttons & comma & ^2 buttons) & container
    let left_part = document.createElement("div");
    left_part.setAttribute("id", "left_part");
    calc.appendChild(left_part);

    // left part container
    let left_part_container = document.createElement("div");
    left_part_container.setAttribute("id", "left_part_container");
    left_part.appendChild(left_part_container);

    // Keys of left part
    let left_part_numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
    let left_part_special = [{code: '.', txt: '.'}, {code: '-', txt: '&plusmn;'}];
    for (taste of left_part_numbers) {
        let num_btn = document.createElement("button");
        num_btn.setAttribute("class","btn");
        left_part_container.appendChild(num_btn);
        num_btn.innerHTML = taste;
        num_btn.addEventListener("click", play_sound);
        num_btn.onclick = function () {
            print_it(calculator_screen, num_btn.innerHTML);
        };
    }

    // For dot/comma and plus/minus sign buttons
    for (taste of left_part_special) {
        let num_btn = document.createElement("button");
        num_btn.setAttribute("class","btn");
        left_part_container.appendChild(num_btn);
        num_btn.innerHTML = taste.txt;
        let num_txt = taste.code;
        
        // For dot/comma button
        if (num_btn.innerHTML == ".") {
            num_btn.onclick = function() {
                let current_strg = calculator_screen.innerHTML;   
                let check_it = current_strg.endsWith(".");
                if (check_it == false) {
                    print_dot(calculator_screen, num_txt);
                }
            }
        }

        // For plus/minus sign button (Vorzeichen)
        if (num_btn.innerHTML == "&plusmn;" || num_btn.innerHTML == "±") {
            num_btn.onclick = function() {
                calculator_screen.innerHTML += "(-";
            }
        }

    }


    // create inner right part (operation buttons)  & container
    let right_part = document.createElement("div");
    right_part.setAttribute("id","right_part");
    calc.appendChild(right_part);

    // right part container
    let right_part_container = document.createElement("div");
    right_part_container.setAttribute("id","right_part_container");
    right_part.appendChild(right_part_container);

    // Keys of right part
    let right_part_special = ["DEL", "AC"];
    let right_part_values = ["*", "/", "+", "-"];
    let special_values = ["^2", "="];

    // For "DEL" and "AC" Buttons
    for (taste of right_part_special) {
        let num_btn = document.createElement("button");
        num_btn.setAttribute("class","btn");
        right_part_container.appendChild(num_btn);
        num_btn.innerHTML = taste;
        
        if (num_btn.innerHTML == "DEL") {
            num_btn.onclick = function() {
                let current_strg = calculator_screen.innerHTML;
                calculator_screen.innerHTML = current_strg.substr(0, current_strg.length - 1);
            }
        }

        if (num_btn.innerHTML == "AC") {
            num_btn.onclick = function() {
                calculator_screen.innerHTML = '';
                result_screen.innerHTML = '0';
            }
        }
    }
    
    // For Operators buttons
    for (taste of right_part_values) {
        let num_btn = document.createElement("button");
        num_btn.setAttribute("class","btn");
        right_part_container.appendChild(num_btn);
        num_btn.innerHTML = taste;
        num_btn.onclick = function () {
            // Check if there is already a "(" of plus/minus button (Vorzeichen)
            let current_str = calculator_screen.innerHTML;
            let bracket_open = current_str.lastIndexOf("(");
            let last_str = current_str.substr(bracket_open + 1, current_str.length);
            if (bracket_open >= 0) {
                let check_bracket_close = last_str.includes(")");
                if (!check_bracket_close) {
                    calculator_screen.innerHTML += ")";
                }
            }
            

            // Handle the operator (replace operator if the last character on screen is also a operator)
            
            let last_char = current_str.substr(current_str.length - 1, current_str.length);

            let check_it = false;
            for (i = 0; i < operator_list.length; i++) {
                if (last_char == operator_list[i].txt) {
                    check_it = true;
                    i = operator_list.length;
                }
            }

            if (check_it == true) {
                current_str = current_str.substr(0, current_str.length - 1);
                calculator_screen.innerHTML = current_str + this.innerHTML;
            } else {
                print_it(calculator_screen, this.innerHTML);
            }
        };
    }


    // For equal button (gleich) and exponent button (hoch 2)
    for (taste of special_values) {
        let num_btn = document.createElement("button");
        num_btn.setAttribute("class","btn");
        right_part_container.appendChild(num_btn);
        num_btn.innerHTML = taste;

        // For equal button (gleich) button 
        if (num_btn.innerHTML == "=") { 
            num_btn.onclick = function() {
                // Check if there is already a "(" of plus/minus button (Vorzeichen)
                let current_str = calculator_screen.innerHTML;
                let bracket_open = current_str.lastIndexOf("(");
                let last_str = current_str.substr(bracket_open + 1, current_str.length);
                if (bracket_open >= 0) {
                    let check_bracket_close = last_str.includes(")");
                    if (!check_bracket_close) {
                        calculator_screen.innerHTML += ")";
                    }
                }

                console.log(calculator_screen.innerHTML);

                // Calculate it when screen is written correctly
                result_screen.innerHTML = eval(calculator_screen.innerHTML);
                calculator_screen.innerHTML = "";
            }
        }

        // For exponent button (hoch 2) button
        if (num_btn.innerHTML == "^2"){
            num_btn.onclick = function() {
                result_screen.innerHTML = Math.pow(calculator_screen.innerHTML,2)
                calculator_screen.innerHTML = "";
            }
        }
    }

}

// Sounds
var bleep = new Audio();
bleep.src = "assets/C3.mp3";
function play_sound() {
    bleep.play(); // Play button sound now
}

// Dark mode
let dark_mode = document.getElementById("dark_mode");
let dark_mode_icon = document.createElement("img");
dark_mode_icon.setAttribute("src", "assets/images/night.png");
dark_mode.appendChild(dark_mode_icon);

dark_mode_icon.onclick = function (){
    document.body.classList.toggle("dark_body");
    dark_mode.classList.toggle("night");

    var is_night = dark_mode.classList.contains("night");
    if (is_night) {
        this.setAttribute("src", "assets/images/day.png");
        this.style.backgroundColor = "#666666";
    } else {
        this.setAttribute("src", "assets/images/night.png");
        this.style.backgroundColor = "#333333";
    }
};



setup_calculator();