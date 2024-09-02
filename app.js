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
            if (player.type === 'player1') {
                gameArray[move.x][move.y] = 1;
            }
            else {
                gameArray[move.x][move.y] = 0;
            }
        }
    }
    return { drawBoard, gameArray }
})();

const render = (function () {
    const gameContainer = document.querySelector('.gameContainer');

    const aa = document.createElement('div');
    aa.classList.add('00');
    aa.classList.add('boardSpace');
    gameContainer.appendChild(aa);
    const ab = document.createElement('div');
    ab.classList.add('01');
    ab.classList.add('boardSpace');
    gameContainer.appendChild(ab);
    const ac = document.createElement('div');
    ac.classList.add('02');
    ac.classList.add('boardSpace');
    gameContainer.appendChild(ac);
    const ba = document.createElement('div');
    ba.classList.add('10');
    ba.classList.add('boardSpace');
    gameContainer.appendChild(ba);
    const bb = document.createElement('div');
    bb.classList.add('11');
    bb.classList.add('boardSpace');
    gameContainer.appendChild(bb);
    const bc = document.createElement('div');
    bc.classList.add('12');
    bc.classList.add('boardSpace');
    gameContainer.appendChild(bc);
    const ca = document.createElement('div');
    ca.classList.add('20');
    ca.classList.add('boardSpace');
    gameContainer.appendChild(ca);
    const cb = document.createElement('div');
    cb.classList.add('21');
    cb.classList.add('boardSpace');
    gameContainer.appendChild(cb);
    const cc = document.createElement('div');
    cc.classList.add('22');
    cc.classList.add('boardSpace');
    gameContainer.appendChild(cc);

    const gameHeader = document.querySelector('.gameHeader')
    gameHeader.textContent = `Tic-Tac-Toe!`;

    const board = document.querySelectorAll('.boardSpace');

    for (item of board) {
        item.style.display = `flex`;
        item.style.border = `5px solid slateblue`;
        item.style.height = `190px`;
        item.style.width = `190px`;
        item.style.alignItems = `center`;
        item.style.justifyContent = `center`;
    }
    return { board, gameContainer }
})();

function Player(name, type, moves, gameArray) {
    this.name = name;
    this.type = type;
    this.moves = moves;
    this.makeMove = function (x, y) {
        if (gameArray[x][y] === null) { moves.push({ x: x, y: y }); return true; }
        else {
            return false;
        }
    }
}

const playGame = (function () {
    const body = document.querySelector('body');
    const player1 = new Player('', 'player1', [], gameBoard.gameArray);
    const player2 = new Player('', 'player2', [], gameBoard.gameArray);
    const message = document.querySelector('.message');
    const nameField = document.querySelectorAll('.nameField');
    let gameOver = true;
    let isPlayerOneTurn = null;
    let position = null;
    let move = null;
    const start = document.createElement('button');
    start.style.marginTop = `50px`;
    start.textContent = `Start!`;
    start.style.fontSize = `50px`;
    start.classList.add('btn');
    start.classList.add('start');
    start.addEventListener('click', () => {
        if (nameField[0].value === null || nameField[0].value === '' || nameField[0].value === undefined) {
            player1.name = 'Player1';
        }
        else {
            player1.name = nameField[0].value;
        }
        if (nameField[1].value === null || nameField[1].value === '' || nameField[1].value === undefined) {
            player2.name = 'Player2';
        }
        else {
            player2.name = nameField[1].value;
        }
        nameField[0].value = '';
        nameField[1].value = '';
        isPlayerOneTurn = true;
        gameOver = !gameOver;
        toggleVisibilityMsg(message);
        toggleText(start);
        restart();
        // message.textContent = `Players enter your names`;
    })
    body.appendChild(start);
    message.style.visibility = `visible`;
    message.style.fontSize = `3rem`;
    message.textContent = `Players enter your names:`;
    nameField[0].style.fontSize = `3rem`;
    nameField[0].style.visibility = `visible`;
    nameField[1].style.fontSize = `3rem`;
    nameField[1].style.visibility = `visible`;
    for (item of render.board) {
        item.addEventListener('mousedown', (event) => {
            if (!gameOver) {
                move = event.currentTarget.getAttribute('class');
                while (!checkStatus(gameBoard.gameArray) && isPlayerOneTurn) {
                    position = player1.makeMove(move[0], move[1]);
                    if (position) {
                        const x = document.createElement('span');
                        x.classList.add('marker');
                        x.display = `flex`;
                        x.textContent = 'X';
                        x.style.fontSize = `150px`;
                        x.style.fontWeight = `bold`;
                        x.style.textAlign = `center`;
                        event.currentTarget.appendChild(x);
                        message.textContent = `${player2.name} turn`
                        isPlayerOneTurn = !isPlayerOneTurn;
                        gameBoard.drawBoard(player1);
                    }
                    else if (!position) {
                        break;
                    }
                }
                while (!checkStatus(gameBoard.gameArray) && !isPlayerOneTurn) {
                    position = player2.makeMove(move[0], move[1]);
                    if (position) {
                        const o = document.createElement('span');
                        o.classList.add('marker');
                        o.display = `flex`;
                        o.textContent = 'O';
                        o.style.fontSize = `150px`;
                        o.style.fontWeight = `bold`;
                        o.style.textAlign = `center`;
                        event.currentTarget.appendChild(o);
                        message.textContent = `${player1.name} turn`
                        isPlayerOneTurn = !isPlayerOneTurn;
                        gameBoard.drawBoard(player2);
                    }
                    else if (!position) {
                        break;
                    }
                }
                if ({ a, b, c } = checkStatus(gameBoard.gameArray)) {
                    if (a === `draw`) {
                        for (item of render.board) {
                            item.style.backgroundColor = 'steelblue';
                            item.style.opacity = .75;
                        }
                        message.textContent = `the game ends in a draw!  Please enter your names:`;
                        message.style.fontSize = `3rem`;
                        toggleVisibilityMsg(playGame.message);
                        toggleVisibilityName(playGame.nameField);
                        gameOver = true;
                    }
                    else if (gameBoard.gameArray[a[0]][a[1]] === 1) {
                        const first = document.querySelector(`.\\3${a[0]} ${a[1]}`);
                        first.style.backgroundColor = 'goldenrod';
                        first.style.opacity = .5;
                        const second = document.querySelector(`.\\3${b[0]} ${b[1]}`);
                        second.style.backgroundColor = 'goldenrod';
                        second.style.opacity = .5;
                        const third = document.querySelector(`.\\3${c[0]} ${c[1]}`);
                        third.style.backgroundColor = 'goldenrod';
                        third.style.opacity = .5;
                        message.style.fontSize = `3rem`;
                        message.textContent = `${player1.name} wins the game!  Please enter your names:`;
                        toggleVisibilityMsg(playGame.message);
                        toggleVisibilityName(playGame.nameField);
                        gameOver = true;
                    }
                    else {
                        const first = document.querySelector(`.\\3${a[0]} ${a[1]}`);
                        first.style.backgroundColor = 'goldenrod';
                        first.style.opacity = .5;
                        const second = document.querySelector(`.\\3${b[0]} ${b[1]}`);
                        second.style.backgroundColor = 'goldenrod';
                        second.style.opacity = .5;
                        const third = document.querySelector(`.\\3${c[0]} ${c[1]}`);
                        third.style.backgroundColor = 'goldenrod';
                        third.style.opacity = .5;
                        message.style.fontSize = `3rem`;
                        message.textContent = `${player2.name} wins the game!  Please enter your names:`;
                        toggleVisibilityMsg(playGame.message);
                        toggleVisibilityName(playGame.nameField);
                        gameOver = true;
                    }
                }
            }
        })

        item.addEventListener('mouseenter', (event) => {
            if (!gameOver) {
                event.currentTarget.style.backgroundColor = 'slategrey';
                event.currentTarget.style.opacity = .5;
            }
        })

        item.addEventListener('mouseleave', (event) => {
            if (!gameOver) {
                event.currentTarget.style.backgroundColor = 'white';
                event.currentTarget.style.opacity = 1;
            }
        })
    }
    return { player1, player2, message, nameField, gameOver }
})();

function checkStatus(gameArray) {
    if (gameArray[0][0] === gameArray[0][1] && gameArray[0][0] === gameArray[0][2] && gameArray[0][0] !== null) {
        return { a: [0, 0], b: [0, 1], c: [0, 2] };
    } else if (gameArray[1][0] === gameArray[1][1] && gameArray[1][0] === gameArray[1][2] && gameArray[1][0] !== null) {
        return { a: [1, 0], b: [1, 1], c: [1, 2] };
    } else if (gameArray[2][0] === gameArray[2][1] && gameArray[2][0] === gameArray[2][2] && gameArray[2][0] !== null) {
        return { a: [2, 0], b: [2, 1], c: [2, 2] };
    } else if (gameArray[0][0] === gameArray[1][0] && gameArray[0][0] === gameArray[2][0] && gameArray[0][0] !== null) {
        return { a: [0, 0], b: [1, 0], c: [2, 0] };
    } else if (gameArray[0][1] === gameArray[1][1] && gameArray[0][1] === gameArray[2][1] && gameArray[0][1] !== null) {
        return { a: [0, 1], b: [1, 1], c: [2, 1] };
    } else if (gameArray[0][2] === gameArray[1][2] && gameArray[0][2] === gameArray[2][2] && gameArray[0][2] !== null) {
        return { a: [0, 2], b: [1, 2], c: [2, 2] };
    } else if (gameArray[0][0] === gameArray[1][1] && gameArray[0][0] === gameArray[2][2] && gameArray[0][0] !== null) {
        return { a: [0, 0], b: [1, 1], c: [2, 2] };
    } else if (gameArray[2][0] === gameArray[1][1] && gameArray[2][0] === gameArray[0][2] && gameArray[2][0] !== null) {
        return { a: [2, 0], b: [1, 1], c: [0, 2] };
    } else if (gameArray[0][0] !== null && gameArray[0][1] !== null && gameArray[0][2] !== null && gameArray[1][0] !== null && gameArray[1][1] !== null && gameArray[1][2] !== null && gameArray[2][0] !== null && gameArray[2][1] !== null && gameArray[2][2] !== null) {
        return { a: `draw`, b: `draw`, c: `draw` };
    } else {
        return false;
    }
}

function rnd(val) {
    return Math.floor(Math.random() * val);
}

function restart() {
    const markers = document.querySelectorAll('.marker');
    for (mark of markers) {
        mark.remove();
    }
    for (let i = 0; i < gameBoard.gameArray.length; i++) {
        for (let j = 0; j < gameBoard.gameArray.length; j++) {
            gameBoard.gameArray[i][j] = null;
        }
    }
    for (item of render.board) {
        item.style.backgroundColor = 'white';
        item.style.opacity = 1;
    }
    playGame.player1.moves.splice(0, playGame.player1.moves.length);
    playGame.player2.moves.splice(0, playGame.player2.moves.length);
    isPlayerOneTurn = true;
    playGame.gameOver = !playGame.gameOver;
    playGame.message.textContent = `Players enter your names:`;
    // toggleVisibilityMsg(playGame.message);
    toggleVisibilityName(playGame.nameField);
}

function toggleVisibilityMsg(message) {
    if (message.style.visibility === `visible`) {
        message.style.visibility = `hidden`;
    } else if (message.style.visibility === `hidden`) {
        message.style.visibility = `visible`;
    }
}
function toggleVisibilityName(nameField) {
    if (nameField[0].style.visibility === `visible`) {
        nameField[0].style.visibility = `hidden`;
    } else if (nameField[0].style.visibility === `hidden`) {
        nameField[0].style.visibility = `visible`;
    }
    if (nameField[1].style.visibility === `visible`) {
        nameField[1].style.visibility = `hidden`;
    } else if (nameField[1].style.visibility === `hidden`) {
        nameField[1].style.visibility = `visible`;
    }
}

function toggleText(start) {
    if (start.textContent === 'Start!') {
        start.textContent = 'Reset';
    } else if (start.textContent === 'Reset') {
        start.textContent = 'Start!';
    }
}