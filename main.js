const canvas = document.querySelector('.ball-1')
const canvas2 = document.querySelector('.ball-2')
const ctx = canvas.getContext('2d')
const ctx2 = canvas2.getContext('2d')
const btn1 = document.getElementById('ball-1');
const btn2 = document.getElementById('ball-2');

let yBall = 30;
let yGround = canvas.height - 10
let dY = 2;

const BALL_RADIUS = 25;

let COEF = 0.3;
let yBall2 = 30;
let yGround2 = canvas2.height - 10;
let dY2 = 2;
let height = BALL_RADIUS
let count = 0;

function render() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  yBall = yBall + dY;

  if (yBall + BALL_RADIUS >= yGround || yBall <= BALL_RADIUS) {
    dY = -1 * dY
  }

  ctx.fillStyle = 'red'
  ctx.beginPath();
  ctx.ellipse(canvas.clientWidth / 2, yBall, BALL_RADIUS, BALL_RADIUS, 0, 0, Math.PI * BALL_RADIUS)
  ctx.fill()

  ctx.fillStyle = 'brown'
  ctx.fillRect(0, canvas.clientHeight - 10, canvas.clientWidth, 10)

  window.requestAnimationFrame(render)
}

function render2() {
  if (count < 6) {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    yBall2 = yBall2 + COEF * dY2 * dY2;
  } else {
    yBall2 = canvas2.height - BALL_RADIUS + canvas2.height - 10
  }

  if (yBall2 >= yGround2 - BALL_RADIUS && COEF > 0) {
    COEF = -1 * COEF
    count++;
  }

  if (COEF < 0 && yBall2 - BALL_RADIUS < height) {
    COEF = -1 * COEF;
    height = height + height * COEF * dY2
  }

  ctx2.fillStyle = 'red'
  ctx2.beginPath();
  ctx2.ellipse(canvas2.clientWidth / 2, yBall2, BALL_RADIUS, BALL_RADIUS, 0, 0, Math.PI * BALL_RADIUS)
  ctx2.fill()

  ctx2.fillStyle = 'brown'
  ctx2.fillRect(0, canvas2.clientHeight - 10, canvas2.clientWidth, 10)

  window.requestAnimationFrame(render2)
}

btn1.addEventListener('click', () => {
  render();
  btn1.disabled = true;
})

btn2.addEventListener('click', () => {
  render2();
  btn2.disabled = true;
})