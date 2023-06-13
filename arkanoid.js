let arkanoid = document.querySelector('.arkanoid');

const game = {
  ctx: undefined,
  cols: 5,
  rows: 3,
  blocks: [],
  score: 0,

  ball: {
    x: arkanoid.clientWidth / 2,
    y: arkanoid.clientHeight - 80,
    radius: 25,
    width: 50,
    height: 50,
    dx: 0,
    dy: 0,
    velocity: 3,

    push() {
      this.dx = -this.velocity;
      this.dy = -this.velocity;
    },

    move() {
      this.x += this.dx;
      this.y += this.dy;
    },

    collision(block) {
      let x = this.x + this.dx
      let y = this.y + this.dy

      if (x + this.radius > block.x && x < block.x + block.width &&
        y + this.radius > block.y && y < block.y + block.height) {
        return true
      }

      return false
    },

    hitBlock(block) {
      this.dy *= -1;
      block.isAlive = false;
      ++game.score;

      if (game.score >= game.blocks.length) {
        game.over('YOU WIN!')
      }
    },

    checkBorder() {
      let x = this.x + this.dx
      let y = this.y + this.dy

      if (x < 0) {
        this.x = 0;
        this.dx = this.velocity;
      } else if (x + this.radius > arkanoid.clientWidth) {
        this.x = arkanoid.clientWidth - this.radius;
        this.dx = -this.velocity
      } else if (y < 0) {
        this.y = 0;
        this.dy = this.velocity
      } else if (y + this.radius > arkanoid.clientHeight) {
        game.over('GAME OVER');
      }
    },

    hitPlatform(platform) {
      this.dy = -this.velocity
    }
  },

  platform: {
    x: arkanoid.clientWidth / 2 - 100,
    y: arkanoid.clientHeight - 50,
    width: 200,
    height: 30,
    velocity: 6,
    dx: 0,

    move() {
      this.x += this.dx;

      if (this.ball) {
        this.ball.x += this.dx;
      }
    },

    stop() {
      this.dx = 0;
    },

    pushBall() {
      if (this.ball) {
        this.ball.push();
        this.ball = false;
      }
    }
  },

  update() {
    if (this.ball.collision(this.platform)) {
      this.ball.hitPlatform(this.platform);
    }

    if (this.platform.dx) {
      this.platform.move()
    }

    if (this.ball.dx || this.ball.dy) {
      this.ball.move()
    }

    this.blocks.forEach(block => {
      if (block.isAlive) {
        if (this.ball.collision(block)) {
          this.ball.hitBlock(block);
        }
      }
    }, this)

    this.ball.checkBorder();
  },

  create() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.blocks.push({
          x: 110 * col + 20,
          y: 35 * row + 20,
          width: 100,
          height: 30,
          isAlive: true,
        })
      }
    }
  },

  start() {
    this.ctx = arkanoid.getContext('2d');

    window.addEventListener('keydown', e => {
      if (e.keyCode === 37) {
        game.platform.dx = -game.platform.velocity
      } else if (e.keyCode === 39) {
        game.platform.dx = game.platform.velocity
      } else if (e.keyCode === 32) {
        game.platform.pushBall();
      }
    })

    window.addEventListener('keyup', () => {
      game.platform.stop();
    })

    this.create();
    this.run()
  },

  render: function () {
    this.ctx.clearRect(0, 0, arkanoid.width, arkanoid.height)

    //platform
    this.ctx.fillStyle = 'green'
    this.ctx.fillRect(this.platform.x, this.platform.y, this.platform.width, this.platform.height)

    //ball 
    this.ctx.fillStyle = 'red'
    this.ctx.beginPath();
    this.ctx.ellipse(this.ball.x, this.ball.y, this.ball.radius, this.ball.radius, 0, 0, Math.PI * this.ball.radius)
    this.ctx.fill()

    //blocks 
    this.ctx.fillStyle = 'blue'
    this.blocks.forEach(block => {
      if (block.isAlive) {
        this.ctx.fillRect(block.x, block.y, block.width, block.height)
      }
    })

    this.ctx.fillText('SCORE: ' + this.score, 15, 15)
  },

  run: function () {
    game.update();

    game.render();

    window.requestAnimationFrame(game.run)
  },

  over(text) {
    alert(text);
  }
}

game.platform.ball = game.ball;

window.addEventListener('load', () => {
  game.start()
})