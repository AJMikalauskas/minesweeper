import React, { useEffect, useState } from 'react'
import Square from '../Square/Square'
import "./Board.css"
import Closed from "../../../assets/closed.png";
import Open from "../../../assets/open.png";
import one from "../../../assets/one.png"
import two from "../../../assets/two.png"
import three from "../../../assets/three.png"
import four from "../../../assets/four.png"
import five from "../../../assets/five.png"
import six from "../../../assets/six.png"
import seven from "../../../assets/seven.png"
import eight from "../../../assets/eight.png"
import flag from "../../../assets/flagged_bomb.png"
import revealedBomb from "../../../assets/revealed_bomb.png"
import explodedBomb from "../../../assets/exploded_bomb.png"

interface CellInfo {
  value: string
  coord: Array<number>
  isRevealed: boolean
  image: string
}

const Board = () => {
  //const [board, setBoard] = useState<Array<Array<JSX.Element>>>();
  const [board, setBoard] = useState<Array<JSX.Element>>();
  const [loseCondition, setLoseCondition] = useState<boolean>(false);
  const [winCondition, setWinCondition] = useState<boolean>(false);
  // Cast number values using number()
  var boardMtrx: Array<Array<string>> = [];
  var boardMtrxInfo: Array<Array<CellInfo>> = [];
  //var bombSquareCoords: Array<Array<number>> = [];
  var squares: Array<Array<JSX.Element>> = [];
  var bombSquaresPlaced = 0;
  // Could be removed but only a minor storage cost of O(n), may be dupes
  var bombSquares: Array<number> = [];
  var bombSquareCoords: Array<Array<number>> = [];
  var rows: JSX.Element[] = [];
  

  const addNumsAroundBomb = (coords: Array<number>) => {
    console.log(coords);
    // Probably some way to optimize
    for(var adjRowNum = -1; adjRowNum < 2; adjRowNum++) {
      console.log("adjRowNum",adjRowNum)
      if(coords[0] + adjRowNum < 10 && coords[0] + adjRowNum > -1) {
        for(var adjColNum = -1; adjColNum < 2; adjColNum++) {
          if(coords[1] + adjColNum < 10 && coords[1] + adjColNum > -1) {
          
            var curCoords = boardMtrx[coords[0] + adjRowNum][coords[1] + adjColNum];
            //console.log(curCoords);
          
            if(curCoords !== "bomb") {
              
              //console.log("Passed if checks, adding to curCoords", curCoords)
              boardMtrx[coords[0] + adjRowNum][coords[1] + adjColNum] = 
              (Number(curCoords) + 1).toString();
              
              boardMtrxInfo[coords[0] + adjRowNum][coords[1] + adjColNum].value =  
              (Number(curCoords) + 1).toString();
              
              console.log("curCoords image test", curCoords, coords);
              boardMtrxInfo[coords[0] + adjRowNum][coords[1] + adjColNum].image =  
              numToImg((Number(curCoords) + 1).toString());
            }
          }
        }
      }
    } 
  }

  const convertToMtrxCoord = (bombNumToConvert: number) => {
    console.log("Bomb num to convert checking for negatives", bombNumToConvert);
    // % 10 will find remainder from 10's digit 
    let xCoord = (bombNumToConvert % 10);
    
    // Subtract ones digit and divide by ten to find on mtrx
    let yCoord = (bombNumToConvert - xCoord) / 10;

    // Set coordinate to bomb
    console.log("Coordinates","yCoord", yCoord, "xCoord", xCoord);
    bombSquareCoords.push([yCoord, xCoord]);
    boardMtrx[yCoord][xCoord] = "bomb" 
    boardMtrxInfo[yCoord][xCoord].value = "bomb"; 
    boardMtrxInfo[yCoord][xCoord].image = revealedBomb; 
    addNumsAroundBomb([yCoord, xCoord]);
    //return [yCoord, xCoord]
  }

  const selectBombSquares = () => {
    // Convert to for loop? No, may be dupes
    while(bombSquaresPlaced < 10) {
      // rounds up if 0.5 or up, rounds down if below
      var newBombNum = Math.round(Math.random() * 99);
      //bombSquareCoords.push(coordsOfBomb);
      if(bombSquares.indexOf(newBombNum) === -1) {
        bombSquares.push(newBombNum);
        convertToMtrxCoord(newBombNum);
        bombSquaresPlaced++;
      }
    }
   // console.log("Completed actions, all bombs added", bombSquareCoords);
    console.log("Coord Table Results");
    console.table(boardMtrx);
  }

  const createBoard = () => {
    bombSquaresPlaced = 0;
    setLoseCondition(false);
    setWinCondition(false);
  // Change to effectRan only once in useEffect
  // console.log(bombSquareCoords,"bmbsquares")
  if(bombSquaresPlaced !== 10) { 

    // Predefine values so that we can run checks for adjacentBombSquares 
    for(let rowNum = 0; rowNum < 10; rowNum++) {
      boardMtrx[rowNum] = [];
      boardMtrxInfo[rowNum] = [];
      for(let colNum = 0; colNum < 10; colNum++) {
        boardMtrx[rowNum][colNum] = '0';
        boardMtrxInfo[rowNum][colNum] = {
          value: '0',
          coord: [rowNum, colNum],
          isRevealed: false, 
          image: numToImg('0')
        };
      }
    }

    console.table(boardMtrx);
    console.table(boardMtrxInfo);
    selectBombSquares();

    console.table(boardMtrx);
    console.table(boardMtrxInfo)

    setNewBoard();
    }
  }

  const handleClick = (e:any, curCoords: Array<number>, curValue: string, image: string) => {
    // Remove context menu on right click?
    // Remove image param, not needed/used?
    console.log("Event Param passed in in handleClick method", e);
    console.log("E button pressed", e.button);
    switch (e.button) {
      case 0:
        if (image !== flag) {
          switch(curValue) {
            case "bomb":
              console.log("Bomb Clicked Case");
              revealBombsLosingGame();
              break;
            case "0":
              console.log("0 Clicked Case");
              // boardMtrxInfo[curCoords[0]][curCoords[1]].image = Open; 
              boardMtrxInfo[curCoords[0]][curCoords[1]].isRevealed = true;
              const visited: Array<string> = [];
              let curPosition = `${curCoords[0]}${curCoords[1]}`;
              findBoundaries(curCoords, curValue);
              console.table(boardMtrxInfo);
              setNewBoard();
              // Default case will be if just a number? 
            default:
              //boardMtrxInfo[curCoords[0]][curCoords[1]].image = numToImg(boardMtrxInfo[curCoords[0]][curCoords[1]].value); 
              boardMtrxInfo[curCoords[0]][curCoords[1]].isRevealed = true;
              setNewBoard();
              break;
          }
        }
        break;
      case 2:
        console.log("Right Click Pressed", e.button, image);
        if (image === flag) {
          boardMtrxInfo[curCoords[0]][curCoords[1]].image = numToImg(boardMtrxInfo[curCoords[0]][curCoords[1]].value);
          boardMtrxInfo[curCoords[0]][curCoords[1]].isRevealed = false;
          setNewBoard();
        } else if (image === Closed || !boardMtrxInfo[curCoords[0]][curCoords[1]].isRevealed) {
          console.log("Closed Image Clicked", image);
          boardMtrxInfo[curCoords[0]][curCoords[1]].isRevealed = true;
          boardMtrxInfo[curCoords[0]][curCoords[1]].image = flag;
          setNewBoard();
        }
        break;
      default:
        break;
    }
  }
  const numToImg = (numStr: string) => {
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
    if(numStr === "0") {
        return Open; 
    } else if(Number(numStr) > 0) {
        return conversionDict[Number(numStr)];
    } else {
        return explodedBomb;
    }
  }

  const visited: string[] = [];
  const findBoundaries = (curCoords: Array<number>, curValue: string) => {
    // console.log()
    
    
    // Need to also consider cases where we hit a number
    // Go up first
    if(curCoords[0] > 0 && visited.indexOf(`${curCoords[0] - 1}${curCoords[1]}`) === -1) {
      if(Number(boardMtrxInfo[curCoords[0] - 1][curCoords[1]].value) > 0) {
        boardMtrxInfo[curCoords[0] - 1][curCoords[1]].isRevealed = true;  
      } 
      else {
        visited.push(`${curCoords[0]}${curCoords[1]}`)
        findBoundaries([curCoords[0] - 1, curCoords[1]],boardMtrxInfo[curCoords[0]][curCoords[1]].value);
      }
    }
    
    // Go right next --> && curValue <= 0
    if(curCoords[1] < 9 && visited.indexOf(`${curCoords[0]}${curCoords[1] + 1}`) === -1) {
      if(Number(boardMtrxInfo[curCoords[0]][curCoords[1] + 1].value) > 0) {
        boardMtrxInfo[curCoords[0]][curCoords[1] + 1].isRevealed = true;  
      } 
      else {
        visited.push(`${curCoords[0]}${curCoords[1]}`)
        findBoundaries([curCoords[0], curCoords[1] + 1],boardMtrxInfo[curCoords[0]][curCoords[1]].value);
      }
    }
    
    // Go down next
    if(curCoords[0] < 9 && visited.indexOf(`${curCoords[0] + 1}${curCoords[1]}`) === -1) {
      if(Number(boardMtrxInfo[curCoords[0] + 1][curCoords[1]].value) > 0) {
        boardMtrxInfo[curCoords[0] + 1][curCoords[1]].isRevealed = true;  
      } 
      else {
        visited.push(`${curCoords[0]}${curCoords[1]}`)
        findBoundaries([curCoords[0] + 1, curCoords[1]],boardMtrxInfo[curCoords[0]][curCoords[1]].value);
      }
    }
    
    // Go left next
    if(curCoords[1] > 0 && visited.indexOf(`${curCoords[0]}${curCoords[1] - 1}`) === -1) {
      if(Number(boardMtrxInfo[curCoords[0]][curCoords[1] - 1].value) > 0) {
        boardMtrxInfo[curCoords[0]][curCoords[1] - 1].isRevealed = true;  
      } 
      else {
        visited.push(`${curCoords[0]}${curCoords[1]}`)
        findBoundaries([curCoords[0], curCoords[1] - 1],boardMtrxInfo[curCoords[0]][curCoords[1]].value);
      }
    }

    boardMtrxInfo[curCoords[0]][curCoords[1]].isRevealed = true;  
  }

  const setNewBoard = () => {
    let allRevealed = true; 

    const newBoard = [];
    for(let rowNum = 0; rowNum < 10; rowNum++) {
        const newRow = boardMtrxInfo[rowNum].map((data) => {
          if(!data.isRevealed) allRevealed = false
          return (
            <td  key={`${data.coord[0]}, ${data.coord[1]}`}>
                <section onContextMenu={(e) => e.preventDefault()} onMouseDown={(e) => {handleClick(e, data.coord,
                data.value, data.image)}}>
                      <img src={ data.isRevealed ? data.image : Closed } className="square"/>
                </section>
            </td>
          )
        });
        newBoard.push(<tr key={rowNum}>{newRow}</tr>)
      }
    console.log("New Board about to be set",newBoard);
    //console.table(newBoard);
    if(allRevealed) {
      setWinCondition(true);
    }
    setBoard(newBoard);
  }

  const revealBombsLosingGame = () => {
    // console.log(bombSquareCoords);
    // setLoseCondition(true);
    for(let i = 0; i < bombSquareCoords.length; i++) {
      boardMtrxInfo[bombSquareCoords[i][0]][bombSquareCoords[i][1]].isRevealed = true;
      boardMtrxInfo[bombSquareCoords[i][0]][bombSquareCoords[i][1]].image = explodedBomb;
    }
    setLoseCondition(true);
    setNewBoard();
  }

  return (
    <div>
      { !board && <button onClick={() => {createBoard()}}>Create Board</button>}
      <table className='board'>
        <tbody>
          { board }
        </tbody>
      </table> 
    {
      loseCondition ? 
      <div>
      Thanks for playing! Sorry You Lost my 10x10 Minesweeper Game! 
    </div>  
    :
      winCondition ?
      <div>
      Thanks for playing! You've Won my 10x10 Minesweeper Game!
    </div>  
    :
    <></>
    }
      { (loseCondition || winCondition) && <button onClick={() => {createBoard()}}>Restart Game</button>}
    </div>
  )
}

export default Board