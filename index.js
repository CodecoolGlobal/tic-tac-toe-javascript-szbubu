  let board = [["C","L","I","C","K",""],["O","N","","", "",""],["S","E","L","E", "C","T"],["G","A","M","E", "", ""], ["M", "O", "D", "E", "!",""]];
  let board2 = [["C","L","I","C","K",""],["O","N","","", "",""],["S","E","L","E", "C","T"],["G","A","M","E", "", ""], ["M", "O", "D", "E", "!",""]];
  displayMessage("Click on 'Select game mode!'", "purple");
  displayTextMessage("<= here on the left!", "purple");

  let shipPositions = {
    player: [],
    ai: [],
  };
  let shootingPhase = false;
  let playerTurn = true;




  function selectGame(data) {
    let boardSize = 0;
    board = [];
    board2 = [];
    shipPositions.player = [];
    shipPositions.ai = [];
    shootingPhase = false;
    playerTurn = true;
    let randomShip1= [];
    let randomShip2 = [];

    if (data === "random"){
      displayMessage("AI has placed it's ships randomly, place your ships ", "purple");
      displayTextMessage("It's " + displayAiShip().whose +"'s turn,"+ displayAiShip().phase+" phase, and the AI has "+ displayAiShip().shipsleft + " ships left","purple");
      boardSize = 4;
      refreshBoard(boardSize);
      randomShip1 = {
        x: Math.round(Math.random()*(boardSize-1)),
        y: Math.round(Math.random()*(boardSize-1)),
        alive: true
      }
      shipPositions.ai.push(randomShip1);
      let notAValidShip = true;
      randomShip2 = {
        x: Math.round(Math.random()*(boardSize-1)),
        y: Math.round(Math.random()*(boardSize-1)),
        alive: true
      }
      while (notAValidShip) {
        if (validatePlacementPosition(randomShip2.x, randomShip2.y, "ai")){
          notAValidShip = false;
        }
        else if (!validatePlacementPosition(randomShip2.x, randomShip2.y, "ai")){
          randomShip2 = {
            x: Math.round(Math.random()*(boardSize-1)),
            y: Math.round(Math.random()*(boardSize-1)),
            alive: true
          }
        }
      }
      shipPositions.ai.push(randomShip2);
      displayTextMessage("It's " + displayAiShip().whose +"'s turn, "+ displayAiShip().phase +" phase, and the AI has "+ displayAiShip().ship + " ships left","purple");
    }
    
    else if(data !== "random"){
    
    let splittedData = data.split(/[{:,}]+/).splice(1);
    splittedData.forEach((element,i)=>{
    if (i===0){
      boardSize=Number(element);
    }
    else if (element.length > 1 && element[0]!="s"){
    
    let ship = {
      x: element[0].charCodeAt(0)-97,
      y: Number(element[1]-1), 
      alive: true
    };
    shipPositions.ai.push(ship);
    }
    });
    refreshBoard(boardSize);
    displayMessage("Please, place your ships, you can place "+shipPositions.ai.length+" ships.", "purple");
    displayTextMessage("It's " + displayAiShip().whose +"'s turn, "+ displayAiShip().phase +" phase, place your ships onto the right board!","purple");
  }
    }
    
  function refreshBoard(boardSize){
    board=[];
    board2=[];

    for (let i = 0; i < boardSize; i++) {
      board.push([]);
      board2.push([]);
      for (let j = 0; j < boardSize; j++) {
        board[i].push('');
        board2[i].push('');
      }
    }  
  displayBoard({boardnumber: 1,board: board});
  displayBoard({boardnumber: 2,board: board2});
  }


  function handleClick(data) {
    let x = data.x.charCodeAt()-65;
    let y = Number(data.y);
    if (!shootingPhase) {
      placeShip(x, y);
    }
    else if (shootingPhase && playerTurn)
    {
    playerShoot(x, y);
    }
    else if (!playerTurn){
      displayMessage("It is the AI's turn to shoot.", "purple");
    }

  }

  function resetGame() {
    shipPositions.ai.forEach((element) => {element.alive = true});
    let boardSize = board.length;
    shipPositions.player = [];
    shootingPhase = false;
    playerTurn = true;
    refreshBoard(boardSize);
  }

  function getRandomCoordinates()
  {
    let result = Math.round(Math.random()*(board.length-1));
    return result;
  }

  function aiShoot(data) {
    if (playerTurn){
      displayMessage("It's your turn to shoot.", "purple");
    }
    else if(!playerTurn){
    let x = getRandomCoordinates(); 
    let y = getRandomCoordinates();

    let hitOrMiss = isItAHit(x, y,"ai");

    if (hitOrMiss === "hit"){
      board2[x][y] = '💥';
      displayMessage("The AI hit your ship!", "red");
      shipPositions.player.forEach((element) => {
        if (x === element.x && y === element.y) {
          element.alive = false;
        }
      });
      displayBoard({boardnumber: 2,board: board2});
      checkGameOver();
      playerTurn = true;
      displayTextMessage("It's " + displayAiShip().whose +"'s turn in the "+ displayAiShip().phase+" phase, and the AI has "+ displayAiShip().shipsleft + " ships left","purple");
    }
    else if( hitOrMiss === "miss" ){
      board2[x][y] = '✥';
      displayMessage("AI missed.", "purple");
      displayBoard({boardnumber: 2,board: board2});
      playerTurn = true;
      displayTextMessage("It's " + displayAiShip().whose +"'s turn, "+ displayAiShip().phase+" phase, and the AI has "+ displayAiShip().shipsleft + " ships left","purple");
    }

    else if (hitOrMiss === "already"){
      aiShoot();
      displayTextMessage("It's " + displayAiShip().whose +"'s turn, "+ displayAiShip().phase+" phase, and the AI has "+ displayAiShip().shipsleft + " ships left","purple");
    
    }
  }
  }

  displayBoard({boardnumber: 1,board: board});
  displayBoard({boardnumber: 2,board: board2});

  function placeShip(x, y) {
    if (!validatePlacementPosition(x, y, "player")) {
      displayMessage("You can not place ship there!", "red");
    } else {
    let ship = {x:x, y:y, alive:true};
    shipPositions.player.push(ship);
    board2[x][y] = '🛳';
    displayBoard({boardnumber: 2,board: board2});
    if (shipPositions.player.length >= shipPositions.ai.length) {
      shootingPhase = true;
      displayMessage("Placing phase is over, start shooting!", "purple");
      displayTextMessage("It's " + displayAiShip().whose +"'s turn, "+ displayAiShip().phase+" phase, and the AI has "+ displayAiShip().shipsleft + " ships left","purple");
    }
  }
  }

  function validatePlacementPosition(x, y, whichPlayer) {
    let result = true;
    let ships = [];
    if (whichPlayer === "player"){
      ships = shipPositions.player;
    }
    else if (whichPlayer === "ai"){
      ships = shipPositions.ai;
    }  
    ships.forEach((element) => {
        if (x === element.x && y === element.y) {
          result = false; 
        } else if (x === element.x-1 && y === element.y) {
          result = false; 
        } else if (x === element.x+1 && y === element.y) {
          result = false;
        } else if (x === element.x && y === element.y-1) {
          result = false;
        } else if (x === element.x && y === element.y+1) {
          result = false;
        }
        else {result = true;
        }
      });  return result; 
  }
  


    function isItAHit(x, y, whoIsShooting) {
      let hitOrMiss = "";
      let b;
      let ships;
      if (whoIsShooting === 'player'){
        b = board;
        ships = shipPositions.ai;
      } else if (whoIsShooting === 'ai') {
        b = board2;
        ships = shipPositions.player;
      }
      ships.forEach((element) => {
        if (x === element.x && y === element.y) {
          hitOrMiss = "hit";
        }
      });
          if (b[x][y] === '✥' || b[x][y] === '💥') {
            hitOrMiss = "already";
          } else if (b[x][y] === '') {
            if(hitOrMiss!=="hit"){
            hitOrMiss = "miss";
            }
      }
      return hitOrMiss;
    }

    function playerShoot(x, y) {
      let hitOrMiss = isItAHit(x, y,"player"); // 1 for hit, 2 for already shooting there, 3 for a miss
      if (hitOrMiss === "hit"){
        board[x][y] = '💥';
        displayBoard({boardnumber: 1,board: board});
        displayMessage("You hit one of the AI's ship!", "purple");
        shipPositions.ai.forEach((element) => {
          if (x === element.x && y === element.y) {
            element.alive = false;
          }
        });
        displayTextMessage("It's " + displayAiShip().whose +"'s turn in the "+ displayAiShip().phase+" phase, and the AI has "+ displayAiShip().shipsleft + " ships left","purple");
        displayBoard({boardnumber: 1,board: board});
        checkGameOver();
        playerTurn = false;
        displayTextMessage("It's " + displayAiShip().whose +"'s turn, "+ displayAiShip().phase+" phase, and the AI has "+ displayAiShip().shipsleft + " ships left","purple");
      }
      else if( hitOrMiss === "miss" ){
        board[x][y] = '✥';
        displayMessage("It's a miss!", "purple");
        displayBoard({boardnumber: 1,board: board});
        playerTurn = false;
        displayTextMessage("It's " + displayAiShip().whose +"'s turn, "+ displayAiShip().phase+" phase, and the AI has "+ displayAiShip().shipsleft + " ships left","purple");
      }

      else if (hitOrMiss === "already"){
        displayMessage("You have already shot there hotshot!", "red");
      }
    }
    function checkGameOver(){
      let counterForAiShips=0;
      let counterForPlayerShips=0;
      shipPositions.ai.forEach((element)=>{
        if (element.alive){
          counterForAiShips++;
        }
      });
      shipPositions.player.forEach((element)=>{
        if (element.alive){
          counterForPlayerShips++;
        }
      });
      if (counterForAiShips===0 || counterForPlayerShips===0){
        if (counterForAiShips<1){
          displayMessage("You have won! Congratulations!", "red");
        }
        else if(counterForPlayerShips<1){
          displayMessage("Game Over! You have lost.", "red");
        }
      }
    }
    function displayAiShip(){
      let counter = 0 ;
      shipPositions.ai.forEach((element) =>{
        if (element.alive === true){
          counter ++;
        }
      }
  ) 
  let result = {};
  if( shootingPhase ){
    result.phase = "shooting"
  }else if(
    !shootingPhase 
  ){
    result.phase = "placing"
  }
  if(playerTurn  ){
    result.whose = "player "
  }else if( 
    !playerTurn 
  ){
    result.whose = "AI"
  }
  result.shipsleft = counter 
  console.log(result)
      return result ;
    }