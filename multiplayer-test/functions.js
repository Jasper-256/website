document.addEventListener('keydown', function(e) {
    keys[e.keyCode] = true;
})

document.addEventListener('keyup', function(e) {
    keys[e.keyCode] = false
})

function setCanvasDims() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function setCenters() {
    centerX = translateX + (canvas.width / 2);
    centerY = translateY + (canvas.height / 2);
}


function clear() {
    context.clearRect(translateX, translateY, canvas.width, canvas.height);
}

function rightPressed() {
    if (keys[39] || keys[68]) {
        return true;
    } else {
        return false;
    }
}

function leftPressed() {
    if (keys[37] || keys[65]) {
        return true;
    } else {
        return false;
    }
}

function downPressed() {
    if (keys[40] || keys[83]) {
        return true;
    } else {
        return false;
    }
}

function upPressed() {
    if (keys[38] || keys[87]) {
        return true;
    } else {
        return false;
    }
}

function resetSpeed() {
    player.speedX = 0;
    // player.speedY = 0;
}
