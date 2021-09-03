const BOX_SIZE = 80;
const BOARD_TOP = 50;
const BOARD_SIZE = 8;
const BOARD_BOTTOM = BOARD_TOP + BOX_SIZE * BOARD_SIZE;

const checkedColor = 'rgb(200, 100, 50)';
const PIECE_RADIUS = BOX_SIZE * 3 / 8;

const colors = ["", "black", "red"];
const highlight_colors = ["", "brown", "orange"];
const hoverColor = "rgba(100, 255, 255, 0.2)";
const moveColor = "rgba(100, 0, 255, 0.2)";

const gameState = {
    board: [
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0]
    ],
    hovered: { x: -1, y: -1 },
    turn: 1,
    currentTurn: null,
    possibleMove: null
};

window.addEventListener('load', window_loaded);

let ctx = null;

function window_loaded() {

    const theCanvas = document.getElementById('theCanvas');

    theCanvas.addEventListener('mousemove', canvasMouseMove);
    theCanvas.addEventListener('mousedown', canvasMouseDown);

    console.log(theCanvas);

    ctx = theCanvas.getContext('2d');

    drawBoard();


}


function drawPiece(i, j, color) {
    ctx.beginPath();
    ctx.arc(i * BOX_SIZE + BOARD_TOP + (BOX_SIZE / 2), j * BOX_SIZE + BOARD_TOP + (BOX_SIZE / 2), PIECE_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

function drawBoard() {

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 700, 700);

    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (i % 2 == 0 && j % 2 == 0) {
                drawBoardSlot(j, i, checkedColor);
            }
            else if (j % 2 != 0 && i % 2 != 0) {
                drawBoardSlot(j, i, checkedColor);
            }
        }
    }

    for (let i = 0; i < BOARD_SIZE + 1; i++) {
        ctx.beginPath();
        ctx.moveTo(BOARD_TOP, BOARD_TOP + i * BOX_SIZE);
        ctx.lineTo(BOARD_BOTTOM, BOARD_TOP + i * BOX_SIZE);
        ctx.moveTo(BOARD_TOP + i * BOX_SIZE, BOARD_TOP);
        ctx.lineTo(BOARD_TOP + i * BOX_SIZE, BOARD_BOTTOM);
        ctx.stroke();
    }

    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const place = gameState.board[j][i];
            if (place !== 0) {
                if (gameState.currentTurn && gameState.currentTurn.x === i && gameState.currentTurn.y === j) {
                    drawPiece(i, j, highlight_colors[place]);
                } else {
                    drawPiece(i, j, colors[place]);
                }
            }
        }
    }

    if (gameState.hovered.x !== -1) {
        drawPiece(gameState.hovered.x, gameState.hovered.y, hoverColor);
    }

    if (gameState.possibleMove) {
        drawBoardSlot(gameState.possibleMove.x, gameState.possibleMove.y, moveColor);
    }


    ctx.font = '14px Tahoma';
    ctx.fillStyle = 'black';
    ctx.fillText(`Turn of ${colors[gameState.turn]}`, 50, 30);

    // console.log(gameState);
}

function drawBoardSlot(i, j, color) {
    ctx.fillStyle = color;
    ctx.fillRect(i * BOX_SIZE + BOARD_TOP, j * BOX_SIZE + BOARD_TOP, BOX_SIZE, BOX_SIZE);
}

function canvasMouseMove(e) {

    const [x, y] = getPositionInBoard(e);

    if (checkOutOfBoard(x, y)) {
        gameState.possibleMove = null;
        return;
    }
    const check = gameState.board[y][x];

    if (check) {
        gameState.hovered = { x, y };
    } else {
        gameState.hovered = { x: -1, y: -1 };
    }

    const isSlotFreeForPlay = slotFreeForPlay(x, y);

    if (isSlotFreeForPlay) {
        gameState.possibleMove = { x, y }
    } else {
        gameState.possibleMove = null;
    }

    drawBoard();


}

function slotFreeForPlay(nx, ny) {
    if (!gameState.currentTurn) {
        return false;
    }
    const { x, y } = gameState.currentTurn;


    const moves = getAvailableMovesFromPosition(x,y);

    // for(let i = 0; i < moves.length; i++) {
    //     if (moves[i].x === nx && moves[i].y === ny) {
    //         return true;
    //     }
    // }

    const isAnyMoveAvailable = moves.some(m => m.x === nx && m.y === ny);

    return isAnyMoveAvailable;
}

function getPositionInBoard(e) {
    const x = Math.floor((e.offsetX - BOARD_TOP) / (BOX_SIZE));
    const y = Math.floor((e.offsetY - BOARD_TOP) / (BOX_SIZE));

    return [x, y];
}

function canvasMouseDown(e) {

    const [x, y] = getPositionInBoard(e);

    if (checkOutOfBoard(x, y)) {
        return;
    }


    if (gameState.possibleMove) {
        let { x, y } = gameState.currentTurn;
        const { turn } = gameState;
        const yDelta1 = turn === 1 ? 1 : -1;
        const yDelta2 = turn === 1 ? 2 : -2;
        const atkPos1 = { x: x - 2, y: y + yDelta2 }
        const atkPos2 = { x: x + 2, y: y + yDelta2 }

        gameState.board[y][x] = 0;
        if(gameState.possibleMove.x === atkPos1.x && gameState.possibleMove.y === atkPos1.y){
            gameState.board[y + yDelta1][x - 1] = 0;        
        }
        if(gameState.possibleMove.x === atkPos2.x && gameState.possibleMove.y === atkPos2.y){
            gameState.board[y + yDelta1][x + 1] = 0;        
        }
        ({ x, y } = gameState.possibleMove);
        gameState.board[y][x] = gameState.turn;
        

        gameState.currentTurn = null;
        gameState.possibleMove = null;
        gameState.turn = 3 - gameState.turn;

        drawBoard();
        return;
    }



    const pieceCanMove = canPieceMove(x, y);

    if (pieceCanMove) {
        if (!gameState.currentTurn) {
            gameState.currentTurn = {
                x: x,
                y: y  
            }
        } else {
            if (gameState.currentTurn.x === x && gameState.currentTurn.y === y) {
                gameState.currentTurn = null;
            }
        }
    }

    drawBoard();
}

function canPieceMove(x, y) {

    const playerAtPosition = gameState.board[y][x];

    const rightTurn = playerAtPosition === gameState.turn;

    if (!rightTurn) {
        return false;
    }

    const moves = getAvailableMovesFromPosition(x,y);

    return moves.length > 0;
}

function isPositionAvailableForPlayer(pos) {
    if (checkOutOfBoard(pos.x, pos.y)) {
        return false;
    }

    return (gameState.board[pos.y][pos.x] === 0);
}

function checkOutOfBoard(x, y) {
    return (y < 0 || y > 7 || x < 0 || x > 7);
}

function getAvailableMovesFromPosition(x,y) {
    const { turn } = gameState;

    const yDelta1 = turn === 1 ? 1 : -1;
    const yDelta2 = turn === 1 ? 2 : -2;

    const pos1 = { x: x - 1, y: y + yDelta1 }
    const pos2 = { x: x + 1, y: y + yDelta1 }
    const pos3 = { x: x - 2, y: y + yDelta2 }
    const pos4 = { x: x + 2, y: y + yDelta2 }

    const firstPositionAvailable = isPositionAvailableForPlayer(pos1);
    const secondPositionAvailable = isPositionAvailableForPlayer(pos2);
    const thirdPositionAvailable = isPositionAvailableForPlayer(pos3);
    const fourthPositionAvailable = isPositionAvailableForPlayer(pos4);


    const moves = [];
    if (firstPositionAvailable) moves.push(pos1);
    if (secondPositionAvailable) moves.push(pos2);
    if (thirdPositionAvailable && !firstPositionAvailable && gameState.board[pos1.y][pos1.x] != gameState.turn) moves.push(pos3);
    if (fourthPositionAvailable && !secondPositionAvailable && gameState.board[pos2.y][pos2.x] != gameState.turn) moves.push(pos4);

    return moves;

}