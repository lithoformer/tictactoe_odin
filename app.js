
const gameBoard = (function () {
    const gameArray = new Array(3);
    for (let i = 0; i < gameArray.length; i++) {
        gameArray[i] = new Array(3);
        for (let j = 0; j < gameArray.length; j++) {
            gameArray[i][j] = null;
        }
    }
    const drawBoard = (player) => {
        for (move of player.moves) {
            if (player.type === 'human') {
                gameArray[move.x][move.y] = 1;
            }
            else {
                gameArray[move.x][move.y] = 0;
            }
        }
    }
    return { drawBoard, gameArray }
})();

function Player(type, moves, gameArray) {
    this.type = type;
    this.moves = moves;
    this.makeMove = function (x, y) {
        if (gameArray[x][y] === null) { moves.push({ x: x, y: y }); }
        else {
            console.log(`board position occupied!`)
        }
    }
}

const human = new Player('human', [], gameBoard.gameArray);
const CPU = new Player('CPU', [], gameBoard.gameArray);

function playGame() {
    let isHumanTurn = false;
    let positionFound = false;
    while (!checkStatus(gameBoard.gameArray)) {
        gameBoard.drawBoard(human);
        gameBoard.drawBoard(CPU);
        if (!checkStatus(gameBoard.gameArray) && isHumanTurn) {
            const x = prompt(`enter x coord`);
            const y = prompt(`enter y coord`);
            human.makeMove(x, y);
            isHumanTurn = !isHumanTurn;
        }
        if (!checkStatus(gameBoard.gameArray) && !isHumanTurn) {
            while (!checkStatus(gameBoard.gameArray) && !positionFound) {
                const x = rnd(3);
                const y = rnd(3);
                if (gameBoard.gameArray[x][y] === null) {
                    CPU.makeMove(x, y);
                    positionFound = true;
                }
            }
            isHumanTurn = !isHumanTurn;
            positionFound = !positionFound;
        }
        if (checkStatus(gameBoard.gameArray)) {
            console.log(`game over!`);
        }
    }
};

function checkStatus(gameArray) {
    if (gameArray[0][0] === gameArray[0][1] && gameArray[0][0] === gameArray[0][2] && gameArray[0][0] !== null) {
        return true;
    } else if (gameArray[1][0] === gameArray[1][1] && gameArray[1][0] === gameArray[1][2] && gameArray[1][0] !== null) {
        return true;
    } else if (gameArray[2][0] === gameArray[2][1] && gameArray[2][0] === gameArray[2][2] && gameArray[2][0] !== null) {
        return true;
    } else if (gameArray[0][0] === gameArray[1][0] && gameArray[0][0] === gameArray[2][0] && gameArray[0][0] !== null) {
        return true;
    } else if (gameArray[0][1] === gameArray[1][1] && gameArray[0][1] === gameArray[2][1] && gameArray[0][1] !== null) {
        return true;
    } else if (gameArray[0][2] === gameArray[1][2] && gameArray[0][2] === gameArray[2][2] && gameArray[0][2] !== null) {
        return true;
    } else if (gameArray[0][0] === gameArray[1][1] && gameArray[0][0] === gameArray[2][2] && gameArray[0][0] !== null) {
        return true;
    } else if (gameArray[2][0] === gameArray[1][1] && gameArray[2][0] === gameArray[0][2] && gameArray[2][0] !== null) {
        return true;
    } else if (gameArray[0][0] !== null && gameArray[0][1] !== null && gameArray[0][2] !== null && gameArray[1][0] !== null && gameArray[1][1] !== null && gameArray[1][2] !== null && gameArray[2][0] !== null && gameArray[2][1] !== null && gameArray[2][2] !== null) {
        return true;
    } else {
        return false;
    }
}

function rnd(val) {
    return Math.floor(Math.random() * val);
}

playGame();