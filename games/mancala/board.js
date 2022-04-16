function isOnPlayerSide(spot) {
    if(spot <= 6) {
        return true
    } else {
        return false
    }
}

function isInMancala(spot) {
    if(spot == 6 || spot == 13) {
        return true
    } else {
        return false
    }
}

function isOnEnemyMancala(start, currentSpot) {
    let onPlayerSide = isOnPlayerSide(start)
    if(onPlayerSide && currentSpot == 13) {
        return true
    } else if(!onPlayerSide && currentSpot == 6) {
        return true
    } else {
        return false
    }
}

function calculateOppositeSpot(spot) {
    var oppositeSpot
    let distance = 6 - spot
    oppositeSpot = distance + 6
    if(oppositeSpot == -1) {
        oppositeSpot = 13
    }
    return oppositeSpot
}

function getMancalaIdFromPlayerSide(side) {
    if(side == true) {
        return 6
    } else {
        return 13
    }
}

function getMancalaIdFromStartingSpot(startingSpot) {
    if(isOnPlayerSide(startingSpot)) {
        return 6
    } else {
        return 13
    }
}

function countTotalMarblesOnSide(boardList, side) {
    var totalMarbles = 0
    for(i in boardList) {
        if(isOnPlayerSide(i) == side && !isInMancala(i)) {
            totalMarbles += boardList[i]
        }
    }
    return totalMarbles
}

class Board {
    constructor() {
        this.board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]
        this.gameOver = false
    }

    printBoard() {
        console.log(this.board[12], this.board[11], this.board[10], this.board[9], this.board[8], this.board[7])
        console.log(this.board[13], this.board[6])
        console.log(this.board[0], this.board[1], this.board[2], this.board[3], this.board[4], this.board[5])
        var totalPeices = 0
        for(var i in this.board) {
            totalPeices += this.board[i]
        }
        console.log(totalPeices)
        console.log(countTotalMarblesOnSide(this.board, true))
        console.log(countTotalMarblesOnSide(this.board, false))
    }

    movePiece(spotToMove) {
        // Storing the starting position
        let startingPosition = spotToMove
        // Storing all the marbles picked up to put down later
        var marbelsPickedUp = this.board[spotToMove]
        // Removing the marbles from their original spot
        this.board[spotToMove] = 0

        while(marbelsPickedUp > 0) {
            // Overflow onto the other side
            if(spotToMove >= 13) {
                spotToMove = -1
            }
            // Incrementing the spot to put marbles
            spotToMove += 1
            // Checking if the spot where marbles will be put is in the wrong mancala and skipping it if it is
            if(isOnEnemyMancala(startingPosition, spotToMove)) {
                spotToMove += 1
                // Making sure the spot to move is not out of bounds
                if(spotToMove > 13) {
                    spotToMove = 0
                }
            }
            // Adding the marbles to the spots on the board
            this.board[spotToMove] += 1
            marbelsPickedUp -= 1
            // Checking if a marble captures enemy marbles
            // if it is on the last marble being put down,
            // and the spot in the board where it is being put has one marble after it is put there,
            // and the spot where it is being put is not a mancala,
            // and it is on the same side of the board as it started on,
            // and the spot opposite of the one the marbel was put in has no marbles in it.
            if(marbelsPickedUp == 0 && this.board[spotToMove] == 1 && !isInMancala(spotToMove) && isOnPlayerSide(startingPosition) == isOnPlayerSide(spotToMove) && this.board[calculateOppositeSpot(spotToMove)] != 0) {
                // Add the marbles from the spot captured and the other spot to the captured marbles total
                let marbelsCaptured = this.board[spotToMove] + this.board[calculateOppositeSpot(spotToMove)]
                // Empty the captured spot and the spot across it
                this.board[spotToMove] = 0
                this.board[calculateOppositeSpot(spotToMove)] = 0
                // Add the captured marbles to the player's mancala
                this.board[getMancalaIdFromStartingSpot(startingPosition)] += marbelsCaptured
                console.log("capture")
            }
        }
        // Do something if one side of the board is empty
        var c = 0
        var truefalse
        while(c < 2) {
            // Set truefalse to true for the first loop then false for the second
            if(c == 0) {
                truefalse = true
            } else {
                truefalse = false
            }
            // If the total marbles on the side of the board being checked is 0
            if(countTotalMarblesOnSide(this.board, truefalse) == 0) {
                // Calculate total marbles on the non-empty side of the board
                let totalMarblesOnOtherSide = countTotalMarblesOnSide(this.board, !truefalse)
                // Add them to the correct mancala
                this.board[getMancalaIdFromPlayerSide(!truefalse)] += totalMarblesOnOtherSide
                // Clear the board
                var i = 0
                while(i < this.board.length) {
                    if(!isInMancala(i)) {
                        this.board[i] = 0
                    }
                    i += 1
                }
                console.log("game over", totalMarblesOnOtherSide)
                this.gameOver = true
            }
            c += 1
        }
    }

    // movePlayer(spot) {
    //     if(spot < 6 && spot >= 0) {
    //         this.movePiece(spot)
    //     } else {
    //         console.log(spot, "is out of range")
    //     }
    // }

    // moveEnemy(spot) {
    //     if(spot < 6 && spot >= 0) {
    //         this.movePiece(spot + 7)
    //     } else {
    //         console.log(spot, "is out of range")
    //     }
    // }
}
