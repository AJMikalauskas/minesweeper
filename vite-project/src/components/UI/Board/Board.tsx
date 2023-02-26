import React, { useEffect, useState } from 'react'
import Square from '../Square/Square'
import "./Board.css"

const Board = () => {
  const [board, setBoard] = useState<JSX.Element[]>();
  var bombSquares: Array<number> = [];

  const selectBombSquares= () => {
    while(bombSquares.length < 10) {
      // rounds up if 0.5 or up, rounds down if below
      var newBombNum = Math.round(Math.random() * 99);
      if(bombSquares.indexOf(newBombNum) === -1) {
        bombSquares.push(newBombNum);
      }
    }
  }

  const createBoard = () => {
    // Change to effectRan only once in useEffect
    console.log(bombSquares,"bmbsquares")
  if(bombSquares.length !== 10) { 
    selectBombSquares();

    var squares: Array<JSX.Element> = [];
    var adjacentSquares = [-11, -10, -9, -1, 1, 9, 10, 11]
    var bombsInAdjacent = 0;
    console.log(bombSquares);
    for (var squareNum = 0; squareNum <= 99; squareNum++) {
      if(bombSquares.indexOf(squareNum) !== -1) {
        squares.push(<Square num={squareNum + 1} key={squareNum} type={"bomb"} />);
      } else {
      // adjacentSquares = [ i-11, i-10, i-9, i-1, i+1, i+9, i+10, i+11 ];
        for(var adjSquareNum = 0; adjSquareNum < adjacentSquares.length; adjSquareNum++) {
          var currAdjNum = squareNum + adjacentSquares[adjSquareNum];
          if(bombSquares.indexOf(currAdjNum) !== -1) {
            console.log("currAdjNum", currAdjNum);
            bombsInAdjacent++;
          }
        }
        // -11, -10, -9, -1, 1, ,9, 10, 11
        if(bombsInAdjacent > 0) {
          squares.push(<Square num={squareNum + 1} key={squareNum} numberOfAdjacentBombs={bombsInAdjacent} type={"normal"} />);
          bombsInAdjacent = 0;
        } else {
          squares.push(<Square num={squareNum + 1} key={squareNum} type={"normal"} />);
        }
      }
    }
    return squares;
 }
    //setBoard(squares);
  }


  useEffect(() => {
    
    if(bombSquares.length != 10) { 
      setBoard(createBoard());
    }
    //selectBombSquares();
    //createBoard();
  },[])

  return (
    <div className='board'>
      {/* { createBoard() } */}
      { board }
    </div>
  )
}

export default Board