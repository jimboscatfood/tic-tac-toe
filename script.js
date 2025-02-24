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

    return {
        getBoard,
        printBoard
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
    const players = {
        player1:{
            token:"X"
        },
        player2:{
            token:"O"
        }
    };
    //Create a method that returns the player's token
    
    function playerToken() {
        //Before returning the player's unique token
        //it is necessary to find out which player's turn it is first
        return activePlayer === "player1"? players.player1.token:players.player2.token;
    }

    //Create a method that changes the state of active player
    //after selectCell is called
    function switchActivePlayer () {
        activePlayer = activePlayer === "player1"? "player2":"player1";
    }

    return {
        playerToken,
        switchActivePlayer
    }
}

function gameController() {
    //Initialise the gameboard by retrieving the latest board
    //gameboard() should have the latest state of board
    const board = gameboard();
    const currentBoard = board.getBoard();
    //Make reference to the players object
    const players = player();
    //Start off by showing the initial board
    const init = () => {
        board.printBoard();
    };
    init();

    //Create a method that replace a certain cell with player's unique token (X/O)
    //when the user chooses that cell
    const selectCell = (row, column) => {
        //Insert player's input by changing the value of the board
        currentBoard[row][column] = players.playerToken();
    }
    //Create a method to play round
    function playRound(row, column) {
        //Implementation logic should be:
        //1. Active player (Player1 by default) select cell
        //2. Check if move is valid - if valid, update board; otherwise no changes to board
        //3. Update board
        //4. Switch active player to the other player
        //5. Repeat steps 2-4 unless win condition is reached
        if (currentBoard[row][column] === " ") {
            selectCell(row, column);
            players.switchActivePlayer();
            board.printBoard();
        }
        else {
            console.log("Invalid move. Please try again.");
            board.printBoard();
        }
    }
    
    return {
        playRound        
    }
}

const game = gameController();