import React from 'react'
import "./Square.css"

type SquareProps = {
    num: number
    type: string
}

const Square = ({num, type}: SquareProps) => {

    const checkSquareType = () => {

    }

  return (
    <button className='square' onClick={checkSquareType}>{num}</button>
  )
}

export default Square