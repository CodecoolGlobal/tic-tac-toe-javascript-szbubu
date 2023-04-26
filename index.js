let board = [["w","w","",""],["","","","0"],["q","","",""],["","","",""]];
let board2 = [["w","w","","",""],["","","","0", ""],["q","","","", ""],["","0","0","", ""], ["", "", "", "", ""]];

let shipPositions = {
  player: [],
  ai: [],
};
let shootingPhase = false;
let playerTurn = true;



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
    let ship = {
      x: ships[i][0].charCodeAt(0)-97,
      y: Number(ships[i][1])-1, // or is it y: Number(ships[i][1]-1),?
      alive: true
    };

    shipPositions.ai.push(ship);
    
  }
  
displayBoard({boardnumber: 1,board: board});
displayBoard({boardnumber: 2,board: board2});

shootingPhase = false;
playerTurn = true;
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
    displayMessage("It is the AI's turn to shoot!", "red");
  }

}

function resetGame() {
  shipPositions.ai.forEach((element) => {element.alive = true});
  let boardSize = board.length;
  let board = [];
  let board2 = [];
  for(let i = 0; i < boardSize; i++) {
    board.push([]);
    board2.push([]);
    for(let j = 0; j < boardSize; j++) {
      board[i].push("");
      board2[i].push("");
    }
  }
  shipPositions.player = [];
  displayBoard({boardnumber: 1,board: board});
  displayBoard({boardnumber: 2,board: board2});

  shootingPhase = false;
  playerTurn = true;
}

function getRandomCoordinates()
{
  let result = Math.round(Math.random()*(board.length-1));
  return result;
}

function aiShoot(data) {
  if (playerTurn){
    displayMessage("It's your turn to shoot.", "green");
  }
  else if(!playerTurn){
  let x = getRandomCoordinates(); 
  let y = getRandomCoordinates();

  let hit = isItAHit(x, y,"ai");

  if (hit === 1){
    board2[x][y] = 'Ø';
    displayMessage("The AI hit your ship!", "green");
    shipPositions.player.forEach((element) => {
      if (x === element.x && y === element.y) {
        element.alive = false;
      }
    });
    displayBoard({boardnumber: 2,board: board2});
    checkGameOver();
    playerTurn = true;
  }
  else if( hit === 3 ){
    board2[x][y] = 'X';
    displayMessage("It's a miss!", "green");
    displayBoard({boardnumber: 2,board: board2});
    playerTurn = true;
  }

  else if (hit === 2){
    aiShoot("_");
  
  }
}
}

displayBoard({boardnumber: 1,board: board});
displayBoard({boardnumber: 2,board: board2});
displayMessage("message", "green");
displayTextMessage("text message", "red");

function placeShip(x, y) {
  if (!validatePlacementPosition(x, y)) {
    displayMessage("You can not place ship there!", "red");
  } else {
  let ship = {x:x, y:y, alive:true};
  shipPositions.player.push(ship);
  board2[x][y] = 'O';
  displayBoard({boardnumber: 2,board: board2});
  if (shipPositions.player.length >= shipPositions.ai.length) {
    shootingPhase = true;
    displayMessage("Placing phase is over!", "red");
  }
 }
}

function validatePlacementPosition(x, y,) {
  let result = true;
    shipPositions.player.forEach((element) => {
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
    console.log("fn isITAHit has been called")
    let hit = 0;
    let b;
    let ships;
    if (whoIsShooting === 'player'){
      console.log("by the player");
      b = board;
      ships = shipPositions.ai;
    } else if (whoIsShooting === 'ai') {
      console.log("by the AI");
      b = board2;
      ships = shipPositions.player;
    }
    console.log("starting to itarate over ships array")
    ships.forEach((element) => {
      if (x === element.x && y === element.y) {
        hit = 1; // if its a hit, return 1
        console.log("it has found a match, so setting hit to 1")
        console.log("this hit now: "+hit+"");
      }
    });
  
    for (let i = 0; i < b.length; i++) {
      for (let j = 0; j < b.length; j++) {
        if (b[x][y] === 'X' || b[x][y] === 'Ø') {
          hit = 2; /// if it has already been shot there, return 2
        } else if (b[x][y] === '') {
          if(hit===1){
          hit = 1; /// it its a miss, return 3
          console.log("this ovvrrides the previous hit, so hit is now  "+hit);
          }
          else{hit =3;
          }
        }
      }
    } ////
    console.log("about to return hit, which is currently "+hit);
    return hit;
  }

  function playerShoot(x, y) {
    console.log("fn playerShoot has been called");
    let hit = isItAHit(x, y,"player"); // 1 for hit, 2 for already shooting there, 3 for a miss
    console.log("fn playerShoot called isItAHit function and received value, which is "+hit+" lets check it")
    if (hit === 1){
      console.log("if zou see this good!")
      board[x][y] = 'Ø';
      displayBoard({boardnumber: 1,board: board});
      displayMessage("You hit ai's ship!", "green");
      shipPositions.ai.forEach((element) => {
        if (x === element.x && y === element.y) {
          element.alive = false;
        }
      });
      displayBoard({boardnumber: 1,board: board});
      checkGameOver();
      playerTurn = false;
    }
    else if( hit === 3 ){
      board[x][y] = 'X';
      displayMessage("It's a miss!", "green");
      displayBoard({boardnumber: 1,board: board});
      playerTurn = false;
    }

    else if (hit === 2){
      displayMessage("You have already shot there Sherlock!", "green");
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
        displayMessage("Game Over! You have won!", "purple");
      }
      else if(counterForPlayerShips<1){
        displayMessage("Game Over! You have lost :(", "purple");
      }
    }
  }