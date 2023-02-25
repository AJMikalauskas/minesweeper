import React, { useEffect, useState } from 'react'
import Square from '../Square/Square'
import "./Board.css"

const Board = () => {
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
    selectBombSquares();

    var squares: Array<JSX.Element> = [];
    for (var i = 0; i <= 99; i++) {
      if(bombSquares.indexOf(i) !== -1) {
        squares.push(<Square num={i} key={i} type={"bomb"} />);
      } else {
        squares.push(<Square num={i} key={i} type={"normal"} />);
      }
    }
    return squares;
  }

  useEffect(() => {
    //selectBombSquares();
    //createBoard();
  })

  return (
    <div className='board'>
    { createBoard() }
    </div>
  )
}

export default Board