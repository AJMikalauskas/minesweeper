import React, { useEffect, useState } from 'react'
import Square from '../Square/Square'
import "./Board.css"

const Board = () => {

  const selectBombSquares

  const createBoard = () => {
    var squares = [];
    for (var i = 0; i <= 99; i++) {
      squares.push(<Square num={i} key={i} type={} />);
    }
  }

  useEffect(() => {
    selectBombSquares();
    createBoard();
  })

  return (
    <div className='board'>
    { squares }
    </div>
  )
}

export default Board