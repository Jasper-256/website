var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// Changable vars:
var playerSpeed = 3;
var playerJumpSpeed = 4;
var gravityStrength = 0.1;

var playerSize = 20;
var playerYStart = playerSize / 2;

var playerColor = "green";


// Grid lines:
var gridLineSpacing = 25;

var numGridXLines = 25;
var numGridYLines = 15;

var gridXLength = (numGridYLines * gridLineSpacing) - gridLineSpacing;
var gridYLength = (numGridXLines * gridLineSpacing) - gridLineSpacing;

var gridLineThickness = 1;
var gridLineColor = "grey";

// Leave these alone:
var diagonalPlayerSpeed = playerSpeed / Math.sqrt(2);

var mapBottom = playerYStart - (playerSize / 2);

var keys = [];

var translateX = 0;
var translateY = 0;

var centerX = 0;
var centerY = 0;

var gridX = [];
var gridY = [];
