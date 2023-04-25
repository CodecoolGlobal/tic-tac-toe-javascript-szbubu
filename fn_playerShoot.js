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

playerShoot(x,y) {
    let posX = (x.charCodeAt()-65);
    let posY = y;
    if (globalVariable.AIShipPosition.includes([posX,posY]) && board[posX][posY]!="X")
    {
        board[posX][posY]="X";
        displayTextMessage("You have hit one of the AI's ship!","red");
        displayBoard({boardnumber: 1,board: board});
        globalVariable.shipsRemaining.AI--;
        if (globalVariable.shipsRemaining<=0){
            displayTextMessage("You have WON! Congratulations!", "red");
        }
        globalVariable.AITurn = true;
    }
    else if (board[posX][posY]==="O" || board[posX][posY]==="X")
    
    {
        displayTextMessage("You have already shot there","red");
    }
    else
    {
        board[posX][posY]="O";
        displayBoard({boardnumber: 1,board: board});
        displayTextMessage("You have hit one of the AI's ship!", "red");
        globalVariable.AITurn = true;
    }
}



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