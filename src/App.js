import React, { useState } from "react";

function Square({ value, onSquareClick }) {
  // <-- add parameters to Square function to be able to call them in Board function lines

  return (
    // adding parameters here will allow me to
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function winCondition(board) { // 1dim array
  //check row 
  for (let i = 0; i < 9; i += 3) {
    if (board[i] !== null && board[i] === board[i+1] && board[i+2] === board[i+1]) {
      return board[i];
    }
  }

  //check column
  for (let i = 0; i < 3; i++) {
    if (board[i] !== null && board[i] === board[i+3] && board[i+6] === board[i+3]) {
      return board[i];
    }
  }

  //check diagonal
  if (board[0] !== null && board[0] === board[4] && board[8] === board[4]) {
    return board[0];
  }


  if (board[2] !== null && board[2] === board[4] && board[6] === board[4]) {
    return board[2];
  }

  return false;
}


export default function Board() {
  // main component

  const [xIsNext, setXIsNext] = useState(true); // this will set the state of the game to true
  const [winner, setWinner] = useState(null);
  const [square, setSquare] = useState([...Array(9)].fill(null)); // creates an array of 9 null values and stores them in a useState hook -
  console.log(winner, xIsNext);
  const status = winner ? `Winner is ${winner}` :`Next player: ${xIsNext ? "X" : "O"}`; // DERIVED STATE
  // this is placed here so that the state is not reset when the Square component is rendered
  function handleClick(i) {
    if (square[i]) {
      return;
    }

    // adding i to the fnc will allow the function to be called a limited amount of times ( when the user clicks)
    const newSquare = square.slice(); //slice() method returns the selected elements in an array, as a NEW array object.
    if(xIsNext) {
      newSquare[i] = "X";
    } else {
      newSquare[i] = "O";
    }
     // the below code was modified to determine which parameter will be handled on click
    // newSquare[i] = "X"; // this will change the value of the square[i] to X
    setSquare(newSquare); // this will set the new value of the square to the newSquare variable
    const winner = winCondition(newSquare);
    if (winner) {
      setWinner(winner);
    }
    setXIsNext(!xIsNext); // this will set the state of the game to false
  }

  // <Square value={square[0]} onClick={() => handleClick(0)}/> - this will call the handleClick function and pass the value of i to it


  
  return (
    <React.Fragment>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={square[0]} onSquareClick={() => handleClick(0)} />
        <Square value={square[1]} onSquareClick={() => handleClick(1)} />
        <Square value={square[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={square[3]} onSquareClick={() => handleClick(3)} />
        <Square value={square[4]} onSquareClick={() => handleClick(4)} />
        <Square value={square[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={square[6]} onSquareClick={() => handleClick(6)} />
        <Square value={square[7]} onSquareClick={() => handleClick(7)} />
        <Square value={square[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </React.Fragment>
  );
}