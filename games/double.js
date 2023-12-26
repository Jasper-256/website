var startingTime = 0;
var interval1;

function getime() {
    let now = new Date();
    return now.getTime();
}

function update() {
    let currentTime = getime();
    let timePassed = currentTime - startingTime - 6644;
    let timeSecs = timePassed / 1000;
    let power = Math.pow(2, timeSecs);
    let round = power.toFixed(2);
    var displayNum = round.toString();
    displayNum = "$" + displayNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById("amt").innerHTML = displayNum;
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
