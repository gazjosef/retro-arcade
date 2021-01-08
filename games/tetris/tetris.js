const cvs = document.getElementById('tetris');
const ctx = cvs.getContext('2d');

const ROW = 20;
const COL = (COLUMN = 10);
const SQ = (squareSize = 20);
const VACANT = 'WHITE'; // Color of an empty square

// Draw A Square
function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

  ctx.strokeStyle = 'BLACK';
  ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

// Create The Board
let board = [];
for (r = 0; r < ROW; r++) {
  board[r] = [];
  for (c = 0; c < COL; c++) {
    board[r][c] = VACANT;
  }
}

// Draw The Board Onto Canvas
function drawBoard() {
  for (r = 0; r < ROW; r++) {
    for (c = 0; c < COL; c++) {
      drawSquare(c, r, board[r][c]);
    }
  }
}

drawBoard();

// Pieces & Their Colors
const PIECES = [
  [Z, 'red'],
  [S, 'green'],
  [T, 'Yellow'],
  [O, 'Blue'],
  [L, 'Purple'],
  [I, 'Cyan'],
  [J, 'Orange'],
];

// Generate Random Piece
function randomPiece() {
  let r = (randomN = Math.floor(Math.random() * PIECES.length)); // 0 -> 6
  return new Piece(PIECES[r][0], PIECES[r][1]);
}

let p = randomPiece();

// The Object Piece
function Piece(tetromino, color) {
  this.tetromino = tetromino;
  this.color = color;

  this.tetrominoN = 0;
  this.activeTetromino = this.tetromino[this.tetrominoN];

  // Control Pieces
  this.x = 3;
  this.y = 0;
}

// Fill Function
Piece.prototype.fill = function (color) {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      // We draw only occupied squares
      if (this.activeTetromino[r][c]) {
        drawSquare(this.x + c, this.y + r, color);
      }
    }
  }
};

// Draw A Piece To The Board
Piece.prototype.draw = function () {
  this.fill(this.color);
};

// Undraw The Piece
Piece.prototype.unDraw = function () {
  this.fill(VACANT);
};

// Move Down
Piece.prototype.moveDown = function () {
  if (!this.collision(0, 1, this.activeTetromino)) {
    this.unDraw();
    this.y++;
    this.draw();
  } else {
    // We lock the piece and generate a new piece
  }
};

// Move Left
Piece.prototype.moveLeft = function () {
  if (!this.collision(-1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x--;
    this.draw();
  }
};

// Move Right
Piece.prototype.moveRight = function () {
  if (!this.collision(1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x++;
    this.draw();
  }
};

// Rotate Piece
Piece.prototype.rotate = function () {
  let nextPattern = this.tetromino[
    (this.tetrominoN + 1) % this.tetromino.length
  ];
  let kick = 0;
  if (this.collision(0, 0, nextPattern)) {
    if (this.x > COL / 2) {
      // It's the Right Wall
      kick = -1; // We need to move this piece to the left
    } else {
      // It's the Left Wall
      kick = 1; // We need to move this piece to the right
    }
  }
  if (!this.collision(kick, 0, nextPattern)) {
    this.unDraw();
    this.x += kick;
    this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.draw();
  }
};

// Collision Function
Piece.prototype.collision = function (x, y, piece) {
  for (r = 0; r < piece.length; r++) {
    for (c = 0; c < piece.length; c++) {
      // If square is empty, we skip it
      if (!piece[r][c]) {
        continue;
      }
      // Coordinates of the piece after movement
      let newX = this.x + c + x;
      let newY = this.y + r + y;
      // Conditions
      if (newX < 0 || newX >= COL || newY >= ROW) {
        return true;
      }
      // Skip newY < 0; board[-1] will crush our game
      if (newY < 0) {
        continue;
      }
      // Check if there is a locked piece on the board
      if (board[newY][newX] !== VACANT) {
        return true;
      }
    }
  }
  return false;
};

// CONTROL The Piece
document.addEventListener('keydown', CONTROL);

function CONTROL(event) {
  if (event.keyCode == 37) {
    p.moveLeft();
    dropStart = Date.now();
  } else if (event.keyCode == 38) {
    p.rotate();
    dropStart = Date.now();
  } else if (event.keyCode == 39) {
    p.moveRight();
    dropStart = Date.now();
  } else if (event.keyCode == 40) {
    p.moveDown();
    dropStart = Date.now();
  }
}

// Drop The Piece Every 1sec
let dropStart = Date.now();
function drop() {
  let now = Date.now();
  let delta = now - dropStart;
  if (delta > 1000) {
    p.moveDown();
    dropStart = Date.now();
  }
  requestAnimationFrame(drop);
}

drop();
