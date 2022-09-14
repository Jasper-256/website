var startingTime = 0;
var interval1;

function getime() {
    now = new Date();
    return now.getTime();
}

function update() {
    var currentTime = getime();
    var timePassed = currentTime - startingTime - 7000;
    var timeSecs = timePassed / 1000;
    var dub = Math.pow(2, timeSecs);
    var round = dub.toFixed(2);
    var displayNum = "$" + round.toString()
    document.getElementById("amt").innerHTML = displayNum;

    if(round >= 7) {
        stop();
    }
}

function start() {
    startingTime = getime();
    update();
    clearInterval(interval1);
    interval1 = setInterval(update, 1);
}

function stop() {
    clearInterval(interval1);
}
