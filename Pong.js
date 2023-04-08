//initializing variables
var canvas = document.getElementById("pongCanvas");
var context = canvas.getContext("2d");
var player1Score = 0;
var player2Score = 0;
var leftArrowPressed = false;
var rightArrowPressed = false;
var paddleSpeed = 10;
var ballSpeed = 15

// add event listeners to update ballSpeed and paddleSpeed variables
var ballSpeedInput = document.getElementById("ball-speed");
var paddleSpeedInput = document.getElementById("paddle-speed");

ballSpeedInput.addEventListener("change", function() {
  ballSpeed = parseInt(ballSpeedInput.value);
});

paddleSpeedInput.addEventListener("change", function() {
  paddleSpeed = parseInt(paddleSpeedInput.value);
});


var leftPaddle = {
    x: 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100
};
var rightPaddle = {
    x: canvas.width - 20,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100
};
var ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    velocityX: ballSpeed, // Initial velocity along X-axis
    velocityY: ballSpeed, // Initial velocity along Y-axis
};


//drawing paddles and ball on the canvas
function draw(){

    //clearing the previous ball and paddles on the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    //drawing left paddle
    context.fillStyle = "#ff0";
    context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);

    //drawing right paddle
    context.fillStyle = "#f0f";
    context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

    //drawing ball
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = "#00f";
    context.fill();

    //updating the score counter
    context.font = "30px Arial";
    context.fillStyle = "#f00";
    context.fillText("Player1: " + player1Score, canvas.width * 0.25, 50);
    context.fillText("Player2: " + player2Score, canvas.width * 0.75, 50);
}

//auto-moving paddles and ball
function move(){

    //moving left paddle, using arrow keys
    if (leftArrowPressed && leftPaddle.y > 0) {  
        leftPaddle.y -= paddleSpeed;
    } else if (rightArrowPressed && leftPaddle.y < canvas.height - 
     leftPaddle.height) {
        leftPaddle.y += paddleSpeed;
    }

    //moving right paddle automatically
        if (ball.y > rightPaddle.y + rightPaddle.height / 2) {
            rightPaddle.y += paddleSpeed;
        } else if (ball.y < rightPaddle.y + rightPaddle.height / 2) {
            rightPaddle.y -= paddleSpeed;
        }

    //moving ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
}

// resets ball's position and velocity after a goal is scored
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
    ball.velocityY = 5;
}

//controlling left paddle using keyboard arrow keys
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(event) {
    if (event.keyCode == 38) {
        leftArrowPressed = true;
    } else if (event.keyCode == 40) {
        rightArrowPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.keyCode == 38) {
        leftArrowPressed = false;
    } else if (event.keyCode == 40) {
        rightArrowPressed = false;
    }
}

//controlling left paddle using touch event
canvas.addEventListener("touchmove", touchMoveHandler, false);

function touchMoveHandler(event) {
    var touchYPos = event.touches[0].clientY - canvas.offsetTop;
    if (touchYPos > leftPaddle.y + leftPaddle.height / 2) {
        leftPaddle.y += paddleSpeed;
    } else if (touchYPos < leftPaddle.y + leftPaddle.height / 2) {
        leftPaddle.y -= paddleSpeed;
    }
}

// moving paddles and ball
function move() {

    // moving left paddle using arrow keys
    if (leftArrowPressed && leftPaddle.y > 0) {
        leftPaddle.y -= paddleSpeed;
    } else if (rightArrowPressed && leftPaddle.y < canvas.height - leftPaddle.height) {
        leftPaddle.y += paddleSpeed;
    }

    // moving right paddle automatically based on the position of the ball
    if (ball.y > rightPaddle.y + rightPaddle.height / 2) {
        rightPaddle.y += paddleSpeed;
    } else if (ball.y < rightPaddle.y + rightPaddle.height / 2) {
        rightPaddle.y -= paddleSpeed;
    }

    // moving ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
}

//collision detection, and updating scores
function collisionDetection(){
    
    //detecting collision with left paddle
    if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width 
    && ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) {
        ball.velocityX = -ball.velocityX;
        ball.velocityY += (leftPaddle.y + leftPaddle.height/2 - ball.y) * 0.02; 
    }

    //detecting collision with right paddle
    if (ball.x + ball.radius > rightPaddle.x && ball.y > rightPaddle.y 
    && ball.y < rightPaddle.y + rightPaddle.height) {
        ball.velocityX = -ball.velocityX;
        ball.velocityY += (rightPaddle.y + rightPaddle.height/2 - ball.y) * 0.02;
    }

    //detecting screen edge collision and updating scores
    if (ball.x - ball.radius < 0) {
        player2Score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        player1Score++;
        resetBall();
    }

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.velocityY = -ball.velocityY;
    }
}

// reset game function to allow users to start again
function resetGame() {

    // reset player scores
    player1Score = 0;
    player2Score = 0;

    // reset paddle and ball positions
    leftPaddle.x = 10;
    leftPaddle.y = canvas.height / 2 - 50;
    rightPaddle.x = canvas.width - 20;
    rightPaddle.y = canvas.height / 2 - 50;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    // choose a random direction for the ball's initial velocity
    var randomDirection = Math.round(Math.random()) * 2 - 1;
    ball.velocityX = 5 * randomDirection;
    ball.velocityY = 5;
}


//game loop function
function gameLoop(){

    //moving the paddles and ball
    move();

    //drawing the paddles, ball, and updating the score counter
    draw();

    //checking for collisions and updating scores
    collisionDetection();

    //requesting to run the function again
    requestAnimationFrame(gameLoop);
}

//starting the game loop
gameLoop();