window.addEventListener('load', window_loaded); 

function window_loaded() {

    const theCanvas = document.getElementById('theCanvas');

    console.log(theCanvas);

    const ctx = theCanvas.getContext('2d');
    
    for(let j = 0; j < 9; j++){
        ctx.beginPath();
        ctx.moveTo(100.5, 100.5 + j * 100);
        ctx.lineTo(900.5, 100.5 + j * 100);
        ctx.moveTo(100.5  + j * 100, 100.5);
        ctx.lineTo(100.5 + j * 100, 900.5);
        ctx.stroke();
    }
    
    for(let i1 = 1; i1 < 9; i1++){
        for(let i2 = 1; i2 < 9; i2++){
            if(i1 % 2 == 0){
                ctx.fillStyle = 'rgb(255, 255, 0)';
                ctx.fillRect(i2 * 200 + 0.5, i1 * 100 + 0.5, 100, 100);
            }
            else if(i2 % 2 != 0){
                ctx.fillStyle = 'rgb(255, 255, 0)';
                ctx.fillRect(i2 * 100 + 0.5, i1 * 100 + 0.5, 100, 100);
            }
        }
    }
}