	 let sudokus = new Array();
	 let test ='';
	 var check;
	 var check_stop;

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
let rate_value;
if (document.getElementById('customRadio1').checked) {
  rate_value = document.getElementById('customRadio1').value;
}else if (document.getElementById('customRadio2').checked) {
  rate_value = document.getElementById('customRadio2').value;
} else if (document.getElementById('customRadio3').checked) {
  rate_value = document.getElementById('customRadio3').value;
}	
let level= rate_value;
let arr=makeNewGame(level);
function showGame(){
		check = true;

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

	for(let row =0;row <81;row++){
		var x =document.getElementById(`cell-${row+1}`);
		x.value ="";
		x.removeAttribute("disabled");

	}
	for(let row=0;row<81;row++){
				var x =document.getElementById(`cell-${row+1}`);
				if( sudokus[row]!=0 &&x!=null && !arr.includes(row)){
					x.setAttribute("disabled","true");
					x.value = sudokus[row];
				}
		}
	for(let row =0;row<81;row++){
		var x = document.getElementById(`cell-${row+1}`);
		// if(arr.includes(row)){
			x.classList.remove('checks');
		// }
	}
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function showSolve(){
	check = false;
	check_stop=false;
	let time =0;
	// arr=makeNewGame(level);
	let input = document.getElementById('sleep');
	time = input.value*1000;
	if(sudokus.length<1){
		alert('Bạn chưa tạo trò chơi...');
	}else{
		for(let cell=0;cell<81;cell++){
			if(check) {
				return;
			}
			if(check_stop== true){
				await sleep(100000000);
			}else{
				await sleep(0);
			}
		var x =document.getElementById(`cell-${cell+1}`);
		if(arr.includes(cell)&&x.value==''){
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
	// checks();

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
async function checks(){
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
				let test = document.getElementById(`cell-${cell+1}`);				
				if(!isPossibleNumber(cell,checkss,arr_check)){
					flag=false;
					test.classList.add('checks');
				}else{
					test.classList.remove('checks');
				}
				arr_check[cell]= checkss;
		}
	}
	await sleep(10);
	// console.log(checkAll(arr_check));
	// console.log(arr_check);
	var slove = document.getElementById('solves');
	if (checkAll(arr_check)&&flag) {
		await sleep(10);
	alert('Chúc mừng bạn đã giải đúng');
	}else if(!checkAll(arr_check)){
		
		slove.removeAttribute('disabled');
	}else{
		slove.setAttribute('disabled','true');
	}
}
 function isNumberKey(evt)
 {
 var charCode = (evt.which) ? evt.which : event.keyCode
 if (charCode > 31 && (charCode < 49 || charCode > 57))
 	return false;
 return true;
 }