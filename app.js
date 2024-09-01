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

function Player(type, moves, gameArray) {
    this.type = type;
    this.moves = moves;
    this.makeMove = function (x, y) {
        if (gameArray[x][y] === null) { moves.push({ x: x, y: y }); return true; }
        else {
            render.gameContainer.classList.add(`apply-shake`);
            return false;
        }
    }
}

const playGame = (function () {
    const body = document.querySelector('body');
    const human = new Player('human', [], gameBoard.gameArray);
    const CPU = new Player('CPU', [], gameBoard.gameArray);
    let name = prompt('Please enter your name!');
    if (name === null || name === '' || name === undefined) {
        name = `Player1`;
    }
    let isHumanTurn = true;
    let positionHuman = false;
    let gameOver = false;
    for (item of render.board) {
        item.addEventListener('click', (event) => {
            const move = event.currentTarget.getAttribute('class');
            while (!checkStatus(gameBoard.gameArray) && isHumanTurn) {
                positionHuman = human.makeMove(move[0], move[1]);
                if (positionHuman) {
                    const x = document.createElement('span');
                    x.classList.add('marker');
                    x.display = `flex`;
                    x.textContent = 'X';
                    x.style.fontSize = `150px`;
                    x.style.fontWeight = `bold`;
                    x.style.textAlign = `center`;
                    event.currentTarget.appendChild(x);
                    isHumanTurn = !isHumanTurn;
                    gameBoard.drawBoard(human);
                    render.gameContainer.classList.remove(`apply-shake`);
                }
                else {
                    break;
                }
            }
            while (!checkStatus(gameBoard.gameArray) && !isHumanTurn) {
                const x = rnd(3);
                const y = rnd(3);
                if (gameBoard.gameArray[x][y] === null) {
                    const o = document.createElement('span');
                    o.classList.add('marker');
                    o.textContent = 'O';
                    o.style.fontSize = `150px`;
                    o.style.fontWeight = `bold`;
                    o.style.textAlign = `center`;
                    CPU.makeMove(x, y);
                    const pos = document.querySelector(`.\\3${x} ${y}`);
                    pos.appendChild(o);
                    isHumanTurn = !isHumanTurn;
                    gameBoard.drawBoard(CPU);
                }
            }
            if ({ a, b, c } = checkStatus(gameBoard.gameArray)) {
                if (a === `draw`) {
                    for (item of render.board) {
                        item.style.backgroundColor = 'steelblue';
                        item.style.opacity = .75;
                    }
                    const message = document.querySelector('.message');
                    message.textContent = 'the game ends in a draw!'
                    message.style.fontSize = `3rem`;
                    message.style.visibility = `visible`;
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
                    const message = document.querySelector('.message');
                    message.style.fontSize = `3rem`;
                    message.style.visibility = `visible`;
                    message.textContent = `${name} wins the game!`;
                    gameOver = true;
                }
                else {
                    const first = document.querySelector(`.\\3${a[0]} ${a[1]}`);
                    first.style.backgroundColor = 'steelblue';
                    first.style.opacity = .5;
                    const second = document.querySelector(`.\\3${b[0]} ${b[1]}`);
                    second.style.backgroundColor = 'steelblue';
                    second.style.opacity = .5;
                    const third = document.querySelector(`.\\3${c[0]} ${c[1]}`);
                    third.style.backgroundColor = 'steelblue';
                    third.style.opacity = .5;
                    const message = document.querySelector('.message');
                    message.style.fontSize = `3rem`;
                    message.style.visibility = `visible`;
                    message.textContent = `the computer wins the game!`;
                    gameOver = true;
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
    const reset = document.createElement('button');
    reset.style.marginTop = `50px`;
    reset.textContent = `Reset`;
    reset.style.fontSize = `50px`;
    reset.classList.add('btn');
    reset.addEventListener('click', () => {
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
        human.moves.splice(0, human.moves.length);
        CPU.moves.splice(0, CPU.moves.length);
        isHumanTurn = true;
        name = prompt('Please enter your name!');
        if (name === null || name === '' || name === undefined) {
            name = `Player1`;
        }
        gameOver = false;
    })
    body.appendChild(reset);
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