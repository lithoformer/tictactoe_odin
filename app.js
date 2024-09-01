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

    const board = document.querySelectorAll('.boardSpace');

    for (item of board) {
        item.style.display = `flex`;
        item.style.border = `5px solid slateblue`;
        item.style.height = `190px`;
        item.style.width = `190px`;
        item.style.alignItems = `center`;
        item.style.justifyContent = `center`;
    }
    return { board }
})();

function Player(type, moves, gameArray) {
    this.type = type;
    this.moves = moves;
    this.makeMove = function (x, y) {
        if (gameArray[x][y] === null) { moves.push({ x: x, y: y }); return true; }
        else {
            console.log(`board position occupied!`)
            return false;
        }
    }
}

const playGame = (function () {
    const human = new Player('human', [], gameBoard.gameArray);
    const CPU = new Player('CPU', [], gameBoard.gameArray);
    let isHumanTurn = true;
    let positionCPU = false;
    let positionHuman = false;
    for (item of render.board) {
        item.addEventListener('click', (event) => {
            const move = event.target.getAttribute('class');
            while (!checkStatus(gameBoard.gameArray) && isHumanTurn) {
                positionHuman = human.makeMove(move[0], move[1]);
                if (positionHuman) {
                    const x = document.createElement('span');
                    x.display = `flex`;
                    x.textContent = 'X';
                    x.style.fontSize = `150px`;
                    x.style.fontWeight = `bold`;
                    x.style.textAlign = `center`;
                    event.target.appendChild(x);
                    isHumanTurn = !isHumanTurn;
                    gameBoard.drawBoard(human);
                } else {
                    break;
                }
            }
            while (!checkStatus(gameBoard.gameArray) && !isHumanTurn) {
                const x = rnd(3);
                const y = rnd(3);
                if (gameBoard.gameArray[x][y] === null) {
                    const o = document.createElement('span');
                    o.textContent = 'O';
                    o.style.fontSize = `150px`;
                    o.style.fontWeight = `bold`;
                    o.style.textAlign = `center`;
                    positionCPU = CPU.makeMove(x, y);
                    const pos = document.querySelector(`.\\3${x} ${y}`);
                    pos.appendChild(o);
                    isHumanTurn = !isHumanTurn;
                    gameBoard.drawBoard(CPU);
                }
            }
        })
    }
})();

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