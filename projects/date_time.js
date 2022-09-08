Date.prototype.getDOY = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((this - onejan) / 86400000);
}

function updateTime() {
    var today = new Date();
    
    var year = today.getFullYear().toString();
    var daynum = (today.getDOY() - 1).toString().padStart(3, 0);
    var hours = today.getHours().toString().padStart(2, 0);
    var minutes = today.getMinutes().toString().padStart(2, 0);
    var seconds = today.getSeconds().toString().padStart(2, 0);
    var miliseconds = today.getMilliseconds().toString().padStart(3, 0);
    
    document.getElementById("time").innerHTML = year + "-" + daynum + " " + hours + ":" + minutes + ":" + seconds + "." + miliseconds;
}

window.onload = updateTime;
window.setInterval(updateTime, 1);
