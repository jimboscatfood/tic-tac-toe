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

    //Create a function that retrieves the current state of the board property
    //when the method is called, NOT variable
    const getBoard = () => board;

    return {
        board,
        getBoard
    };
}

//Create player object
//The purpose of this object is for other methods to recognise which player's turn it is
//then assign a unique value to that player's input
function player() {
    
}
