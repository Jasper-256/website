var mainBoard = new Board()
var playerSidePointerable = true
var enemySidePointerable = true
var playerTurn = true
let prefixIdOfSpot = "2"
let prefixIdOfMancala = "end"
mainBoard.printBoard()

function updateState() {
    if(playerTurn) {
        playerSidePointerable = true
        enemySidePointerable = false
        document.getElementById("state").innerHTML = "player turn"
    } else {
        playerSidePointerable = false
        enemySidePointerable = true
        document.getElementById("state").innerHTML = "enemy turn"
    }
}

function updatePointerableSides() {
    i = 0
    while(i <= 13) {
        if(!isInMancala(i)) {
            j = 0
            while(j < 4) {
                if(isOnPlayerSide(i)) {
                    if(playerSidePointerable) {
                        document.getElementById(String(j) + String(i)).className = "pointer"
                    } else {
                        document.getElementById(String(j) + String(i)).className = ""
                    }
                } else {
                    if(enemySidePointerable) {
                        document.getElementById(String(j) + String(i)).className = "pointer"
                    } else {
                        document.getElementById(String(j) + String(i)).className = ""
                    }
                }
                // console.log(String(j) + String(i), playerSidePointerable)
                j += 1
            }
        }
        i += 1
    }
}

function updateBoard() {
    var i = 0
    while(i <= 13) {
        if(!isInMancala(i)) {
            if(mainBoard.board[i] == 0) {
                document.getElementById(prefixIdOfSpot + String(i)).innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"
            } else if(mainBoard.board[i] < 10) {
                document.getElementById(prefixIdOfSpot + String(i)).innerHTML = "&nbsp&nbsp&nbsp" + mainBoard.board[i] + "&nbsp&nbsp&nbsp"
            } else {
                document.getElementById(prefixIdOfSpot + String(i)).innerHTML = "&nbsp&nbsp" + mainBoard.board[i] + "&nbsp&nbsp&nbsp"
            }
        } else {
            if(mainBoard.board[i] == 0) {
                document.getElementById(prefixIdOfMancala + String(i)).innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"
            } else if(mainBoard.board[i] < 10) {
                document.getElementById(prefixIdOfMancala + String(i)).innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + mainBoard.board[i] + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"
            } else {
                document.getElementById(prefixIdOfMancala + String(i)).innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + mainBoard.board[i] + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"
            }
        }
        i += 1
    }
    playerTurn = !playerTurn
}

function update() {
    updateState()
    updateBoard()
    updateState()
    updatePointerableSides()
}

function userClick(box) {
    if((playerSidePointerable && isOnPlayerSide(box)) || (enemySidePointerable && !isOnPlayerSide(box))) {
        mainBoard.movePiece(box)
        console.log("")
        mainBoard.printBoard()
        update()
    }
}

update()
