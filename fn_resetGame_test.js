let globalVariable = {
  plaerPlacedShips: 0,
  AIShipPosition:[],
  shootingPhase: false,
  AITurn: true,
} 
let boardSize = 4;
let ships = [
    [0,3],
    [3,2]
];

board = [];
board2 = [];


for (let i = 0; i < boardSize; i++) {
    board.push([]);
    board2.push([]);
    for (let j = 0; j < boardSize; j++) {
        board[i].push("");
        board2[i].push("");
    }   
};


//function resetGame(boardSize, ships) {
  board = [];
  board2 = [];
  globalVariable.AIShipPosition = [];

  for (let i = 0; i < boardSize; i++) {
      board.push([]);
      board2.push([]);
      for (let j = 0; j < boardSize; j++) {
          board[i].push("");
          board2[i].push("");
      }   
  };
  //displayBoard({boardnumber: 1,board: board});
  //displayBoard({boardnumber: 2,board: board2});
  for (let i = 0; i < ships.length; i++) {
    globalVariable.AIShipPosition.push(ships[i]);
    
  }
//}
console.log(globalVariable.AIShipPosition);