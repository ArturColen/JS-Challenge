// Initial data
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;
let board = document.querySelector('#board');
let context = board.getContext('2d');

// Click the color change buttons
document.querySelectorAll('#color-area .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});
// Mouse Moves
board.addEventListener('mousedown', mouseDownEvent);
board.addEventListener('mousemove', mouseMoveEvent);
board.addEventListener('mouseup', mouseUpEvent);
// Click the button to clear the board
document.querySelector('#clear').addEventListener('click', clearBoard);

// Select the color to be used
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

// Enable drawing mode when pressing the mouse button
function mouseDownEvent(e) {
    canDraw = true;
    mouseX = e.pageX - board.offsetLeft;
    mouseY = e.pageY - board.offsetTop;
}

// Use the drawing mode if the mouse button is pressed
function mouseMoveEvent(e) {
    if (canDraw) {
        draw(e.pageX, e.pageY);
    }
}

// Disable drawing mode when releasing the mouse button
function mouseUpEvent() {
    canDraw = false;
}

// Create the drawing mode on the board
function draw(x, y) {
    let = pointX = x - board.offsetLeft;
    let pointY = y - board.offsetTop;

    context.beginPath();
    context.lineWidth = 5;
    context.lineJoin = 'round';
    context.moveTo(mouseX, mouseY);
    context.lineTo(pointX, pointY);
    context.closePath();
    context.strokeStyle = currentColor;
    context.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

// Clear the board
function clearBoard() {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}
