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
    if (globalVariable.playerPlacedShips>=globalVariable.playerCanPlace){
      globalVariable.shootingPhase = true;
      displayMessage("placing phase is over", "green");
  
    }
  }