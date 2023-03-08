import React, { useEffect, useState } from 'react'
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
import revealedBomb from "../../../assets/revealed_bomb.png"
import open from "../../../assets/open.png"
import flag from "../../../assets/flagged_bomb.png"

type SquareProps = {
    value: string
    coord: Array<number>
    onClick: (arg: Array<number>, arg2: string) => void
    isRevealed: boolean
}

const Square = ({value, coord, onClick, isRevealed}: SquareProps) => {
    const getRevealedImg = () => {
        const conversionDict: {[key: number]: string } = {
            1: one,
            2: two,
            3: three,
            4: four,
            5: five,
            6: six,
            7: seven,
            8: eight
        }

        // console.log("converstionDict: ",conversionDict[Number(value)]);
        
        if(value === "0") {
            return open; 
        } else if(Number(value) > 0) {
            return conversionDict[Number(value)];
        } else {
            return revealedBomb;
        }

     }

    const [imgRevealed, setImgRevealed] = useState(false); 
    const [image, setImage] = useState(Closed);

    // Adjacent, if not bomb and has adjacents bomb: -11, -10, -9, -1, 1, 9, 10, 11
    const checkSquareType = (e: any) => {
        e.preventDefault(); //e.button where left click is 0, e.button where right click is 2

        if(e.button === 2) {
            if(image === flag) {
                setImage(Closed);
            } else if(image === Closed) {
                setImage(flag);
            }
        } else if(e.button === 0 && image !== flag) {
            // this only handles if check click on a blank but sometimes they can click on a number and display 
            // remainder based on at least # of flags equals the value, definitely a v2 function
            setImgRevealed(true);
            console.log(value);
            onClick(coord, value);
        } 
    }

    const getCurrentImg = () => {
        if(isRevealed) {
            setImage(one);
        }
    }

    useEffect(() => {
        getCurrentImg();
        console.log("Image in useEffect set", isRevealed);
        // if(isRevealed)
        // {
        //     console.log("Image is revealed from useEffect")
        //     setImgRevealed(true);
        //    // setImage(getRevealedImg);       
        // }
    }, [isRevealed])
  return (
    <section onMouseDown={checkSquareType} onContextMenu={(e) => {e.preventDefault()}}>
        {/* { imgRevealed ? <img className='square' src={ getRevealedImg() }/>
         :<img className='square' src={ image } />
        } */}
        <img  className="square" src={image} />
    </section>
  )
}

export default Square