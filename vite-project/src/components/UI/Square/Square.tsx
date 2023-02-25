import React from 'react'
import "./Square.css"
import Closed from "../../../assets/closed.png";

type SquareProps = {
  //  num: number
    type: string
}

const Square = ({type}: SquareProps) => {

    const checkSquareType = () => {
        
    }

  return (
    <img className='square' onClick={checkSquareType} src={Closed} />
  )
}

export default Square