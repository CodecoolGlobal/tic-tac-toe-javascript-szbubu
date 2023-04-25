function handleClick(data) {
    displayMessage(data.x + data.y + data.clickType);
   
    if (!globalVariable.shootingPhase)
    {
        placeShip(data.x, data.y);
    }
    else if (globalVariable.shootingPhase && !globalVariable.AITurn)
    {
        playerShoot(data.x,data.y);
    }
    else if (globalVariable.AITurn) 
    {
        displayTextMessage("Wait, its the AI's turn!", "red");
    }

  }