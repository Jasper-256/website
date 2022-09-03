var audio = document.getElementById("audio")
var started = false

var trigered = false

var date = new Date();
console.log(date.getMinutes(), date.getSeconds())

function start() {
    started = true
    document.getElementById("s_button").style.display = "none"
    document.getElementById("s_text").style.display = "block"
    console.log("start")
}

function play() {
    audio.play()
    console.log("play")
}

function stop() {
    audio.pause()
    console.log("stop")
}

setInterval(function() {
    var date = new Date();
    if (date.getMinutes() == 26 && date.getSeconds() == 55 && started) {
        if (trigered == false) {
            trigered = true
            console.log("time reached")
            play()
        }
    } else {
        trigered = false
    }
}, 10)
