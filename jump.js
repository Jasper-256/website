let rotation = 0;
let threshold = 20;

function move() {
    let charOn1 = detChar("1");
    let track = document.getElementById("track").textContent;

    let first = "r"; // track.charAt(0);

    if(Math.floor(Math.random() * 20) == 0) {// rotation == threshold) { // Math.floor(Math.random() * 2) + 8) {
        first = "|";
        rotation = 0;
        threshold = threshold - Math.floor(Math.random() * 2);
        if(threshold < 4) {
            threshold = 20;
        }
    } else {
        first = "_"
    }

    track = track.slice(1, track.length);
    track = track + first;

    let upperTrack = track.split("");
    for(item in upperTrack) {
        if(upperTrack[item] == "_") {
            upperTrack[item] = "&nbsp";
        }
    }

    // replace = 17;
    // track = track.substr(0, replace) + "x" + track.substr(replace + 1);
    let gameOver = false;

    if(charOn1 && track[16] == "|") {
        gameOver = true;
    } else {
        gameOver = false;
    }
    
    document.getElementById("track").innerHTML = track;
    document.getElementById("1").innerHTML = upperTrack.join("");
    // console.log(track);
    rotation++;

    putChar("1", charOn1);
    if(gameOver) {
        gameOver();
    }
}

function gameOver() {
    document.getElementById("title").innerHTML = "Game Over";
    document.getElementById("button").innerHTML = "Play Again";
    document.getElementById("track").innerHTML = "________________________________________________________________________________________________________________________________";
    console.log("game over");
}

function run() {
    setInterval(move, 50);
}

function putChar(on, add) {
    let arr = document.getElementById(on).textContent.split("");
    if(add) {
        arr[16] = "f";
    } else {
        arr[16] = "&nbsp";
    }
    let str = arr.join("");
    document.getElementById(on).innerHTML = str;
}

function detChar(on) {
    let arr = document.getElementById(on).textContent.split("");
    if(arr[16] == "f") {
        return true;
    } else {
        return false;
    }
}

run();
putChar("1", true);

function jump1() {
    putChar("2", false);
    putChar("3", true);
}

function jump2() {
    putChar("3", false);
    putChar("2", true);
}

function jump3() {
    putChar("2", false);
    putChar("1", true);
}


document.onkeypress = function(e) {
    e = e || window.event;
    if(e.key == " " || e.key == "j") {
        buttonClicked();
    }
};

function buttonClicked() {
    if(document.getElementById("title").innerText == "Game Over") {
        document.getElementById("title").innerHTML = "Playing";
        document.getElementById("button").innerHTML = "Jump";
    } else {
        console.log("jump");
        if(detChar("1")) {
            putChar("1", false);
            putChar("2", true);
            setTimeout(jump1, 200);
            setTimeout(jump2, 400);
            setTimeout(jump3, 600);
        } else {
            console.log("no char on 1");
        }
    }
}
