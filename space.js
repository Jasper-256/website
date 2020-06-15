var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var redSquare;
var myObstacles = [];
var bullets = [];


// Changeable charicteristics to customize the game:
var mouseDeadZone = 25;

var playerWidth = 50;
var playerHeight = 20;
var movementSpeed = 3;

var bulletSpeed = 10;
var bulletRate = 2;
var bulletVariationDegrees = 15;
var maxBulletLifetime = 500; // (10 seconds)

var minEnemySize = 10;
var maxEnemySize = 20;
var maxEnemyNo = 2000;

var mapSize = 4000;
// End of changeable charicterestics


var currentEnemyNo = 0;
var bulletNumber = 0;
var started = false;

var translateX = 0;
var translateY = 0;

var mouseX = 0;
var mouseY = 0;

var keys = [];

var interval = setInterval(updateGameArea, 20);


document.addEventListener('mousemove', function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
})

document.addEventListener('keydown', function(e) {
    keys[e.keyCode] = true;
})

document.addEventListener('keyup', function(e) {
    keys[e.keyCode] = false;
})


function startGame() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    redSquare = new component(playerWidth, playerHeight, "red", canvas.width / 2, canvas.height / 2);
}

function clear() {
    context.clearRect(translateX, translateY, canvas.width, canvas.height);
}


startGame();





function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.angle = 0;
    this.speed = 0;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.lifetime = 0;
    
    this.update = function() {
        ctx = context;
        ctx.save();
        this.x += this.speedX;
        this.y += this.speedY;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }

    this.updateBullets = function() {
        ctx = context;


    }

    this.newPos = function() {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);

        x = -(this.speed * Math.cos(this.angle));
        y = -(this.speed * Math.sin(this.angle));
        translateX -= x;
        translateY -= y;
        ctx.translate(x, y);
    }

    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }

}






function updateGameArea() {

    for (i = 0; i < myObstacles.length; i += 1) {
        for (b = 0; b < bullets.length; b += 1) {
            if (bullets[b].crashWith(myObstacles[i])) {
                myObstacles.splice(i, 1);
                bullets.splice(b, 1);
                currentEnemyNo -= 1;
            }
        }
    }

    clear();

    if (mouseX && mouseY) {

        var mouseCenterX = mouseX - (canvas.width / 2);
        var mouseCenterY = mouseY - (canvas.height / 2);
        // console.log(mouseCenterX + ", " + mouseCenterY);


        function toRadians(degrees) {
            return degrees * Math.PI / 180;
        };

        function toDegrees(radians) {
            return radians * 180 / Math.PI;
        }


        function angle(cx, cy, ex, ey) {
            var dy = ey - cy;
            var dx = ex - cx;
            var theta = Math.atan2(dy, dx); // range (-PI, PI]
            theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
            // if (theta < 0) theta = 360 + theta; // range [0, 360)
            return theta;
        }


        distance = Math.sqrt((mouseCenterX * mouseCenterX) + (mouseCenterY * mouseCenterY));
        // console.log(distance);

        redSquare.angle = toRadians(angle(0, 0, mouseCenterX, mouseCenterY));

        if (distance >= mouseDeadZone) {
            redSquare.speed = movementSpeed;
        } else {
            redSquare.speed = 0;
        }
    }


    var centerX = translateX + (canvas.width / 2);
    var centerY = translateY + (canvas.height / 2);

    if (redSquare.angle != 0) {
        started = true;
    }
    if (redSquare.speed != 0) {
        started = true;
    }

    if (keys && keys[32]) { // space pressed
        if (bulletNumber % bulletRate == 0) {
            if ((redSquare.angle != 0) || started) {
                bullets.push(new component(5, 5, "blue", centerX, centerY));
                var shootAngle = redSquare.angle + toRadians(Math.floor(Math.random() * bulletVariationDegrees) - (bulletVariationDegrees / 2));
                bullets[bullets.length - 1].speedX += bulletSpeed * Math.cos(shootAngle);
                bullets[bullets.length - 1].speedY += bulletSpeed * Math.sin(shootAngle);
            }
        }
        bulletNumber += 1;
    }

    for (i = 0; i < bullets.length; i += 1) {
        // bullets[i].x += 8;
        bullets[i].lifetime += 1;
        if (bullets[i].lifetime > maxBulletLifetime) {
            bullets.splice(i, 1);
        } else {
            bullets[i].update();
        }
    }



    while (currentEnemyNo < maxEnemyNo) {
        var mapXMin = (canvas.width / 2) - (mapSize / 2);
        var mapXMax = (canvas.width / 2) + (mapSize / 2);
        var randomX = Math.floor(Math.random() * (mapXMax - mapXMin)) + mapXMin;

        var mapYMin = (canvas.height / 2) - (mapSize / 2);
        var mapYMax = (canvas.height / 2) + (mapSize / 2);
        var randomY = Math.floor(Math.random() * (mapYMax - mapYMin)) + mapYMin;

        var randomSize = Math.floor(Math.random() * (maxEnemySize - minEnemySize)) + minEnemySize;

        myObstacles.push(new component(randomSize, randomSize, "green", randomX, randomY));

        currentEnemyNo += 1;
    }


    for (i = 0; i < myObstacles.length; i += 1) {
        // myObstacles[i].x += -1;
        myObstacles[i].update();
    }

    redSquare.newPos();
    redSquare.update();
}


// function moveUp() {
//     redSquare.speedY -= 5;
// }

// function moveDown() {
//     redSquare.speedY += 5;
// }

// function moveLeft() {
//     redSquare.speedX -= 5;
// }

// function moveRight() {
//     redSquare.speedX += 5;
// }

// function stopMove() {
//     redSquare.speedX = 0;
//     redSquare.speedY = 0;
// }
