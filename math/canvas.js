window.addEventListener('load', window_loaded); 
window.addEventListener('mousemove', mouse_moved); 

let ctx = null;

function window_loaded() {

    const theCanvas = document.getElementById('theCanvas');

    ctx = theCanvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(200, 200, 50, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    // ctx.stroke();

    const x = 100;
    const y = 20;

    
    ctx.beginPath();
    ctx.moveTo(400,400);
    ctx.lineTo(400 + x, 400 + y);
    ctx.stroke();


}

function mouse_moved(e) {
    // console.log(e.clientX, e.clientY);
    const x = e.clientX;
    const y = e.clientY;

    const isInsideCircle = (x - 200) * (x - 200) + (y - 200) * (y - 200) < 50 * 50;

    console.log(isInsideCircle);
}
