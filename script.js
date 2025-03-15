//Console version to kick off
//Three major objects suggested by Odin Project:
//gameboard, players, gameController

function gameboard() {
    //Tic tac toe has 9 cells for players' input in total
    //3 rows and 3 columns
    const rows = 3;
    const columns = 3;

    //A 3x3 matrix is needed to store players' input
    //A 2D array should be created to serve that purpose
    //e.g.const array2D = [
    // [1, 2, 3],
    // [4, 5, 6],
    // [7, 8, 9]
    // ];
    //Create a 2D array to store players' input/ cells
    const board = [];
    //Set up the board as 2D array
    for (let i=0; i<rows; i++) {
        //3 rows
        board[i] = [];
        for (let j=0; j<columns; j++) {
            //Set values of 3 columns to empty strings as placeholders first
            board[i][j] = " ";
        }
    }

    //Create a method that retrieves the current state of the board property
    //when the method is called, NOT variable
    const getBoard = () => board;

    //Create a method to print board for showing players after each round
    const printBoard = () => {
        console.table(board);
    }

    const getRowNum = () => rows;
    const getColNum = () => columns;

    const resetBoard = (gameBoard) => gameBoard.forEach((row) => row.splice(0,3," "," "," "));

    return {
        getBoard,
        printBoard,
        getRowNum,
        getColNum,
        resetBoard
    };
}

//Create player object
//The purpose of this object is for other methods to recognise which player's turn it is
//then assign a unique value to that player's input
function player() {
    //Create a variable for storing the state of who the active player is
    let activePlayer = "player1";
    //Create two objects with key value pair for assigning unique properties
    //to the two players
    const playersObj = {
        player1:{
            name: "Player 1",
            token:"X"
        },
        player2:{
            name: "Player 2",
            token:"O"
        }
    };
    //Create a method that returns the player's token
    
    function getPlayerToken() {
        //Before returning the player's unique token
        //it is necessary to find out which player's turn it is first
        return activePlayer === "player1"? playersObj.player1.token:playersObj.player2.token;
    }

    //Create a method that changes the state of active player
    //after selectCell is called
    function switchActivePlayer () {
        activePlayer = activePlayer === "player1"? "player2":"player1";
    }

    const getActivePlayer = () => playersObj[activePlayer].name;

    const setPlayerName = (name1, name2) => {
        playersObj.player1.name = name1;
        playersObj.player2.name = name2;
    }

    return {
        getPlayerToken,
        switchActivePlayer,
        getActivePlayer,
        setPlayerName
    }
}

function gameController() {
    //Initialise the gameboard by getting a board from creating the gameboard object
    const board = gameboard();
    //Create a variable which first referenced to the board arr in the gameboard object
    //Note that this gameBoard arr variable is only a reference to the board arr within the gameboard object scope
    //which meanings modifying gameBoard will also change the board arr in the gameboard object environment
    const gameBoard = board.getBoard();
    const boardRows = board.getRowNum();
    const boardCols = board.getColNum();
    //Winning condition is 3 in a row
    const winCon = 3;
    //Make reference to the players object
    const players = player();
    //Create a variable to keep track of the winner
    let winner = "";

    //Start off by showing the initial board
    const init = () => {
        board.printBoard();
    };
    init();

    //Create a method that replace a certain cell with player's unique token (X/O)
    //when the user chooses that cell
    const selectCell = (row, column, token) => {
        //Insert player's input by changing the value of the board
        gameBoard[row][column] = token;
    };

    //Create a method to play round
    function playRound(row, column, token = players.getPlayerToken()) {
        //Implementation logic should be:
        //1. Active player (Player1 by default) select cell
        //2. Check if move is valid - if valid, update board; otherwise no changes to board
        //3. Update board
        //4. Switch active player to the other player
        //5. Repeat steps 2-4 unless winner condition is reached
        if (gameBoard[row][column] === " ") {
            selectCell(row, column, token);
            board.printBoard();
            //check winner condition with the active player's token before switching player
            checkWin(token);           
            checkTie(); 
            players.switchActivePlayer();
        }
        else {
            console.log("Invalid move. Please try again.");
            board.printBoard();
        }
    }

    const checkRow = (token) => {
        for (let i =0; i < boardRows; i++) {
            const filteredRow = gameBoard[i].filter((entry) => entry === token);
            if (filteredRow.length === winCon) {
                return true;
            }
        }
    }
    const checkCol = (token) => {
        for (let i=0; i < boardCols; i++) {
            let tokenCounter = 0;
            for (let j=0; j < boardRows; j++) {
                gameBoard[j][i] === token? tokenCounter++:tokenCounter+0;
            }
            if (tokenCounter === winCon) {
                return true;
            }
        }
    }
    const checkDia = (token) => {
        //Player can winner from diagonal if they have token in the center cell
        //then two cases to winner from diagonal
        if (gameBoard[1][1] === token) {
            if ((gameBoard[0][0] === token && gameBoard[2][2] === token) ||
                (gameBoard[0][2] === token && gameBoard[2][0] === token)) {
                return true;
            }
        }
    }
    //Create a method for checking if winning condition has been met after a player's move
    //so it should focus on checking if that specific token has reached 3 in a row/column/diagonal
    function checkWin (token) {
        //check row     
        //check column
        //check diagonal
        if (checkRow(token) === true || checkCol(token) === true || checkDia(token) === true) {
            winner = players.getActivePlayer();
            console.log(`${winner} won!`);
        }        
    }

    //Create a method for checking ties
    function checkTie () {
        const flatArr = gameBoard.flat();
        if (!flatArr.includes(" ")) {
            winner = "tie";
            console.log("It's a tie!");
        }
    }

    const getBoard = () => gameBoard; 

    const getWinner = () => winner;

    const reset = () => {
        board.resetBoard(gameBoard);
        winner = "";
    }

    return {
        playRound,
        getBoard,
        setPlayerName: players.setPlayerName,
        getActivePlayer: players.getActivePlayer,
        getWinner,
        reset
    }
}

function displayHandler() {
    const game = gameController();
    //Create reference to existing DOM elements in html
    const announcer = document.querySelector(".announcer");
    const boardDiv = document.querySelector(".gameboard");
    //Create reference to start button
    const restartButton = document.querySelector("#start");

    //Asking for players' name using dialog before the game
    const dialog = document.querySelector("dialog");
    //Start game by showing the dialog
    function startGame() {
            if (confirm("Do you want to start a new game?") == true) {
                game.reset();
                updateDisplay();
                dialog.showModal();
            }
        }
    restartButton.addEventListener("click", startGame);

    function dialogHandler(e) {
        const dialogButton = e.target;
        if (dialogButton.id === "submit") {
            const name1 = document.querySelector("#name1").value;
            const name2 = document.querySelector("#name2").value;
            game.setPlayerName(name1, name2);
        }
        else if (dialogButton.id === "close") {
            const name1 = document.querySelector("#name1").value;
            const name2 = document.querySelector("#name2").value;
            game.setPlayerName(name1, name2);
        }
    }
    dialog.addEventListener("click", dialogHandler);

    //1. Initially, show the board with 9 buttons without tokens
    //2. When a player press on a button, change the content of that button to that player's token
    //which requires refreshing and updating the board's content
    function updateDisplay() {
        const gameBoard = game.getBoard();
        //Reset before every new move is displayed to refresh
        boardDiv.textContent = "";
        announcer.textContent = "";
        gameBoard.forEach((row, rowIndex) => {
            row.forEach((entry, colIndex) => {
                const tokenButton = document.createElement("button");
                //Add class for styling
                tokenButton.classList.add("cell");
                tokenButton.dataset.row = rowIndex;
                tokenButton.dataset.col = colIndex;
                tokenButton.textContent = entry;
                boardDiv.appendChild(tokenButton);
            })
        })

        const results = document.createElement("p");
        if (game.getWinner() === "tie") {
            announcer.textContent = "It's a tie!";
        }
        else if (game.getWinner() !== "" ) {
            announcer.textContent = `${game.getWinner()} won!`;
            appendChild(results);
        }
        else {
            announcer.textContent = `${game.getActivePlayer()}'s turn.`;
        }
    }

    //Create a method to handle clicks on buttons
    function clickHandler(e) {
        const boardButton = e.target;
        //Check if player is clicking on an empty cell
        if (boardButton.className === "cell" && boardButton.textContent === " "
            && game.getWinner() === "") { 
                const rowIndex = boardButton.dataset.row;
                const colIndex = boardButton.dataset.col;
                game.playRound(rowIndex, colIndex);
                updateDisplay();
            }
    }
    boardDiv.addEventListener("click", clickHandler);

}

const game = displayHandler();

//trial to fix bug that announces winner even when there's no 3 consecutive tokens
// game.playRound(0,0)
// game.playRound(1,1)
// game.playRound(1,0)
// game.playRound(2,0)
// game.playRound(2,2)
// console.log(game.getActivePlayer())
// game.playRound(2,1)
