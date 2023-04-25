let board = [
  ["","","",""],
  ["","","",""],
  ["","","",""],
  ["","","",""]];

const board2 = [
  ["","","",""],
  ["","","",""],
  ["","","",""],
  ["","","",""]];

function selectGame(data) {
  displayMessage(data, "black");



  boardSize
}

function handleClick(data) {
  displayMessage(data.x + data.y + data.clickType);
 
  if (!shootingPhase)
  {placeShip(data.x, data.y);
  }
  /*if (shootingPhase)
  {}
  */
}

function resetGame() {
  board = [];
  for(let i = 0; i < 4; i++) {
    board.push([])
    for(let j = 0; j < 4; j++) {
      board[i].push("");
    }
  }
  displayBoard({boardnumber: 1,board: board});
}

function aiShoot(data) {
  console.log(data);
}

displayBoard({boardnumber: 1,board: board});
displayBoard({boardnumber: 2,board: board2});
displayMessage("message", "green");
displayTextMessage("text message", "red");

// from here my code
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
  AITurn: false,
}

function placeShip(x,y,){
  let posX = (x.charCodeAt()-65);
  let posY = y;
  if (board2[posX][posY]==="O")
  {
    displayTextMessage("there is a ship there already", "red");
  }
  else if (posX-1 >= 0 && board2[posX-1][posY]==="O")
  {displayTextMessage("you can not place ship there", "red");}
  else if (posX+1 < board2.length && board2[posX+1][posY]==="O")
  {displayTextMessage("you can not place ship there", "red");}
  else if (posY-1 >= 0 && board2[posX][posY-1]==="O")
  {displayTextMessage("you can not place ship there", "red");}
  else if (posY+1 < board2[posX].length && board2[posX][posY+1]==="O")
  {displayTextMessage("you can not place ship there", "red");}
  
  else {
    board2[posX][posY]="O";
    displayBoard({boardnumber: 2,board: board2});
    globalVariable.playerPlacedShips++;
  };
  if (globalVariable.playerPlacedShips>=3){
    globalVariable.shootingPhase = true;
    displayMessage("placing phase is over", "green");
  }
}

function checkGridForPlacing (x,y, player){
  let posX = (x.charCodeAt()-65);
  let posY = y;
}
