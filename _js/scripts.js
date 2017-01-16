var numStr = "";
var equation = [];
//testing
// var equation = ["1", "+", "2"];
// var equation = ["1", "+", "2", "-", "4"];
// var equation = ["1", "+", "2", "-", "4", "*", "3"];
// var equation = ["1", "+", "2", "-", "4", "*", "3", "/", "3"];
// var equation = ["-1.2", "+", "2.6"];
// var equation = ["1", "+", "2", "-", "4"];
// var equation = ["1", "+", "2", "-", "4", "*", "3"];
// var equation = ["1", "+", "2", "-", "4", "*", "3", "/", "3"];

function calculate(num1, op, num2) {
    var n1 = Number(num1);
    var n2 = Number(num2);

    // perform calculation stored in equation array
    switch (op) {
        case "+":
            return n1 + n2;
        case "-":
            return n1 - n2;
        case "*":
            return n1 * n2;
        case "/":
            return n1 / n2;
    }
}

function processEquation() {
    // deal with +/- button later
    var currVal = 0;
    var workingArr = equation;

    while (workingArr.length > 2) {
        currVal = calculate(workingArr[0], workingArr[1], workingArr[2]);
        workingArr = workingArr.slice(3);
        workingArr.unshift(currVal);
    }

    equation = [];
    numStr = currVal.toString();
    $("#resultsOutput").html(currVal);
    $("#equationOutput").html($("#equationOutput").html() + " " + currVal);
}

function removeLastItem() {
    if (numStr == "") {
        equation.pop();
    } else {
        numStr = numStr.slice(0, numStr.length - 1);
    }

    $("#resultsOutput").html(numStr);
    if (equation.length > 0) {
        $("#equationOutput").html(equation.join(' ') + " " + numStr);
    } else {
        $("#equationOutput").html(numStr);
    }
}

function resetEquation() {
    equation = [];
    numStr = "";
    $("#resultsOutput").html("0");
    $("#equationOutput").html("0");
}

function addItem(e) {
    if (e.innerHTML.search(/[0-9.]/) > -1) {
        numStr += e.innerHTML;
        $("#resultsOutput").html(numStr);
        if (equation.length > 0) {
            $("#equationOutput").html(equation.join(' ') + " " + numStr);
        } else {
            $("#equationOutput").html(numStr);
        }
    } else if (e.innerHTML == "+/-") {
        if (numStr.charAt(0) == "-") {
            numStr = numStr.slice(1);
        } else {
            numStr = "-" + numStr;
        }
        $("#resultsOutput").html(numStr);
    } else if (e.innerHTML.search(/[*+-/]/) > -1) {
        if (numStr != "") {
            $("#resultsOutput").html(numStr);
            equation.push(numStr);
        } else {
            $("#resultsOutput").html(equation[0]);
        }
        equation.push(e.innerHTML);
        $("#equationOutput").html(equation.join(' '));
        numStr = "";
    } else if (e.innerHTML == "=") {
        equation.push(numStr);
        numStr = "";
        $("#resultsOutput").html("");
        $("#equationOutput").html(equation.join(' ') + " =");
        processEquation();
    }
}

// processEquation();
