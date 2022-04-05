// GLOBALS ====================================================
const gap = 2; // CONTROL FOR OMOK GRID GAPS
const cellWidth = 40; // CONTROL FOR OMOK GRID SQUARE SIZE

let playerTurn = 1;
let winner = '';

// GLOBALS TO TARGET HTML CLASSES ==================================
const bgm = new Audio('./public/audio/bgm.mp3');
const gameUI = document.querySelector('.game-ui-left');
const gameAlert = document.querySelector('.game-message');
const startBtn = document.querySelector('.start-button');
const giveUpBtn = document.querySelector('.giveup-button');
const exitBtn = document.querySelector('.exit-button');

// RENDER 2D ARRAY FOR OMOK BOARD =================================
let omokGrid = [];
const omokGridWidth = 19;
const omokGridHeight = 19;
for (let i = 0; i < omokGridHeight; i++) {
  const row = new Array(omokGridWidth);
  row.fill(0);
  omokGrid.push(row);
}

// HELPER FUNCTION: GAME GRID SQUARE CLICK==========================================
//=========================================================================
const clickedGameSquare = (row, column) => {
  const clickEffect = new Audio('./public/audio/click.mp3');
  clickEffect.play();

  if (omokGrid[row][column] === 0) {
    omokGrid[row][column] = playerTurn;
    if (playerTurn === 1) playerTurn = 2;
    else playerTurn = 1;

    renderGamePieces();
    checkForWin(omokGrid, row, column);
    win();
  }
};

// HELPER FUNC: RENDER GAME BOARD ================================================
//=========================================================================
const renderGameBoard = () => {
  const gameBackground = document.createElement('div');
  gameBackground.classList = 'gameBackground';
  gameBackground.style.width = `${(cellWidth * 19) + (gap * 19)}px`;
  gameBackground.style.height = `${(cellWidth * 19) + (gap * 19)}px`;
  gameBackground.style.backgroundColor = 'aliceblue';
  gameBackground.style.position = 'absolute';
  gameBackground.style.left = '0px';
  gameBackground.style.right = '0px';
  gameBackground.style.top = '0px';
  gameBackground.style.bottom = '0px';

  for (let row = 0; row < 19; row++) {
    for (let column = 0; column < 19; column++) {
      const gameSquare = document.createElement('div');
      gameSquare.classList = 'gameSquare';
      gameSquare.style.position = 'absolute';
      gameSquare.style.width = `${cellWidth}px`;
      gameSquare.style.height = `${cellWidth}px`;
      gameSquare.style.backgroundColor = 'white';
      gameSquare.addEventListener('click', () => { clickedGameSquare(`${row}`, `${column}`); });
      gameSquare.addEventListener('click', () => { clickedGameSquare(`${row}`, `${column}`); });

      gameSquare.addEventListener('mouseover', () => {
        gameSquare.style.backgroundColor = 'rgb(240, 248, 255, 0.3)';
      });

      gameSquare.addEventListener('mouseout', () => {
        gameSquare.style.backgroundColor = 'white';
      });

      gameSquare.style.left = `${(cellWidth + gap) * (column)}px`;
      gameSquare.style.top = `${(cellWidth + gap) * (row)}px`;

      gameBackground.appendChild(gameSquare);
      gameUI.appendChild(gameBackground);
    }
  }
};

// HELPER FUNC: RENDER GAME PIECES ================================================
//=========================================================================
const renderGamePieces = () => {
  for (let row = 0; row < 19; row++) {
    for (let column = 0; column < 19; column++) {
      const omokValue = omokGrid[row][column];
      if (omokValue === 0) {
        // empty
      } else {
        const omokPiece = document.createElement('div');
        omokPiece.classList = 'omokPiece';
        omokPiece.style.position = 'absolute';
        omokPiece.style.width = `${cellWidth}px`;
        omokPiece.style.height = `${cellWidth}px`;
        omokPiece.style.left = `${(cellWidth + gap) * (column)}px`;
        omokPiece.style.top = `${(cellWidth + gap) * (row)}px`;

        if (omokValue === 1) {
          // omokPiece.remove();
          omokPiece.style.backgroundImage = "url('./public/images/slime.gif')";
          omokPiece.style.backgroundRepeat = 'no-repeat';
          omokPiece.style.backgroundSize = 'cover';
        }
        if (omokValue === 2) {
          // omokPiece.remove();
          omokPiece.style.backgroundImage = "url('./public/images/mushroom.gif')";
          omokPiece.style.backgroundRepeat = 'no-repeat';
          omokPiece.style.backgroundSize = 'cover';
        }
        gameUI.appendChild(omokPiece);
      }
    }
  }
};

// HELPER FUNCTION: WIN + DRAW CONDITION CHECKERS===================================
//=========================================================================
const checkUp = (omokGrid, row, column) => {
  if (Number(row) >= 4) {
    if (omokGrid[row][column] !== 0 && omokGrid[row][column] === omokGrid[row - 1][column] && omokGrid[row][column] === omokGrid[row - 2][column] && omokGrid[row][column] === omokGrid[row - 3][column] && omokGrid[row][column] === omokGrid[row - 4][column]) {
      winner = omokGrid[row][column];
      console.log(`winner of round is ${winner}`);
      //     return true;
    }
  }
  // return false;
};

const checkDown = (omokGrid, row, column) => {
  if (omokGridWidth - row >= 5) {
    if (omokGrid[row][column] !== 0 && omokGrid[row][column] === omokGrid[row + 1][column] && omokGrid[row][column] === omokGrid[row + 2][column] && omokGrid[row][column] === omokGrid[row + 3][column] && omokGrid[row][column] === omokGrid[row + 4][column]) {
      winner = omokGrid[row][column];
      console.log(`winner of round is ${winner}`);
      //     return true;
    }
  }
  // return false;
};

const checkLeft = (omokGrid, row, column) => {
  if (Number(column) >= 4) {
    // console.log('omok piece', omokGrid[row][column]);
    // console.log('location row', row);
    // console.log('location col', column);
    if (omokGrid[row][column] !== 0 && omokGrid[row][column] === omokGrid[row][column - 1] && omokGrid[row][column] === omokGrid[row][column - 2] && omokGrid[row][column] === omokGrid[row][column - 3] && omokGrid[row][column] === omokGrid[row][column - 4]) {
      winner = omokGrid[row][column];
      console.log(`winner of round is ${winner}`);
      //     return true;
    }
  }
  // return false;
};

const checkRight = (omokGrid, row, column) => {
  if (omokGridWidth - column >= 5) {
    // console.log('omok piece', omokGrid[row][column]);
    // console.log('location row', row);
    // console.log('location col', column);
    if (omokGrid[row][column] !== 0 && omokGrid[row][column] === omokGrid[row][column + 1] && omokGrid[row][column] === omokGrid[row][column + 2] && omokGrid[row][column] === omokGrid[row][column + 3] && omokGrid[row][column] === omokGrid[row][column + 4]) {
      winner = omokGrid[row][column];
      console.log(`winner of round is ${winner}`);
      //     return true;
    }
  }
  // return false;
};

const checkDownRight = (omokGrid, row, column) => {
  if ((omokGridWidth - row >= 5) && (omokGridWidth - column >= 5)) {
    console.log('omok piece', omokGrid[row][column]);

    if (omokGrid[row][column] !== 0 && omokGrid[row][column] === omokGrid[row + 1][column + 1] && omokGrid[row][column] === omokGrid[row + 2][column + 2] && omokGrid[row][column] === omokGrid[row + 3][column + 3] && omokGrid[row][column] === omokGrid[row + 4][column + 4]) {
      winner = omokGrid[row][column];
      console.log(`winner of round is ${winner}`);
      //     return true;
    }
  }
  // return false;
};

const checkDownLeft = (omokGrid, row, column) => {
  if ((omokGridWidth - row >= 5) && (Number(column) >= 4)) {
    console.log('omok piece', omokGrid[row][column]);

    if (omokGrid[row][column] !== 0 && omokGrid[row][column] === omokGrid[row - 1][column + 1] && omokGrid[row][column] === omokGrid[row - 2][column + 2] && omokGrid[row][column] === omokGrid[row - 3][column + 3] && omokGrid[row][column] === omokGrid[row - 4][column + 4]) {
      winner = omokGrid[row][column];
      console.log(`winner of round is ${winner}`);
      //     return true;
    }
  }
  // return false;
};

const checkUpRight = (omokGrid, row, column) => {
  if ((Number(row) >= 4) && (omokGridWidth - column >= 5)) {
    console.log('omok piece', omokGrid[row][column]);

    if (omokGrid[row][column] !== 0 && omokGrid[row][column] === omokGrid[row + 1][column - 1] && omokGrid[row][column] === omokGrid[row + 2][column - 2] && omokGrid[row][column] === omokGrid[row + 3][column - 3] && omokGrid[row][column] === omokGrid[row + 4][column - 4]) {
      winner = omokGrid[row][column];
      console.log(`winner of round is ${winner}`);
      //     return true;
    }
  }
  // return false;
};

const checkUpLeft = (omokGrid, row, column) => {
  if ((Number(row) >= 4) && (Number(column) >= 4)) {
    console.log('omok piece', omokGrid[row][column]);

    if (omokGrid[row][column] !== 0 && omokGrid[row][column] === omokGrid[row - 1][column - 1] && omokGrid[row][column] === omokGrid[row - 2][column - 2] && omokGrid[row][column] === omokGrid[row - 3][column - 3] && omokGrid[row][column] === omokGrid[row - 4][column - 4]) {
      winner = omokGrid[row][column];
      console.log(`winner of round is ${winner}`);
      //     return true;
    }
  }
  // return false;
};

const checkDraw = (omokGrid) => {
  for (let i = 0; i < 19; i++) {
    if (omokGrid[0 + i].includes(0) === true) {
      break;
    } else {
      winner = false;
      console.log('draw');
    }
  }
};

const checkForWin = (omokGrid, row, column) => {
  checkUp(omokGrid, Number(row), Number(column));
  checkDown(omokGrid, Number(row), Number(column));
  checkLeft(omokGrid, Number(row), Number(column));
  checkRight(omokGrid, Number(row), Number(column));
  checkDownLeft(omokGrid, Number(row), Number(column));
  checkDownRight(omokGrid, Number(row), Number(column));
  checkUpLeft(omokGrid, Number(row), Number(column));
  checkUpRight(omokGrid, Number(row), Number(column));
  checkDraw(omokGrid);
};

// HELPER FUNCTION: GAME WIN ===================================================
//=========================================================================
const win = () => {
  if (winner === 1 || winner === 2) {
    const winEffect = new Audio('./public/audio/win.wav');
    winEffect.play();
    gameAlert.style.zIndex = '1';

    setTimeout(() => {
      gameAlert.style.backgroundImage = "url('./public/images/win.png')";

      startBtn.style.visibility = 'visible';
      giveUpBtn.style.visibility = 'hidden';
      exitBtn.style.visibility = 'hidden';
      document.body.removeAttribute('style');
      bgm.pause();
    }, 1200);
  }
};

// HELPER FUNCTION: START BTN CLICK================================================
//=========================================================================
const startBtnClick = () => {
  const startEffect = new Audio('./public/audio/button.wav');
  startEffect.play();
  bgm.play();

  omokGrid = [];
  for (let i = 0; i < omokGridHeight; i++) {
    const row = new Array(omokGridWidth);
    row.fill(0);
    omokGrid.push(row);
  }
  winner = '';

  renderGameBoard();
  renderGamePieces();

  document.body.style.backgroundImage = 'url("./public/images/background.jpg")';
  gameAlert.style.backgroundImage = 'none';
  gameAlert.style.zIndex = '-1';
  startBtn.style.visibility = 'hidden';

  giveUpBtn.style.visibility = 'visible';
  exitBtn.style.visibility = 'visible';
};

// HELPER FUNCTION: GIVEUP BTN CLICK================================================
//==========================================================================
const giveupBtnClick = () => {
  const giveupEffect = new Audio('./public/audio/button.wav');
  giveupEffect.play();

  gameAlert.style.zIndex = '1';
  setTimeout(() => {
    const loseEffect = new Audio('./public/audio/lose.wav');
    loseEffect.play();
    gameAlert.style.backgroundImage = "url('./public/images/lose.png')";

    startBtn.style.visibility = 'visible';
    giveUpBtn.style.visibility = 'hidden';
    exitBtn.style.visibility = 'hidden';
    document.body.removeAttribute('style');
    bgm.pause();
  }, 500);
};

// HELPER FUNCTION: EXIT BTN CLICK===================================================
//==========================================================================
const exitBtnClick = () => {
  const endEffect = new Audio('./public/audio/button.wav');
  endEffect.play();

  setTimeout(() => {
    const leaveEffect = new Audio('./public/audio/exit.wav');
    leaveEffect.play();
  }, 450);

  setTimeout(() => {
    window.location.reload();
  }, 750);
};

startBtn.addEventListener('click', startBtnClick);
exitBtn.addEventListener('click', exitBtnClick);
giveUpBtn.addEventListener('click', giveupBtnClick);

giveUpBtn.style.visibility = 'hidden';
exitBtn.style.visibility = 'hidden';