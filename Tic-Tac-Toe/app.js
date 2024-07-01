const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status');
const restartButton = document.querySelector('#reset');
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

let options = ["", "", "", "", "", "", "", "", "",];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartButton.addEventListener('click', restart);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("id")

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWin();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWin(){
    let roundWon = false;
    for(let i = 0; i < winConditions.length; i++){
        const winCondition = winConditions[i];
        let a = options[winCondition[0]];
        let b = options[winCondition[1]];
        let c = options[winCondition[2]];

        if(a === "" || b === "" || c === ""){
            continue;
        }

        if(a === b && b === c){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = "Draw!";
        running = false;
    }
    else{
        changePlayer();
    }

}

function restart(){
    currentPlayer = 'X';
    options = ["", "", "", "", "", "", "", "", "",];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}