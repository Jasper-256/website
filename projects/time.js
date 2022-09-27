Date.prototype.getDOY = function() {
    var today = new Date();
    var onejan = new Date(this.getFullYear(), 0, 1);
    var todayOffsetMins = -(today.getTimezoneOffset());
    var onejanOffsetMins = -(onejan.getTimezoneOffset());
    var onejanTimezoneOffsetMins = onejanOffsetMins - todayOffsetMins;

    var onejanFinal = new Date(this.getFullYear(), 0, 1, 0, onejanTimezoneOffsetMins);
    return (Math.ceil((this - onejanFinal) / 86400000)) - 1;
}

Date.prototype.getDozenalHours = function() {
    var hours = this.getHours();
    switch(hours) {
        case 10:
            return "X";
        case 11:
            return "E";
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
            return (hours - 2).toString();
        case 22:
            return "1X";
        case 23:
            return "1E";
        case 24:
            return "20";
        default:
            return hours.toString();
    }
}

function updateTime() {
    var today = new Date();
    
    var year = today.getFullYear().toString();
    var month = (today.getMonth() + 1).toString().padStart(2, 0);
    var day = today.getDate().toString().padStart(2, 0);
    var daynum = today.getDOY().toString().padStart(3, 0);
    var hours = today.getHours().toString().padStart(2, 0);
    var minutes = today.getMinutes().toString().padStart(2, 0);
    var seconds = today.getSeconds().toString().padStart(2, 0);
    var milliseconds = today.getMilliseconds().toString().padStart(3, 0);

    // Offset
    var timezoneOffset = -today.getTimezoneOffset();
    var offsetDirecton = ((timezoneOffset >= 0) ? "+" : "-");
    timezoneOffset = Math.abs(timezoneOffset);
    var offsetHours = (Math.floor(timezoneOffset / 60)).toString().padStart(2, 0);
    var offsetMinutes = (Math.floor(timezoneOffset % 60)).toString().padStart(2, 0);

    // Dozenal
    var dozenalHours = today.getDozenalHours().padStart(2, 0);

    // Unix
    var unix = today.getTime();
    var unixFormatted = (unix / 1000).toFixed(3);

    // Percent
    var hoursday = hours / 24;
    var minutesday = minutes / 1440;
    var secondsday = seconds / 86400;
    var millisecondsday = milliseconds / 86400000;
    var decimal_time = hoursday + minutesday + secondsday + millisecondsday;
    var rounded_percent_time = Math.round(decimal_time * 10000000) / 100000;
    var end_cut_percent_time_reg = rounded_percent_time.toFixed(5);
    var string_percent_time_reg = end_cut_percent_time_reg.toString().padStart(8, 0) + "%";

    // Decimal Unix
    var decimalUnixRaw = unix / 86400000;
    var decimalUnixString = decimalUnixRaw.toFixed(7);

    // Decimal
    var decimal_time_cut = decimal_time.toFixed(8);
    var decHours = decimal_time_cut.slice(2, 3);
    var decMinutes = decimal_time_cut.slice(3, 5);
    var decSeconds = decimal_time_cut.slice(5, 7);
    var decMS = decimal_time_cut.slice(7, 9);

    // Milliday
    var millidayRaw = decimal_time * 1000;
    var millidayString = millidayRaw.toFixed(3).padStart(7, 0);

    document.getElementById("offset").innerHTML = offsetDirecton + offsetHours + ":" + offsetMinutes;
    document.getElementById("time").innerHTML = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    document.getElementById("dozenal").innerHTML = dozenalHours + ":" + minutes + ":" + seconds + "." + milliseconds;
    document.getElementById("unix").innerHTML = unixFormatted;
    document.getElementById("decimal").innerHTML = decHours + ":" + decMinutes + ":" + decSeconds + "." + decMS;
    document.getElementById("percent").innerHTML = string_percent_time_reg;
    document.getElementById("milliday").innerHTML = millidayString;
    document.getElementById("decimalunix").innerHTML = decimalUnixString;
    document.getElementById("ordinal").innerHTML = year + "-" + daynum;
    document.getElementById("date").innerHTML = year + "-" + month + "-" + day;
}

window.onload = updateTime;
window.setInterval(updateTime, 1);
