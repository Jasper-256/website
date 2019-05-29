function updateTime() {
    var date = new Date();
    var hours = date.getHours();
    var hoursday = hours / 24;

    var minutes = date.getMinutes();
    var minutesday = minutes / 1440;

    var seconds = date.getSeconds();
    var secondsday = seconds / 86400;

    var decimal = hoursday + minutesday + secondsday;
    var rounded = Math.round(decimal * 100000) / 1000;
    var string = rounded.toString() + '%';
    document.getElementById("time").innerHTML = string;
}

window.onload = updateTime;
window.setInterval(updateTime, 1);
