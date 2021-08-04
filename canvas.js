window.addEventListener('load', window_loaded); 

function window_loaded() {

    const theCanvas = document.getElementById('theCanvas');

    console.log(theCanvas);

    const ctx = theCanvas.getContext('2d');
    
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(20, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(300, 150);
    ctx.lineTo(300, 250);
    ctx.stroke();


    for(let i=0; i<10; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 10, 0);
        ctx.lineTo(i * 10, 150);
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(500, 500);
    ctx.lineTo(500, 580);
    ctx.lineTo(580, 580);
    ctx.lineTo(580, 500);
    ctx.lineTo(500, 500);
    ctx.stroke();

    for(let j = 1; j < 8; j++){
        ctx.beginPath();
        ctx.moveTo(500, 500 + j * 10);
        ctx.lineTo(580, 500 + j * 10);
        ctx.moveTo(500  + j * 10, 500);
        ctx.lineTo(500 + j * 10, 580);
        ctx.stroke();
    }
}