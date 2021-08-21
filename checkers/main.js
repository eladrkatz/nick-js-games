
const BOX_SIZE = 80;
const BOARD_TOP = 50;
const BOARD_SIZE = 8;
const BOARD_BOTTOM = BOARD_TOP + BOX_SIZE * BOARD_SIZE;

const checkedColor = 'rgb(200, 100, 50)';
const PLAYER_1_COLOR = "black";
const PLAYER_2_COLOR = "red";
const PIECE_RADIUS = BOX_SIZE * 3 / 8;


window.addEventListener('load', window_loaded); 

let ctx = null;

function window_loaded() {

    const theCanvas = document.getElementById('theCanvas');

    theCanvas.addEventListener('mousemove', canvasMouseMove);
    theCanvas.addEventListener('mousedown', canvasMouseDown);

    console.log(theCanvas);

    ctx = theCanvas.getContext('2d');
    
       
    drawBoard();

    const gameState = {
        board: [
            [0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [2,0,2,0,2,0,2,0],
            [0,2,0,2,0,2,0,2],
            [2,0,2,0,2,0,2,0]
        ]
    };
    

    for (let i=0; i < BOARD_SIZE; i++) {
        for (let j=0; j < BOARD_SIZE; j++) {
            const place = gameState.board[j][i];
            if (place === 1) {
                drawPiece(i, j, PLAYER_1_COLOR);
            } 
            if (place === 2) {
                drawPiece(i, j, PLAYER_2_COLOR);
            }
        }
    }

}


function drawPiece(i, j, color) {
    ctx.beginPath();
    ctx.arc(i * BOX_SIZE + BOARD_TOP + (BOX_SIZE / 2), j * BOX_SIZE + BOARD_TOP + (BOX_SIZE / 2), PIECE_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

function drawBoard() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (i % 2 == 0 && j % 2 == 0) {
                ctx.fillStyle = checkedColor;
                ctx.fillRect(j * BOX_SIZE + BOARD_TOP, i * BOX_SIZE + BOARD_TOP, BOX_SIZE, BOX_SIZE);
            }
            else if (j % 2 != 0 && i % 2 != 0) {
                ctx.fillStyle = checkedColor;
                ctx.fillRect(j * BOX_SIZE + BOARD_TOP, i * BOX_SIZE + BOARD_TOP, BOX_SIZE, BOX_SIZE);
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
}

function canvasMouseMove(e){
    console.log('mouse move' + e);
}

function canvasMouseDown(e){
    console.log('mouse down' + e)
}
