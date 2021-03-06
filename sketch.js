let snake;
resolution = 20;
let food;
let w;
let h;


// 800, 500; w = 800, h = 500
function setup() {
    if (screen.width < 840) {
        height = screen.height/1.5
        width = screen.width/1.5
    } else {
        height = screen.height /1.75
        width = screen.width /1.75
    }

    createCanvas(width, height);
    w = floor(width / resolution);
    h = floor(height / resolution);
    frameRate(9)
    snake = new Snake();
    foodlocation();
}

function foodlocation() {
    let x = floor(random(w));
    let y = floor(random(h));
    food = createVector(x, y);
}

function draw() {
    background(6, 44, 87);
    scale(resolution);

    if (snake.eat(food)) {
        foodlocation();
    }

    snake.update();
    snake.show();

    if (snake.endGame()) {
        background(218, 66, 120);
        noLoop();
    }

    noStroke()
    fill(114, 208, 219);
    rect(food.x, food.y, 1, 1);
}


function keyPressed() {
    switch (keyCode) {
        case UP_ARROW:
            snake.setDir(0, -1);
            break
        case DOWN_ARROW:
            snake.setDir(0, 1);
            break
        case RIGHT_ARROW:
            snake.setDir(1, 0);
            break
        case LEFT_ARROW:
            snake.setDir(-1, 0);
            break
    }
}

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            /* left swipe */
            snake.setDir(-1, 0);
        } else {
            /* right swipe */
            snake.setDir(1, 0);
        }
    } else {
        if (yDiff > 0) {
            /* up swipe */
            snake.setDir(0, -1);
        } else {
            /* down swipe */
            snake.setDir(0, 1);
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

