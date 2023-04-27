let board = [["P","I","C","K",""],["","","","", ""],["G","A","M","E", ""],["","","","", ""], ["M", "O", "D", "E", ""]];
let board2 = [["P","I","C","K",""],["","","","", ""],["G","A","M","E", ""],["","","","", ""], ["M", "O", "D", "E", ""]];
displayMessage("Pick a game mode!", "purple");
displayTextMessage("<= here to the left!", "white");

let shipPositions = {
  player: [],
  ai: [],
};
let shootingPhase = false;
let playerTurn = true; /*this two global variables could be merged or concatanates itno one globa variable such as
let whoseTurnAndWhichPhase=0, if playerturn and placing phase = 1, if playerturn and shooting phase = 2, etc...*/




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

  if (data === "size:4,s:{s1:a1,s2:c4}"){
    displayMessage("AI has placed it's ships randomly, place your ships ", "purple");
    boardSize = 4;
    refreshBoard(boardSize);
    console.log("this is boardsize"+boardSize);
    randomShip1 = {
      x: Math.round(Math.random()*(boardSize-1)),
      y: Math.round(Math.random()*(boardSize-1)),
      alive: true
    }
    console.log("this randomship 1"+ randomShip1);
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
    displayTextMessage("its " + displayAiShip().whose +"'s turn,"+ displayAiShip().phase +" phase, and the AI has "+ displayAiShip().ship + " ships left","red");
  }
  
  else if(data !== "size:4,s:{s1:a1,s2:c4}"){
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
    displayMessage("It is the AI's turn to shoot!", "purple");
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

  let hit = isItAHit(x, y,"ai");

  if (hit === 1){
    board2[x][y] = '💥';
    displayMessage("The AI hit your ship!", "purple");
    displayTextMessage("its " + displayAiShip().whose +"'s turn,"+ displayAiShip().phase+" phase, and the AI has "+ displayAiShip().shipsleft + " ships left","white");
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
    board2[x][y] = '✥';
    displayMessage("It's a miss!", "purple");
    displayTextMessage("its " + displayAiShip().whose +"'s turn,"+ displayAiShip().phase+" phase, and the AI has "+ displayAiShip().shipsleft + " ships left","white");
    displayBoard({boardnumber: 2,board: board2});
    playerTurn = true;
  }

  else if (hit === 2){
    aiShoot("_");
    displayTextMessage("its " + displayAiShip().whose +"'s turn,"+ displayAiShip().phase+" phase, and the AI has "+ displayAiShip().shipsleft + " ships left","white");
  
  }
}
}

displayBoard({boardnumber: 1,board: board});
displayBoard({boardnumber: 2,board: board2});

function placeShip(x, y) {
  if (!validatePlacementPosition(x, y, "player")) {
    displayMessage("You can not place ship there!", "purple");
  } else {
  let ship = {x:x, y:y, alive:true};
  shipPositions.player.push(ship);
  board2[x][y] = '🛳';
  displayBoard({boardnumber: 2,board: board2});
  if (shipPositions.player.length >= shipPositions.ai.length) {
    shootingPhase = true;
    displayMessage("Placing phase is over!", "purple");
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
    let hit = 0;
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
        hit = 1; // if its a hit, return 1
      }
    });
        if (b[x][y] === '✥' || b[x][y] === '💥') {
          hit = 2; /// if it has already been shot there, return 2
        } else if (b[x][y] === '') {
          if(hit===1){
          hit = 1; /// it its a miss, return 3
          }
          else{hit =3;
          }
    }
    return hit;
  }

  function playerShoot(x, y) {
    let hit = isItAHit(x, y,"player"); // 1 for hit, 2 for already shooting there, 3 for a miss
    if (hit === 1){
      board[x][y] = '🎆';
      displayBoard({boardnumber: 1,board: board});
      displayMessage("You hit ai's ship!", "purple");
      displayTextMessage("its " + displayAiShip().whose +"'s turn,"+ displayAiShip().phase+" phase, and the AI has "+ displayAiShip().shipsleft + " ships left","white");
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
      board[x][y] = '✥';
      displayMessage("It's a miss!", "green");
      displayBoard({boardnumber: 1,board: board});
      playerTurn = false;
    }

    else if (hit === 2){
      displayMessage("You have already shot there Sherlock!", "purple");
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
  result.whose = "Ai"
}
result.shipsleft = counter 
 console.log(result)
    return result ;
  }