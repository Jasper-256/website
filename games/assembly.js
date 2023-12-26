let rows = 8;

function setup() {
    let text1 = "";
    let text2 = "";
    let text3 = "";
    for(i = 1; i <= rows; i++) {
        switch(i) {
            case 1:
                text1 = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
                text2 = text1;
                text3 = text1;
                break;
            case 2:
                text1 = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
                text2 = text1;
                text3 = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp$$&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
                break;
            case 3:
                text1 = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
                text2 = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp$$&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
                text3 = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp__&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
                break;
            case 4:
                text1 = "&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp$$&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp";
                text2 = "&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp__&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp";
                text3 = "&nbsp&nbsp&nbsp|&nbsp&nbsp/&nbsp&nbsp\\&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp";
                break;
            case 5:
                text1 = "&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp__&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp";
                text2 = "&nbsp&nbsp&nbsp|&nbsp&nbsp/&nbsp&nbsp\\&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp";
                text3 = "&nbsp&nbsp&nbsp|&nbsp&nbsp\\__/&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp";
                break;
            case 6:
                text1 = "&nbsp&nbsp&nbsp|&nbsp&nbsp/&nbsp&nbsp\\&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp";
                text2 = "&nbsp&nbsp&nbsp|&nbsp&nbsp\\__/&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp";
                text3 = "&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp";
                break;
            case 7:
                text1 = "&nbsp&nbsp&nbsp|&nbsp>\\__/<&nbsp|&nbsp&nbsp&nbsp&nbsp";
                text2 = "&nbsp&nbsp&nbsp|&nbsp>&nbsp&nbsp&nbsp&nbsp<&nbsp|&nbsp&nbsp&nbsp&nbsp";
                text3 = text2;
                break;
            case 8:
                text1 = "___|________|____";
                text2 = text1;
                text3 = text1;
                break;
        }
        text1 = text1 + text2 + text3 + text2 + text1 + text2 + text3 + text2;

        document.getElementById(String(i)).innerHTML = text1;
    }
}

setup();

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
    setInterval(function() {move(trackId2, dirc2);}, 15);
}

function run() {
    for(i = 1; i <= rows; i++) {
        startInterval(String(i), true);
    }
}

run();
