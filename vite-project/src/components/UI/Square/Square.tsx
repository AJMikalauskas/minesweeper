import React from 'react'
import "./Square.css"
import Closed from "../../../assets/closed.png";

type SquareProps = {
    num: number
    type: string
    numberOfAdjacentBombs?: number
}

const Square = ({num, type, numberOfAdjacentBombs}: SquareProps) => {


    // Adjacent, if not bomb and has adjacens bomb: -11, -10, -9, -1, 1, 9, 10, 11
    const checkSquareType = (e: any) => {
       // e.preventDefault(); e.button where left click is 0, e.button where right click is 2
       // console.log(e);
       console.log("Type",type, "Num", num);
    }
  return (
    <section onMouseDown={checkSquareType} onContextMenu={(e) => {e.preventDefault()}}>
        <img className='square' src={Closed} />
    </section>
  )
}

export default Square