const BOX_SIZE = 80;
const BOARD_TOP = 50;
const BOARD_SIZE = 8;
const BOARD_BOTTOM = BOARD_TOP + BOX_SIZE * BOARD_SIZE;

const checkedColor = 'rgb(200, 100, 50)';
const PIECE_RADIUS = BOX_SIZE * 3 / 8;

const colors = ["" ,"black", "red"];
const hoverColor = "blue";

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
    ],
    hovered: {x : -1, y: -1}
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
    ctx.fillRect(BOARD_TOP, BOARD_TOP, 8  * BOX_SIZE + BOARD_TOP, 8 * BOX_SIZE + BOARD_TOP);

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

    for (let i=0; i < BOARD_SIZE; i++) {
        for (let j=0; j < BOARD_SIZE; j++) {
            const place = gameState.board[j][i];
            if (place !== 0) {
                drawPiece(i, j, colors[place]);
            }
        }
    }

    if (gameState.hovered.x !== -1) {
        drawPiece(gameState.hovered.x, gameState.hovered.y, hoverColor);
    }

}

function canvasMouseMove(e){

    const [x, y] = getPositionInBoard(e);
    if(y > -1 && y < 8 && x > -1 && x < 8){
        const check = gameState.board[y][x];
    
        if (check) { 
            gameState.hovered = {x, y};
        } else {
            gameState.hovered = {x: -1, y: -1};
        }
        
        drawBoard();
    }


}

function getPositionInBoard(e) {
    const x = Math.floor((e.offsetX - BOARD_TOP) / (BOX_SIZE));
    const y = Math.floor((e.offsetY - BOARD_TOP) / (BOX_SIZE));

    return [x, y];
}

function canvasMouseDown(e){
    
    const [x, y] = getPositionInBoard(e);
    
    if(y > -1 && y < 8 && x > -1 && x < 8){
        const check = gameState.board[y][x];

        console.log(colors[check]);
    }
}