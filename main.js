function changeTime() {
    var date = new Date()
    document.getElementById("time").innerHTML = date;
}

window.onload = changeTime
window.setInterval(changeTime, 1)
