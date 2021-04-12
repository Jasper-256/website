function startGame() {
    setCanvasDims();
    setCenters();

    player = new component(20, 20, centerX, centerY, "red", "player");
    plant = new component(5, 5, 60, 60, "green", "plant");

    for (i = 0; i < numGridXLines; i++) {
        var startX = centerX - (numGridXLines * (gridLineSpacing / 2)) + (gridLineSpacing / 2);
        var startY = centerY - ((numGridYLines * gridLineSpacing) / 2) + (gridLineSpacing / 2) + playerYStart;
        gridX[i] = new component(gridLineThickness, gridXLength, startX + (i * gridLineSpacing), startY, gridLineColor, "grid");
    }

    for (i = 0; i < numGridYLines; i++) {
        var startY = centerY - (numGridYLines * gridLineSpacing) + gridLineSpacing + playerYStart;
        gridY[i] = new component(gridYLength, gridLineThickness, centerX, startY + (i * gridLineSpacing), gridLineColor, "grid");
    }
}


function component(width, height, x, y, color, type) {
    ctx = context;
    this.type = type;
    this.width = width;
    this.height = height;
    this.color = color;
    this.angle = 0;
    this.speed = 0;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    
    this.update = function() {
        ctx.save();
        this.x += this.speedX;
        this.y += this.speedY;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }

    this.updateText = function() {
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
    }

    this.moveCanvas = function() {
        var moveX = -this.speedX;
        var moveY = -this.speedY;
        translateX -= moveX;
        translateY -= moveY;
        ctx.translate(moveX, moveY);
    }
}



function updateGameArea() {

    clear();

    // setCanvasDims();
    setCenters();

    resetSpeed();

    if (keys) {
        if (rightPressed()) {
            player.speedX = playerSpeed;
        }
        if (leftPressed()) {
            player.speedX = -playerSpeed;
        }
        if (downPressed()) {
            player.speedY = playerSpeed;
        }
        if (upPressed()) {
            player.speedY = -playerSpeed;
        }

        if (rightPressed() && downPressed()) {
            player.speedX = diagonalPlayerSpeed;
            player.speedY = diagonalPlayerSpeed;
        }
        if (rightPressed() && upPressed()) {
            player.speedX = diagonalPlayerSpeed;
            player.speedY = -diagonalPlayerSpeed;
        }
        if (leftPressed() && downPressed()) {
            player.speedX = -diagonalPlayerSpeed;
            player.speedY = diagonalPlayerSpeed;
        }
        if (leftPressed() && upPressed()) {
            player.speedX = -diagonalPlayerSpeed;
            player.speedY = -diagonalPlayerSpeed;
        }

        if (rightPressed() && leftPressed()) {
            player.speedX = 0;
        }
        if (downPressed() && upPressed()) {
            player.speedY = 0;
        }
    }

    for (i = 0; i < gridX.length; i++) {
        gridX[i].update();
    }

    for (i = 0; i < gridY.length; i++) {
        gridY[i].update();
    }

    // plant.update();
    
    player.moveCanvas();
    player.update();
}

startGame();
setInterval(updateGameArea, 16.667);
