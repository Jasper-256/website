function move() {
    let track = document.getElementById("track").textContent;

    let first = "r"; // track.charAt(0);

    if(Math.floor(Math.random() * 20) == 0) {
        first = "|";
    } else {
        first = "_"
    }

    track = track.slice(1, track.length);
    track = track + first;

    // replace = 17;
    // track = track.substr(0, replace) + "x" + track.substr(replace + 1);

    document.getElementById("track").innerHTML = track;
    console.log(track);
}

function run() {
    setInterval(move, 50);
}

run();
