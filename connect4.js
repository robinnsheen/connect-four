"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  /**
   * create a matrix, with y(rows), x(columns).
   * y # of subarray (for loop to add [subarray])
   * x elements in the subarray (add in with for loop)
   *
   */
  for (let i=0; i < HEIGHT; i++) {
    let row = [];
    for (let j=0; j < WIDTH; j++) {
      row.push(null);
    }
    board.push(row);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");
  // TODO: add comment for this code
  // creating interactive row and adding event listener

  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // TODO: add comment for this code
  // creating cell for player UI top row
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // TODO: Create a table row element and assign to a "row" variable
    const row = document.createElement('tr');
    for (let x = 0; x < WIDTH; x++) {
      // TODO: Create a table cell element and assign to a "cell" variable
      const cell = document.createElement("td");
      // TODO: add an id, y-x, to the above table cell element
      // you'll use this later, so make sure you use y-x
      cell.setAttribute("id", `${y}-${x}`);
      // TODO: append the table cell to the table row
      row.append(cell);
    }
    // TODO: append the row to the html board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 5
  // get x from click (input)
  // return highest y value
  // reverse loop (start at 5, all the way up to 1)

  for (let i=HEIGHT-1; i>=0; i--) {
    if (board[i][x] === null) {
      return i;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  // make a div inside correct td cell of html game board
  // make element, assign class p1/p2,
  // put into correct cell using id (y,x)
  const piece = document.createElement("div");
  piece.setAttribute("class", "piece");
  piece.classList.add(`p${currPlayer}`);
  console.log("piece: ", piece);
  //get the correct cell, using getElementID
  //append child to correct cell.
  const cell = document.getElementById(`${y}-${x}`);
  console.log("cell: ", cell);
  cell.appendChild(piece);

}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return ;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  //is entire board filled
  // for loop through the board, of row
  // row.every

  for (let row of board) {
    console.log("is filled: ", row.every(cell => cell !== null));
  }

  currPlayer = (currPlayer === 1) ? 2 : 1;
  console.log("next player:", currPlayer);

  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {
    console.log("_win", "cells", cells);

    // TODO: Check four cells to see if they're all legal & all color (p1/p2) of current
    // player
    // check array of array, if all same player, a win
    // store which player is the first cell
    // if following cells are different player, not a win
    // otherwise keep looping
    // cells at 0 check value at board
    // we need value of cells at x y, check board values of x y
    let winnerX = cells[0][1];
    let winnerY = cells[0][0];
    // make loop to generate diff coordinates
    let winner = board[winnerY][winnerX];
    console.log("winner: ", winner);
    if (winner === null){
      return false;
    }

    // looping through cells
      for (let i = 1; i < cells.length; i++){
        // if value of the board found at cells[i] coordinates
        let x = cells[i][1];
        let y = cells[i][0];
        if ( y >= HEIGHT || y<0 || x >= WIDTH || x<0 ) {
          return false;
        }
        console.log("board cell: ", board[y][x]);
        console.log("loop x:", x);
        console.log("loop y:", y);
        if (board[y][x] !== winner) {
          return false;
        }
      }


    return true;
  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
