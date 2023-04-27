let shipPositions = {
  player: [],
  ai: [],
}

function selectGame(data) {
    let splittedData = data.split(",");
    let boardSize = parseInt(splittedData[0][5]);
    board = [];
    shipPositions.player = [];
    shipPositions.ai = [];
    board2 = [];
    for (let i = 0; i < boardSize; i++) {
      board.push([]);
      board2.push([]);
      for (let j = 0; j < boardSize; j++) {
        board[i].push('');
        board2[i].push('');
      }
    }
    evenMoreSplittedData = [];
    for (let i = 1; i < splittedData.length; i++) {
        evenMoreSplittedData.push(splittedData[i].split(':'));
    }
    let ships = [];
    ships.push(evenMoreSplittedData[0][2]);
    for (let i = 1; i < evenMoreSplittedData.length-1; i++) {
      ships.push(evenMoreSplittedData[i][1]);
    }
    ships.push(evenMoreSplittedData[evenMoreSplittedData.length-1][1].slice(0,-1));
    
    
    for (let i = 0; i < ships.length; i++) {
      let ship = [];
      ship.push(ships[i][0].charCodeAt(0)-97);
      ship.push(Number(ships[i][1]));
      shipPositions.ai.push(ship);
      
    }
    
  displayBoard({boardnumber: 1,board: board});
  displayBoard({boardnumber: 2,board: board2});
  }