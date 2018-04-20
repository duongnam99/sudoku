	 let sudokus = new Array();
	 let test ='';
	 var check;
	 var check_stop;
	 // var arr_puzzle = new Array();
	 var arr_puzzle_new = new Array();

function returnRow(cell) {
	return Math.floor(cell / 9);
}
function returnCol(cell){
	return cell%9;

}
function returnBlock(cell){
	return Math.floor(returnRow(cell)/3)*3 + Math.floor(returnCol(cell)/3);
}
function isPossibleRow(number,row,sudoku){
	for(let i=0;i<9;i++){
		if(sudoku[row*9+i]==number){
			return false;
		}
	}
	return true;
}
function isPossibleCol(number,col,sudoku){
	for(let i=0;i<9;i++){
		if(sudoku[col+9*i]==number){
			return false;
		}
	}
	return true;
}
function isPossibleBlock(number,block,sudoku){
	for(let i=0;i<9;i++){
		if (sudoku[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)] == number) {
			return false;
		}
	}
	return true;
}
function isPossibleNumber(cell,number,sudoku){
	var row =returnRow(cell);
	var col= returnCol(cell);
	var block =  returnBlock(cell);
return isPossibleRow(number,row,sudoku)&&isPossibleCol(number,col,sudoku)&&isPossibleBlock(number,block,sudoku);
}
function isCorrectRow(row,sudoku) {
	var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
	var rowTemp= new Array();
	for (var i=0; i<=8; i++) {
		rowTemp[i] = sudoku[row*9+i];
	}
	rowTemp.sort();
	return rowTemp.join() == rightSequence.join();
}
function isCorrectCol(col,sudoku) {
	var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
	var colTemp= new Array();
	for (var i=0; i<=8; i++) {
		colTemp[i] = sudoku[col+i*9];
	}
	colTemp.sort();
	return colTemp.join() == rightSequence.join();
}
function isCorrectBlock(block,sudoku) {
	var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
	var blockTemp= new Array();
	for (var i=0; i<=8; i++) {
		blockTemp[i] = sudoku[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)];
	}
	blockTemp.sort();
	return blockTemp.join() == rightSequence.join();
}
function isSolvedSudoku(sudoku) {
	for (var i=0; i<=8; i++) {
		if (!isCorrectBlock(i,sudoku) || !isCorrectRow(i,sudoku) || !isCorrectCol(i,sudoku)) {
			return false;
		}
	}
	return true;
}
function determinePossibleValues(cell,sudoku) {
	var possible = new Array();
	for (var i=1; i<=9; i++) {
		if (isPossibleNumber(cell,i,sudoku)) {
			possible.unshift(i);
		}
	}
	return possible;
}
function determineRandomPossibleValue(possible,cell) {
	var randomPicked = Math.floor(Math.random() * possible[cell].length);
	return possible[cell][randomPicked];
}
function scanSudokuForUnique(sudoku) {
	var possible = new Array();
	for (var i=0; i<=80; i++) {
		if (sudoku[i] == 0) {
			possible[i] = new Array();
			possible[i] = determinePossibleValues(i,sudoku);
			if (possible[i].length==0) {
				return false;
			}
		}
	}
	return possible;
}
function removeAttempt(attemptArray,number) {
	var newArray = new Array();
	for (var i=0; i<attemptArray.length; i++) {
		if (attemptArray[i] != number) {
			newArray.unshift(attemptArray[i]);
		}
	}
	return newArray;
}
function nextRandom(possible) {
	var max = 9;
	var minChoices = 0;
	for (var i=0; i<=80; i++) {
		if (possible[i]!=undefined) {
			if ((possible[i].length<=max) && (possible[i].length>0)) {
				max = possible[i].length;
				minChoices = i;
			}
		}
	}
	return minChoices;
}

function solve(sudoku) {
	var saved = new Array();
	var savedSudoku = new Array();
	// var i=0;
	var nextMove;
	var whatToTry;
	var attempt;
	while (!isSolvedSudoku(sudoku)) {
		// i++;
		nextMove = scanSudokuForUnique(sudoku);
		if (nextMove == false) {
			nextMove = saved.pop();
			sudoku = savedSudoku.pop();
		}
		whatToTry = nextRandom(nextMove);
		attempt = determineRandomPossibleValue(nextMove,whatToTry);
		if (nextMove[whatToTry].length>1) {
			nextMove[whatToTry] = removeAttempt(nextMove[whatToTry],attempt);
			saved.push(nextMove.slice());
			savedSudoku.push(sudoku.slice());
		}
		sudoku[whatToTry] = attempt;
	}
	return sudoku;
}

function makeNewGame(level){
	var arr = []
	while(arr.length < level){
    var randomnumber = Math.floor(Math.random()*80) + 0;
    if(arr.indexOf(randomnumber) > -1) continue;
    arr[arr.length] = randomnumber;

	}
  return arr.sort(compare);
}
function compare(a,b){
	return a-b;
}
let arr = new Array();
function makePuzzle(){
		var puzzle = new Array();
		if (document.getElementById('customRadio1').checked) {
		  rate_value = document.getElementById('customRadio1').value;
		}else if (document.getElementById('customRadio2').checked) {
		  rate_value = document.getElementById('customRadio2').value;
		} else if (document.getElementById('customRadio3').checked) {
		  rate_value = document.getElementById('customRadio3').value;
		}
		level= rate_value;
 		arr=makeNewGame(level);
	 	let sudoku = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		sudokus =  solve(sudoku);
	for(let row =0;row<81;row++){
		if(!arr.includes(row)){
			puzzle[row]=sudokus[row];
		}else{
			puzzle[row]=0;
		}
	}
	return puzzle;

}
function showGame(){
	// arr_puzzle_new = viewtable();
	let arr_puzzle = makePuzzle();
	// console.log(arr_puzzle);
	for(let row =0;row <81;row++){

		var x =document.getElementById(`cell-${row+1}`);
			x.classList.remove('checks');
		x.value ="";
		x.removeAttribute("disabled");

	}
	for(let row=0;row<81;row++){
				var x =document.getElementById(`cell-${row+1}`);
				if( arr_puzzle[row]!=0 &&x!=null && !arr.includes(row)){
					// arr_puzzle[row]= sudokus[row];
					x.setAttribute("disabled","true");
					x.value = arr_puzzle[row];
				}else{
					x.value='';
				}
		}
	// resets();

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function showSolve(){
	arr_puzzle_new = viewtable();
	for(let cell =0;cell<81;cell++){
		let checkvalue =arr_puzzle_new[cell];
			if(checkvalue!=0){
				arr_puzzle_new[cell] =0;
				}
		if(!arr.includes(cell)){
			arr_puzzle_new[cell]=checkvalue;
		}else{
			if(isPossibleNumber(cell,checkvalue,arr_puzzle_new)){
				try{
					arr_puzzle_new[cell]=checkvalue;
					sudokus = solve(arr_puzzle_new).slice();
				}catch(err){
					arr_puzzle_new[cell]=0;
				}
			}else{
				arr_puzzle_new[cell] =0;
				}
		}			
	}
	
	check = false;
	check_stop=false;
	let time =0;
	let curen=-1;
	// arr=makeNewGame(level);
	let input = document.getElementById('sleep');
	time = input.value*1000;

	if(sudokus.length<1){
		alert('Bạn chưa tạo trò chơi...');
		return;
	}else{
		for(let cell=0;cell<81;cell++){
			if(check) {
				return;
			}
			if(check_stop== true){
				curen = cell;
				break;
			}else if(curen>-1){
				cell=curen;
			}
		var x =document.getElementById(`cell-${cell+1}`);
		if(arr.includes(cell)&&x.value!=sudokus[cell]){
			x.classList.remove('checks');
			x.value = sudokus[cell];
			await sleep(time);
			}	
		}
	}
	var tmp = true;
	await sleep(10);
	for(let cell =0;cell<81;cell++){
		var x =document.getElementById(`cell-${cell+1}`);
		if(x.value ==''||x.value==0){
			tmp = false;
		}
	}
		
	if(tmp){
		alert('Done!!');
		var pause = document.getElementById('btn-stop');
		pause.setAttribute('disabled', 'true');
		var slove = document.getElementById('solves');
		slove.setAttribute('disabled','true');

	}
	// console.log(solve(arr_puzzle));
}
function stops(){
	check_stop=true;
}
function continued(){
	showSolve();
}
function checkAll(sudoku){
	for(let cell = 0; cell<81;cell++){
		var x =document.getElementById(`cell-${cell+1}`);
		let checkss = parseInt(x.value);
		if(sudoku[cell]==0||sudoku[cell]==''){
			return false;
		}
	}
	return true;
}
function viewtable(){
	let arr = new Array();
	for(let cell =0;cell<81;cell++){
		let x = document.getElementById(`cell-${cell+1}`);
		if(x.value != ""){
			arr[cell]= parseInt(x.value);
		} else {
			arr[cell] = 0;
		}
	}
	// console.log(arr);
	return arr;
}

async function checks(){
	// console.log(arr_puzzle);
	let flag = true;
	let arr_check = new Array();
	for(let cell =0 ; cell <81;cell++){
		var x =document.getElementById(`cell-${cell+1}`);
		number = x.value;
		x.classList.remove('checks');
		if(number!=''){
					arr_check[cell] = parseInt(number);
				}else{
					arr_check[cell]=0;
				}
	}
	for(let cell =0;cell<81;cell++){
		var x =document.getElementById(`cell-${cell+1}`);
		let checkss = parseInt(x.value);
		if(arr_check[cell]==0){		
				x.classList.add('checks');
		}else if(arr.includes(cell)){
				arr_check[cell]=0;			
				if(!isPossibleNumber(cell,checkss,arr_check)){
					flag=false;
					x.classList.add('checks');
				}else{
					x.classList.remove('checks');

				}
				arr_check[cell]= checkss;
				
		}

	}
	arr_puzzle_new = viewtable();
	await sleep(10);
	var slove = document.getElementById('solves');
	if (checkAll(arr_check)&&flag) {
		await sleep(10);
	alert('Chúc mừng bạn đã giải đúng');	
	}else if(!checkAll(arr_check)){
		
		slove.removeAttribute('disabled');
	}else{
		// slove.setAttribute('disabled','true');
	}
	// console.log(arr_puzzle_new);
}
 function isNumberKey(evt)
 {
 var charCode = (evt.which) ? evt.which : event.keyCode
 if (charCode > 31 && (charCode < 49 || charCode > 57))
 	return false;
 return true;
 }
 function resets(){
 	for(let cell=0;cell<81;cell++){
 		let x = document.getElementById(`cell-${cell+1}`);
 		if(arr.includes(cell)){
 			x.value='';
 			x.classList.remove('checks');
 			// arr_puzzle[cell]=0;
 		}
 	}
 }