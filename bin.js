function move(trackId, dirc) {
    let track = document.getElementById(trackId).textContent;
    let first = "e"
    if(dirc) {
        first = track.charAt(track.length - 1);
    } else {
        first = track.charAt(0);
    }

    if(dirc) {
        track = track.substring(0, track.length - 1);
        track = first + track;
    } else {
        track = track.slice(1, track.length);
        track = track + first;
    }
    
    document.getElementById(trackId).innerHTML = track;
}

function startInterval(trackId2, dirc2) {
    setInterval(function() {move(trackId2, dirc2);}, 50);
}

function run() {
    for(i = 1; i <= 10; i++) {
        startInterval(String(i), true);
        // if(i % 2 == 0) {
        //     startInterval(String(i), true);
        // } else {
        //     startInterval(String(i), false);
        // }
    }
}

run();
