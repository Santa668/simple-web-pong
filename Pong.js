alert("pong.js called");

// Set up the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set up the ball
var ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 5,
  dx: 5,
  dy: -5
};

// Set up the paddles
var paddleHeight = 100;
var paddleWidth = 10;
var leftPaddle = {
  x: 0,
  y: canvas.height / 2 - paddleHeight / 2,
  speed: 5,
  dy: 0
};
var rightPaddle = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  speed: 5,
  dy: 0
};

// Draw the ball
function drawBall() {
  alert("drawBall");
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

// Draw the paddles
function drawPaddles() {
  alert("drawPaddles");
  ctx.fillStyle = "white";
  ctx.fillRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight);
  ctx.fillRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight);
}

// Move the paddles
function movePaddles() {
  alert("movePaddles");
  leftPaddle.y += leftPaddle.dy;
  rightPaddle.y += rightPaddle.dy;

  if (leftPaddle.y < 0) {
    leftPaddle.y = 0;
  } else if (leftPaddle.y + paddleHeight > canvas.height) {
    leftPaddle.y = canvas.height - paddleHeight;
  }

  if (rightPaddle.y < 0) {
    rightPaddle.y = 0;
  } else if (rightPaddle.y + paddleHeight > canvas.height) {
    rightPaddle.y = canvas.height - paddleHeight;
  }
}

// Detect collisions with the paddles
function detectCollisions() {
  if (
    ball.x - ball.radius < leftPaddle.x + paddleWidth &&
    ball.y + ball.radius > leftPaddle.y &&
    ball.y - ball.radius < leftPaddle.y + paddleHeight
  ) {
    ball.dx = -ball.dx;
  } else if (
    ball.x + ball.radius > rightPaddle.x &&
    ball.y + ball.radius > rightPaddle.y &&
    ball.y - ball.radius < rightPaddle.y + paddleHeight
  ) {
    ball.dx = -ball.dx;
  }
}

// Update the ball position
function updateBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

// Set up touch events
canvas.addEventListener("touchstart", handleTouchStart, false);
canvas.addEventListener("touchmove", handleTouchMove, false);

// Handle touch start event
function handleTouchStart(evt) {
  if (evt.touches.length == 1) {
    var touch = evt.touches[0];
    if (touch.pageX < canvas.width / 2) {
      leftPaddle.dy = -leftPaddle.speed;
    } else {
      rightPaddle.dy = -rightPaddle.speed;
    }
  }
}

// Handle touch move event
function handleTouchMove(evt) {
  if (evt.touches.length == 1) {
    var touch = evt.touches[0];
    if (touch.pageX < canvas.width / 2) {
      leftPaddle.dy = touch.pageY - (leftPaddle.y + paddleHeight / 2);
    } else {
      rightPaddle.dy = touch.pageY - (rightPaddle.y + paddleHeight / 2);
    }
  }
}

// Reset paddle direction on touch end event
canvas.addEventListener("touchend", function(evt) {
  leftPaddle.dy = 0;
  rightPaddle.dy = 0;
}, false);


function startGame() {
  alert("startGame called");
  // Set initial positions of ball and paddles
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  leftPaddle.y = canvas.height / 2 - paddleHeight / 2;
  rightPaddle.y = canvas.height / 2 - paddleHeight / 2;

  // Start animation loop
  function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ball and paddles
    drawBall();
    drawPaddles();

    // Move paddles
    movePaddles();

    // Detect collisions
    detectCollisions();

    // Update ball position
    updateBall();

    // Request next animation frame
    requestAnimationFrame(animate);
    
  }

  // Start animation loop
  animate();
  alert("end startGame");
}
