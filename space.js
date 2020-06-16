var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var xpCounter;
var player;
var enemyShips = [];
var bullets = [];
var food = [];


// Changeable charicteristics to customize the game:
var mouseDeadZone = 25;
var xpOffset = 40;

var playerWidth = 50;
var playerHeight = 20;
var playerSpeed = 3;
var autoSpinSpeed = 1.5; // 4 secs per rotation

var bulletSpeed = 8;
var bulletRate = 4; // 15 per sec (every 4 frames)
var bulletVariationDegrees = 15;
var maxBulletLifetime = 180; // 3 secs

var enemyShipNo = 10;
var enemyShipSpeed = 2;
var enemyShipLockOnDistance = 700;
var enemyShipStopDistance = 400;
var enemyShipBackUpDistance = 100;

var minFoodSize = 10;
var maxFoodSize = 20;
var foodNo = 2000;

var mapSize = 4000;
// End of changeable charicterestics


var xp = 0;
var level = 0;

var currentEnemyShipNo = 0;
var currentFoodNo = 0;
// var started = false;

var mouseDown = false;

var autofire = false;
var autofireKeyDown = false;

var autospin = false;
var autospinKeyDown = false;

var translateX = 0;
var translateY = 0;

var mouseX = 0;
var mouseY = 0;

var keys = [];

var interval = setInterval(updateGameArea, 16.667); // 60 FPS


document.addEventListener('mousemove', function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
})

document.addEventListener('mousedown', function(e) {
    mouseDown = true;
})

document.addEventListener('mouseup', function(e) {
    mouseDown = false;
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
    player = new component(playerWidth, playerHeight, "red", canvas.width / 2, canvas.height / 2);
    xpCounter = new component("30px", "Arial", "black", 0, 0, "text"); // x and y for this are set in updateGameArea()
}

function clear() {
    context.clearRect(translateX, translateY, canvas.width, canvas.height);
}


startGame();







function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.angle = 0;
    this.speed = 0;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.lifetime = 0;
    this.bulletNumber = 0;
    
    this.update = function() {
        ctx = context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.save();
            this.x += this.speedX;
            this.y += this.speedY;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = color;
            ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
            ctx.restore();
        }
    }

    this.moveBasedOnSpeed = function() {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
    }

    this.newPos = function() {
        x = -(this.speed * Math.cos(this.angle));
        y = -(this.speed * Math.sin(this.angle));
        translateX -= x;
        translateY -= y;
        ctx.translate(x, y);
    }

    this.crashWith = function(otherobj) {
        try {
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
        } catch(error) {
            console.log("component.crashWith() function error: " + error);
            return false;
        }
    }

}







function updateGameArea() {

    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    }

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

    function distance(x1, y1, x2, y2) {
        return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
    }




    for (f = 0; f < food.length; f += 1) {
        for (b = 0; b < bullets.length; b += 1) {
            if (bullets[b].crashWith(food[f])) {
                food.splice(f, 1);
                bullets.splice(b, 1);
                currentFoodNo -= 1;
                xp += 1;
            }
        }
    }

    for (a = 0; a < bullets.length; a += 1) {
        for (b = 0; b < bullets.length; b += 1) {
            if (a != b) {
                if (bullets[a].crashWith(bullets[b])) {
                    bullets.splice(a, 1);
                    bullets.splice(b, 1);
                }
            }
        }
    }

    clear();

    

    if (mouseX && mouseY) {

        var mouseCenterX = mouseX - (canvas.width / 2);
        var mouseCenterY = mouseY - (canvas.height / 2);
        // console.log(mouseCenterX + ", " + mouseCenterY);


        if (keys && keys[67] && !autospinKeyDown) { // 67 is c key
            autospin = !autospin;
            autospinKeyDown = true;
        }
    
        if (keys && !keys[67]) { // 67 is c key
            autospinKeyDown = false;
        }


        var mouseDistanceFromPlayer = distance(mouseCenterX, mouseCenterY, 0, 0);
        
        if (!autospin) {
            player.angle = toRadians(angle(0, 0, mouseCenterX, mouseCenterY));
        } else {
            player.angle += toRadians(autoSpinSpeed);
        }

        if (mouseDistanceFromPlayer >= mouseDeadZone) {
            player.speed = playerSpeed;
        } else {
            player.speed = 0;
        }
    }


    var centerX = translateX + (canvas.width / 2);
    var centerY = translateY + (canvas.height / 2);



    if (keys && keys[69] && !autofireKeyDown) {
        autofire = !autofire;
        autofireKeyDown = true;
    }

    if (keys && !keys[69]) {
        autofireKeyDown = false;
    }

    if ((keys && keys[32]) || mouseDown || autofire) { // space pressed
        if (player.bulletNumber % bulletRate == 0) {
            bullets.push(new component(5, 5, "blue", centerX, centerY));

            var shootAngle = player.angle;
            shootAngle += toRadians((Math.random() * bulletVariationDegrees) - (bulletVariationDegrees / 2));

            bullets[bullets.length - 1].speedX += bulletSpeed * Math.cos(shootAngle);
            bullets[bullets.length - 1].speedY += bulletSpeed * Math.sin(shootAngle);
        }
        player.bulletNumber += 1;
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

    function getRandomX() {
        var mapXMin = (canvas.width / 2) - (mapSize / 2);
        var mapXMax = (canvas.width / 2) + (mapSize / 2);
        return randomX = Math.floor(Math.random() * (mapXMax - mapXMin)) + mapXMin;
    }

    function getRandomY() {
        var mapYMin = (canvas.height / 2) - (mapSize / 2);
        var mapYMax = (canvas.height / 2) + (mapSize / 2);
        return randomY = Math.floor(Math.random() * (mapYMax - mapYMin)) + mapYMin;
    }


    while (currentFoodNo < foodNo) {
        var randomSize = Math.floor(Math.random() * (maxFoodSize - minFoodSize)) + minFoodSize;

        food.push(new component(randomSize, randomSize, "green", getRandomX(), getRandomY()));

        currentFoodNo += 1;
    }

    while (currentEnemyShipNo < enemyShipNo) {
        enemyShips.push(new component(playerWidth, playerHeight, "purple", getRandomX(), getRandomY()));

        currentEnemyShipNo += 1;
    }


    for (i = 0; i < food.length; i += 1) {
        // myObstacles[i].x += -1;
        food[i].update();
    }

    for (i = 0; i < enemyShips.length; i += 1) {

        var distanceToPlayer = distance(enemyShips[i].x, enemyShips[i].y, player.x, player.y);

        enemyShips[i].angle = toRadians(angle(enemyShips[i].x, enemyShips[i].y, player.x, player.y));

        if (distanceToPlayer < enemyShipLockOnDistance && distanceToPlayer > enemyShipStopDistance) {
            enemyShips[i].speed = enemyShipSpeed;
        } else if (distanceToPlayer < enemyShipBackUpDistance) {
            enemyShips[i].speed = -enemyShipSpeed;
        } else {
            enemyShips[i].speed = 0;
        }

        if (distanceToPlayer < enemyShipLockOnDistance && enemyShips[i].bulletNumber % bulletRate == 0) {
            bullets.push(new component(5, 5, "blue", enemyShips[i].x, enemyShips[i].y));

            var shootAngle = enemyShips[i].angle;
            shootAngle += toRadians((Math.random() * bulletVariationDegrees) - (bulletVariationDegrees / 2));

            bullets[bullets.length - 1].speedX += bulletSpeed * Math.cos(shootAngle);
            bullets[bullets.length - 1].speedY += bulletSpeed * Math.sin(shootAngle);
        }

        enemyShips[i].bulletNumber += 1;
        enemyShips[i].moveBasedOnSpeed();
        enemyShips[i].update();
    }

    xpCounter.text = "XP: " + xp;
    xpCounter.x = xpOffset + translateX;
    xpCounter.y = canvas.height - xpOffset + translateY;
    xpCounter.update();

    player.moveBasedOnSpeed();
    player.newPos();
    player.update();
}

