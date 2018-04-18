const N = 9;
const UNASSIGNED = 0;
function solveSudoku(grid){
	let row ={value:0};
	let col ={value :0};
	if(!findUnassignedLocation(grid,row,col))
	return true;
	for(let num =1;num <N;num++){
		if (isSafe(grid,row.value,col.value,num)) {
			grid[row.value][col.value]=num;
			if(solveSudoku(grid))
			return true;
			grid[row.value][col.value]= UNASSIGNED;
		}

	}
	return false;		
}
function findUnassignedLocation(grid,row,col){
	for(let row =0;row<N; row++)
	for(let col =0;col<N;col++)
		if(grid[row][col]==UNASSIGNED)
		return true;
	return false;	
}
function usedInRow(grid,row,num){
	for(let col = 0 ; col<N;col++){
		if(grid[row][col]==num){
			return true;
		}
	}
	return false; 
}
function usedInColumn(grid,col,num){
	for(let row =0;row<N;row++){
		if(grid[row][col]==num){
			return true;
		}
	}
	return false;
}
function usedInbox(grid,boxStartRow,boxStartCol,num){
	for(let row =0;row<3;row++)
	for(let col=0;col<3;col++)
		if(grid[row+boxStartRow][col+boxStartCol]==num)
		return true;
	return false;
}
function isSafe(grid,row,col,num){
	return !usedInRow(grid, row.value, num) &&
        !usedInColumn(grid, col.value, num) &&
        !usedInbox(grid, row - row % 3, col - col % 3, num);
}
function printGrid(grid){
	console.log(grid);
}
let grid = [
    [7, 0, 5, 0, 0, 3, 0, 2, 0],
    [0, 8, 0, 0, 0, 0, 0, 9, 1],
    [0, 6, 0, 8, 0, 0, 0, 4, 3],
    [0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 6, 0, 8, 0, 3, 0, 2],
    [0, 0, 0, 2, 3, 1, 6, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 5, 0],
    [0, 0, 0, 0, 9, 0, 0, 0, 7],
    [0, 0, 0, 0, 0, 0, 2, 0, 8]
];
if (solveSudoku(grid) == true)
    printGrid(grid);
else
    console.log("No solution exists");