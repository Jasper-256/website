function updateTime() {
    // var date = new Date();
    // var hours = date.getHours();
    // var hoursday = hours / 24;

    // var minutes = date.getMinutes();
    // var minutesday = minutes / 1440;

    // var seconds = date.getSeconds();
    // var secondsday = seconds / 86400;

    // var milliseconds = date.getMilliseconds();
    // var millisecondsday = milliseconds / 86400000;

    // var decimal = hoursday + minutesday + secondsday + millisecondsday;
    // var rounded = Math.round(decimal * 10000000) / 100000;
    // var string = rounded.toString().padEnd(8, 0) + "%";
    // document.getElementById("time").innerHTML = "string";
}

window.onload = updateTime;
window.setInterval(updateTime, 1);
