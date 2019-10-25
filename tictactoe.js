function x(sq) {
    document.getElementById(sq + "a").innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
    document.getElementById(sq + "b").innerHTML = "&nbsp&nbsp\\/&nbsp&nbsp";
    document.getElementById(sq + "c").innerHTML = "&nbsp&nbsp/\\&nbsp&nbsp";
}



function o(sq) {
    document.getElementById(sq + "a").innerHTML = "&nbsp&nbsp__&nbsp&nbsp";
    document.getElementById(sq + "b").innerHTML = "&nbsp|&nbsp&nbsp|&nbsp";
    document.getElementById(sq + "c").innerHTML = "&nbsp|__|&nbsp";
}


function r(sq) {
    document.getElementById(sq + "a").innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
    document.getElementById(sq + "b").innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
    document.getElementById(sq + "c").innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
}


function q(sq) {
    if(document.getElementById(sq + "a").innerHTML == "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" && 
    document.getElementById(sq + "b").innerHTML == "&nbsp;&nbsp;\\/&nbsp;&nbsp;" && 
    document.getElementById(sq + "c").innerHTML == "&nbsp;&nbsp;/\\&nbsp;&nbsp;") {
        return "x";
    } else if(document.getElementById(sq + "a").innerHTML == "&nbsp;&nbsp;__&nbsp;&nbsp;" &&
    document.getElementById(sq + "b").innerHTML == "&nbsp;|&nbsp;&nbsp;|&nbsp;" &&
    document.getElementById(sq + "c").innerHTML == "&nbsp;|__|&nbsp;") {
        return "o";
    } else {
        return "r";
    }
}



let yourTurn = true;
let gameOver = false;

function c(sq) {
    if(q(sq) == "r" && gameOver == false) {
        if(yourTurn) {
            x(sq);
        } else {
            o(sq);
        }
        yourTurn = !yourTurn;
        check();
    }
}

// Clears the bord
function clr() {
    console.log("clear");
    r(1);
    r(2);
    r(3);
    r(4);
    r(5);
    r(6);
    r(7);
    r(8);
    r(9);
    yourTurn = true;
    gameOver = false;
    document.getElementById("winloss").innerHTML = "&nbsp";
    check();
}


function check() {
    checkForDraws();
    checkForXWins();
    checkForOWins();
    checkClear();
}

function checkClear() {
    if(gameOver == true) {
        document.getElementById("clear").innerHTML = "Play Again";
    } else {
        document.getElementById("clear").innerHTML = "Clear";
    }
}

function checkForDraws() {
    if(q(1) != "r" && q(2) != "r" && q(3) != "r" && q(4) != "r" && q(5) != "r" && q(6) != "r" && q(7) != "r" && q(8) != "r" && q(9) != "r") {
        document.getElementById("winloss").innerHTML = "It's a Draw";
        gameOver = true;
    }
}

function checkForXWins() {
    if(q(1) == "x" && q(2) == "x" && q(3) == "x") {
        xWins();
    }
    if(q(4) == "x" && q(5) == "x" && q(6) == "x") {
        xWins();
    }
    if(q(7) == "x" && q(8) == "x" && q(9) == "x") {
        xWins();
    }
}

function checkForOWins() {
    if(q(1) == "o" && q(2) == "o" && q(3) == "o") {
        oWins();
    }
    if(q(4) == "o" && q(5) == "o" && q(6) == "o") {
        oWins();
    }
    if(q(7) == "o" && q(8) == "o" && q(9) == "o") {
        oWins();
    }
}

function xWins() {
    document.getElementById("winloss").innerHTML = "X Wins!";
    gameOver = true;
}

function oWins() {
    document.getElementById("winloss").innerHTML = "O Wins!";
    gameOver = true;
}


// Dark/Light Mode
function setLight() {
    document.body.style.backgroundColor = "white";
    var cols = document.getElementsByTagName("BODY");
    for(i = 0; i < cols.length; i++) {
        cols[i].style.color = "black";
    }
}

function setDark() {
    document.body.style.backgroundColor = "1a1a1a";
    var cols = document.getElementsByTagName("BODY");
    for(i = 0; i < cols.length; i++) {
        cols[i].style.color = "white";
    }
}

function darkCheck() {
    var checkBox = document.getElementById("check");

    if(checkBox.checked == true) {
        setDark();

        localStorage.setItem("dark", true);
    } else {
        setLight();

        localStorage.setItem("dark", false);
    }
}

function restoreDark() {
    var checkBox = document.getElementById("check");

    if(localStorage.getItem("dark") == "true") {
        setDark()
        checkBox.checked = true;
    } else {
        setLight()
        checkBox.checked = false;
    }
}

restoreDark();
console.log(localStorage.getItem("dark"));

// console.log(q(1));
// console.log(q(2));
// console.log(q(3));
// console.log(q(4));
// console.log(q(5));
// console.log(q(6));
// console.log(q(7));
// console.log(q(8));
// console.log(q(9));

