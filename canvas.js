window.addEventListener('load', window_loaded); 

let ctx = null;

function window_loaded() {

    const theCanvas = document.getElementById('theCanvas');

    theCanvas.addEventListener('mousemove', canvasMouseMove);
    theCanvas.addEventListener('mousedown', canvasMouseDown);

    console.log(theCanvas);

    ctx = theCanvas.getContext('2d');
    
    const boxSize = 80;
    const boardTop = 100;
    const boardSize = 8;
    const boardBottom = boardTop + boxSize * boardSize;
    

    const checkedColor = 'rgb(200, 100, 50)';
    
       
    for(let i1 = 0; i1 < boardSize; i1++){
        for(let i2 = 0; i2 < boardSize; i2++){
            if(i1 % 2 == 0 && i2 % 2 == 0){
                ctx.fillStyle = checkedColor;
                ctx.fillRect(i2 * boxSize + boardTop, i1 * boxSize + boardTop, boxSize, boxSize);
            }
            else if(i2 % 2 != 0 && i1 % 2 != 0){
                ctx.fillStyle = checkedColor;
                ctx.fillRect(i2 * boxSize + boardTop, i1 * boxSize +boardTop, boxSize, boxSize);
            }
        }
    }

    for(let j = 0; j < boardSize + 1; j++){
        ctx.beginPath();
        ctx.moveTo(boardTop, boardTop + j * boxSize);
        ctx.lineTo(boardBottom, boardTop + j * boxSize);
        ctx.moveTo(boardTop  + j * boxSize, boardTop);
        ctx.lineTo(boardTop + j * boxSize, boardBottom);
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(100 + 40, 100 + 40, boxSize / 2, 0, 2 * Math.PI);
    ctx.stroke();
 
}


function canvasMouseMove(e){
    console.log('mouse move' + e);
}

function canvasMouseDown(e){
    console.log('mouse down' + e)
}
