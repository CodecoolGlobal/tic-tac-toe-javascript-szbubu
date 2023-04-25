
function resetGame(boardSize, ships) {
  board = [];
  board2 = [];
  globalVariable.AIShipPosition = [];
  globalVariable.shipsRemaining.AI = 0;
  globalVariable.shipsRemaining.player =0;

  for (let i = 0; i < boardSize; i++) {
      board.push([]);
      board2.push([]);
      for (let j = 0; j < boardSize; j++) {
          board[i].push("");
          board2[i].push("");
      }   
  };
  displayBoard({boardnumber: 1,board: board});
  displayBoard({boardnumber: 2,board: board2});
  for (let i = 0; i < ships.length; i++) {
    globalVariable.AIShipPosition.push(ships[i]);
    globalVariable.shipsRemaining.AI ++;
    globalVariable.shipsRemaining.player ++;
  };
  globalVariable.playerPlacedShip = 0;
  globalVariable.playerCanPlace = globalVariable.AIShipPosition.length;


}

let globalVariable = {
  playerPlacedShips: 0,
  playerCanPlace: 0,
  shipsRemaining:
  {
    AI: 0,
    player: 0,
  },
  AIShipPosition:[],
  shootingPhase: false,
  AITurn: true,
}