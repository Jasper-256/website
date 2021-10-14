let rows = 8;

function setup() {
    for(i = 1; i <= rows; i++) {
        document.getElementById(String(i)).innerHTML = "................................................................................................................................";
    }
}

setup();

function move(trackId, dirc) {
    let track = document.getElementById(trackId).textContent;
    let first = track.charAt(0);
    first = "+";

    // if(dirc) {
    //     track = track.substring(0, track.length - 1);
    //     track = first + track;
    // } else {
    track = track.slice(1, track.length);
    track = track + first;
    // }
    
    document.getElementById(trackId).innerHTML = track;
}

function startInterval(trackId2, dirc2) {
    setInterval(function() {move(trackId2, dirc2);}, 30);
}

function run() {
    for(i = 1; i <= rows; i++) {
        startInterval(String(i), false);
        // if(i % 2 == 0) {
        //     startInterval(String(i), true);
        // } else {
        //     startInterval(String(i), false);
        // }
    }
}

run();
