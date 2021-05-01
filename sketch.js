let snake;
resolution = 20;
let food;
let w;
let h;

function setup() {
    createCanvas(windowWidth,windowHeight);
    w = floor(windowWidth/resolution);
    h = floor(windowHeight/resolution)
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
        background (218, 66, 120);
        noLoop();
    }

    noStroke()
    fill(114, 208, 219);
    rect(food.x, food.y, 1, 1);
}



function keyPressed() {
    if (keyCode === UP_ARROW) {
        snake.setDir(0,-1);
    }
    else if (keyCode === DOWN_ARROW) {
        snake.setDir(0,1);
    }
    else if (keyCode === RIGHT_ARROW) {
        snake.setDir(1,0);
    }
    else if (keyCode === LEFT_ARROW) {
        snake.setDir(-1,0);
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
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
            snake.setDir(-1,0);
        } else {
            /* right swipe */
            snake.setDir(1,0);
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
            snake.setDir(0,-1);
        } else { 
            /* down swipe */
            snake.setDir(0,1);
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

