function Gameboard() {
  const rows = 3;
  const columns = 3;
  let board = [];

  // creating board

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }
  const getBoard = () => board;

  // droping token

  const dropToken = (row, column, player) => {
    if (board[row][column].getValue() === 0) {
      board[row][column].addToken(player);
      return true;
    } else {
      console.log(board[row][column].getValue());
      console.log("Cell is already occupied. Choose another cell");
      return false;
    }
  };
  // printing board

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, printBoard, dropToken };
}

function Cell() {
  let value = 0;
  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;
  return { addToken, getValue };
}

function GameController(
  playerOneName = "Player One",
  PlayerTwoName = "Player Two"
) {
  const board = Gameboard();
  let curntBoard = board.getBoard();
  console.log(board.getBoard());
  console.log(board);
  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: PlayerTwoName,
      token: "O",
    },
  ];

  let activePlayer = players[0];
  let gameOver = false;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;
  console.log(getActivePlayer());

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };
  while (!gameOver) {
    const playerPosition = getPlayersPosition();
    const row = playerPosition.getRow();
    const column = playerPosition.getColumn();

    const moveSuccessful = playRound(row, column, getActivePlayer(), board);
    if (moveSuccessful) {
      // anounce winner if any of the following match
      const winning = winningDecision(
        board.getBoard(),
        getActivePlayer().token
      );
      console.log(getActivePlayer().token);
      console.log(winning);
      if (winning === true) {
        console.log(`${getActivePlayer().name} wins!`);
        gameOver = true;
      } else if (isBoardFull(board.getBoard())) {
        console.log(isBoardFull(board.getBoard()));
        console.log("Game ends in draws");
        gameOver = true;
      }
      1;

      switchPlayerTurn();
      // playRound(row, column);
    }
    printNewRound();
  }
  return {
    getActivePlayer,
  };
}

function winningDecision(board, player) {
  //   const board = board.getBoard();
  console.log(board, "one");
  const winningCombinations = [
    [
      //rows only combination
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // columns only combination
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // diagonal only combination
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];
  console.log(player, "from winning decision");
  const decision = winningCombinations.some((combination) => {
    return combination.every(([row, column]) => {
      return board[row][column].getValue() === player;
    });
  });

  return decision;
}

function getPlayersPosition() {
  const row = prompt("enter row");
  const column = prompt("enter column");
  let playerToken;
  /* do {
    playerToken = prompt("Choose your token X or O");
    if (playerToken === null) {
      console.log(playerToken);
      return;
    }
    playerToken = playerToken.toUpperCase();
  } while (playerToken !== "X" && playerToken !== "O");
  console.log(row, column, playerToken); */

  const getRow = () => row;
  const getColumn = () => column;

  return { getRow, getColumn };
}

function isBoardFull(board) {
  const boardFull = board.every((row) =>
    row.every((cell) => cell.getValue() !== 0)
  );
  1;
  return boardFull;
}
GameController();

function playRound(row, column, player, board) {
  console.log(player);
  console.log(
    `Dropping ${player.name}'s token ${player.token} into row${row} of column ${column}`
  );
  return board.dropToken(row, column, player.token);
}
