let data ="size:4,s:{s1:a1,s2:c4}";
let spliteddata = data.split(",");
let boardsize = parseInt(spliteddata[0][5]);
console.log(boardsize);
let ship = data.split(/[{:,}]+/).splice(1);

console.log("Board size:", boardsize);

let ships = data.substring(data.indexOf("{") + 1, data.indexOf("}")).split(",");
let positions = [];

for (let i = 0; i < ships.length; i++) {
  let ship = ships[i].trim();
  let posIndex = ship.indexOf(":");
  if (posIndex !== -1) {
    let pos = ship.substring(posIndex + 1).trim();
    let x = pos.charCodeAt(0) - 97;
    let y = parseInt(pos.substring(1)) - 1;
    positions.push([x, y]);
  }
}

console.log("Ship positions:", positions);