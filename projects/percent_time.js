function updateTime() {
    var date = new Date();
    var hours = date.getHours();
    var hoursday = hours / 24;

    var minutes = date.getMinutes();
    var minutesday = minutes / 1440;

    var seconds = date.getSeconds();
    var secondsday = seconds / 86400;

    var milliseconds = date.getMilliseconds();
    var millisecondsday = milliseconds / 86400000;

    var decimal_percent_time = hoursday + minutesday + secondsday + millisecondsday;
    var rounded_percent_time = Math.round(decimal_percent_time * 10000000) / 100000;
    
    var end_cut_percent_time_reg = rounded_percent_time.toFixed(5);
    var string_percent_time_reg = end_cut_percent_time_reg.toString().padStart(8, 0) + "%";

    var end_cut_percent_time_big = rounded_percent_time.toFixed(2);
    var string_percent_time_big = end_cut_percent_time_big.toString().padStart(5, 0) + "%";

    if(document.getElementById("type").innerHTML == "big") {
        document.getElementById("time").innerHTML = string_percent_time_big;
    } else {
        document.getElementById("time").innerHTML = string_percent_time_reg;
    }
}

window.onload = updateTime;
window.setInterval(updateTime, 1);
