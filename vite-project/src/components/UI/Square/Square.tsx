import React, { useState } from 'react'
import "./Square.css"
import Closed from "../../../assets/closed.png";
import one from "../../../assets/one.png"
import two from "../../../assets/two.png"
import three from "../../../assets/three.png"
import four from "../../../assets/four.png"
import five from "../../../assets/five.png"
import six from "../../../assets/six.png"
import seven from "../../../assets/seven.png"
import eight from "../../../assets/eight.png"
//import nine from "../../../assets/nine.png"

type SquareProps = {
    value: string
}

const Square = ({value}: SquareProps) => {

   // const [userClicked, setUserClicked] = useState(false);
    const [image, setImage] = useState(Closed);

    const convertToStr = (numToDisplay: number | undefined) => {
        if(!!numToDisplay) {
       // setUserClicked(true);
        const conversionDict: {[key: number]: string } = {
            1: one,
            2: two,
            3: three,
            4: four,
            5: five,
            6: six,
            7: seven,
            8: eight,
            //9: nine,
        }
        setImage(conversionDict[numToDisplay]);
        //return conversionDict[numToDisplay];
     }
     return Closed;
    }
    // Adjacent, if not bomb and has adjacens bomb: -11, -10, -9, -1, 1, 9, 10, 11
    const checkSquareType = (e: any) => {
        e.preventDefault(); //e.button where left click is 0, e.button where right click is 2
        console.log(e);
        console.log(value);
    }
  return (
    <section onMouseDown={checkSquareType} onContextMenu={(e) => {e.preventDefault()}}>
        <img className='square' src={ image } />
    </section>
  )
}

export default Square