document.addEventListener("DOMContentLoaded", () => {
    var calculationSmall = document.getElementById("calculationSmall");
    var calculation = document.getElementById("calculation");
    var buttons = document.getElementsByClassName("calcButton");
    var lastOperator = false;
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.addEventListener("click", () => {
            if(calculationSmall.innerText.includes("=")) {
                calculationSmall.innerText = "";
                calculation.innerText = "0";
            }
            if(calculation.innerText == "0" && (button.innerText != "," && button.innerText != "+" && button.innerText != "-" && button.innerText != "*" && button.innerText != "/" && button.innerText != "%" && button.innerText != "=" && button.innerText != "+-")) {
                calculation.innerText = "";
            }


            if(button.innerText == "C") {
                calculation.innerText = "0";
                calculationSmall.innerText = "";
            } else if(button.innerText == "CE") {
                calculation.innerText = "0";
            } else if(button.innerText == "X") {
                calculation.innerText = calculation.innerText.substring(0, calculation.innerText.length - 1);
            } else if(button.innerText == "P") {
                alert("Placeholder");
            } else if(button.innerText == ",") {
                if(!calculation.innerText.substring(0, calculation.innerText.length - 1)) {
                    calculation.innerText += button.innerText;
                }
            } else if(button.innerText == "+" || button.innerText == "-" || button.innerText == "*" || button.innerText == "/" || button.innerText == "%") {
                if(lastOperator == true) {
                    calculationSmall.innerText = calculationSmall.innerText.substring(0, calculationSmall.innerText.length - 1);
                    calculationSmall.innerText += " " + button.innerText;
                } else {
                    lastOperator = true;
                    calculationSmall.innerText += " " + calculation.innerText + " " + button.innerText;
                    calculation.innerText = "0";
                }
            } else if(button.innerText == "+-") {
                if(calculation.innerText.startsWith("-")) {
                    calculation.innerText = calculation.innerText.substring(1, calculation.innerText.length);
                } else {
                    calculation.innerText = "-" + calculation.innerText;
                }
            } else if(button.innerText == "=") {
                calculationSmall.innerText += " " + calculation.innerText;
                if(calculationSmall.innerText.startsWith("0") && !calculationSmall.innerText.startsWith("0,") && !calculationSmall.innerText.startsWith("0 +") && !calculationSmall.innerText.startsWith("0 -")  && !calculationSmall.innerText.startsWith("0 *")  && !calculationSmall.innerText.startsWith("0 /")  && !calculationSmall.innerText.startsWith("0 %")) {
                    calculationSmall.innerText = calculationSmall.innerText.substring(1, calculationSmall.innerText.length);
                }
                calculationSmall.innerText = calculationSmall.innerText.replaceAll(",", ".");
                // calculation.innerText = eval(calculationSmall.innerText);
                calculation.innerText = calc(calculationSmall.innerText);
                calculationSmall.innerText = calculationSmall.innerText.replaceAll(".", ",") + " = ";
            } else {
                lastOperator = false;
                calculation.innerText += button.innerText;
            }
            if(calculation.innerText == "") {
                calculation.innerText = "0";
            }
        });
    }
});


function calc(str) {
    // str = str.replace(/\s/g, '');

    if(str.includes("(")) return "Unsupported."; // For funcs and (more math here (prob gonna use recursive for this but i dont have the buttons for that yet soooo))
    // if(str.includes("-")) return "Help";

    var stuff = str.split(/\s/g);
    var temp = [];
    var result = 0;
    var remainder = 0;

    for (let i = 0; i < stuff.length; i++) {
        const elmnt = stuff[i];
        if(elmnt == "*" || elmnt == "/" || elmnt == "%") {
            if(temp.length == 0) temp.push(stuff[i - 1]);
            temp.push(stuff[i]);
            temp.push(stuff[i + 1]);
        }
    }
    for (let i = 0; i < stuff.length; i++) {
        const elmnt = stuff[i];
        if(elmnt == "+" || elmnt == "-") {
            if(temp.length == 0) temp.push(stuff[i - 1]);
            temp.push(stuff[i]);
            temp.push(stuff[i + 1]);
        }
    }
    stuff = temp;
    result = temp[0];

    for (let i = 0; i < stuff.length; i++) {
        if(stuff[i] == "+") {
            result = Number(result) + Number(stuff[i + 1]);
        } else if(stuff[i] == "-") {
            result = Number(result) - Number(stuff[i + 1]);
        } else if(stuff[i] == "*") {
            result = Number(result) * Number(stuff[i + 1]);
        } else if(stuff[i] == "/") {
            result = Number(result) / Number(stuff[i + 1]);
            remainder = Number(stuff[i - 1]) % Number(stuff[i + 1]);    
        } else if(stuff[i] == "%") {
            result = Number(result) % Number(stuff[i + 1]);
        }
    }

    if(remainder == 0) return result;
    else return result + " R" + remainder + "";
}