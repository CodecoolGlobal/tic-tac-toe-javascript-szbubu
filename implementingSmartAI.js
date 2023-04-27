function aiBeingSmart(x,y){
    let shadowBoard =[];
    for (let i = 0; i < board2.length; i++) {
    shadowBoard.push = [];
    for (let j = 0; j < board2[i].length; j++) {
        shadowBoard[i].push(board2[i][j]);
    }
    };
   if (typeof shadowBoard[x+1][y] !== 'undefined'){ shadowBoard[x+1][y]="X";}
   if (typeof shadowBoard[x-1][y] !== 'undefined'){ shadowBoard[x-1][y]="X";}
   if (typeof shadowBoard[x][y+1] !== 'undefined'){ shadowBoard[x][y+1]="X";}
   if (typeof shadowBoard[x][y-1] !== 'undefined'){ shadowBoard[x][y-1]="X";};
   return shadowBoard
}