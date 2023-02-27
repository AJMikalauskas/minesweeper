import React, { useEffect, useState } from 'react'
import Square from '../Square/Square'
import "./Board.css"

const Board = () => {
  const [board, setBoard] = useState<JSX.Element[]>();
  // Cast number values using number()
  var boardMtrx: Array<Array<string>> = [];
  var bombSquareCoords: Array<Array<number>> = [];
  var bombSquaresPlaced = 0;
  // Could be removed but only a minor storage cost of O(n), may be dupes
  var bombSquares: Array<number> = [];

  const addNumsAroundBomb = (coords: Array<number>) => {
    console.log(coords);
    // Probably some way to optimize
    for(var adjRowNum = -1; adjRowNum < 2; adjRowNum++) {
      if(coords[0] + adjRowNum < 10 && coords[0] + adjRowNum > -1) {
        for(var adjColNum = -1; adjColNum < 2; adjColNum++) {
          if(coords[1] + adjColNum < 10 && coords[1] + adjColNum > -1) {
          
            var curCoords = boardMtrx[coords[0] + adjRowNum][coords[1] + adjColNum];
            //console.log(curCoords);
          
            if(curCoords !== "bomb") {
              //console.log("Passed if checks, adding to curCoords", curCoords)
              boardMtrx[coords[0] + adjRowNum][coords[1] + adjColNum] = 
              (Number(curCoords) + 1).toString();
            }
          }
        }
      }
    } 
  }

  const convertToMtrxCoord = (bombNumToConvert: number) => {
    console.log("Bomb num to convert checkoing for negatives", bombNumToConvert);
    // % 10 will find remainder from 10's digit 
    let xCoord = (bombNumToConvert % 10);
    
    // Subtract ones digit and divide by ten to find on mtrx
    let yCoord = (bombNumToConvert - xCoord) / 10;

    // Set coordinate to bomb
    console.log("Coordinates","yCoord", yCoord, "xCoord", xCoord);
    boardMtrx[yCoord][xCoord] = "bomb" 
    addNumsAroundBomb([yCoord, xCoord]);
    return [yCoord, xCoord]
  }

  const selectBombSquares = () => {
    // Convert to for loop? No, may be dupes
    while(bombSquaresPlaced < 10) {
      // rounds up if 0.5 or up, rounds down if below
      var newBombNum = Math.round(Math.random() * 99);
      bombSquares.push(newBombNum);
      var coordsOfBomb: Array<number> = convertToMtrxCoord(newBombNum);
      bombSquareCoords.push(coordsOfBomb);
     // if(bombSquares.indexOf(newBombNum) === -1 && boardMtrx[coordsOfBomb[0]][coordsOfBomb[1]] == "bomb" ) {
        bombSquaresPlaced++;
      //}
    }
    console.log("Completed actions, all bombs added", bombSquareCoords);
    console.log("Coord Table Results");
    console.table(boardMtrx);
  }

  const createBoard = () => {
  // Change to effectRan only once in useEffect
  // console.log(bombSquareCoords,"bmbsquares")
  if(bombSquaresPlaced !== 10) { 

    // Predefine values so that we can run checks for adjacentBombSquares 
    for(let rowNum = 0; rowNum < 10; rowNum++) {
      boardMtrx[rowNum] = [];
      for(let colNum = 0; colNum < 10; colNum++) {
        boardMtrx[rowNum][colNum] = '0';
      }
    }

    console.table(boardMtrx);
    selectBombSquares();

    var squares: Array<JSX.Element> = [];
    console.table(boardMtrx);

    for(let rowNum = 0; rowNum < 10; rowNum++) {
      for(let colNum = 0; colNum < 10; colNum++) {
        squares.push(<Square value={boardMtrx[rowNum][colNum]} key={`${rowNum}:${colNum}`} />)
      }
    }
    setBoard(squares);


   // for (var squareNum = 0; squareNum <= 99; squareNum++) {
      // if( bombSquareCoords.indexOf(squareNum) !== -1) {
      //   squares.push(<Square num={squareNum + 1} key={squareNum} type={"bomb"} />);
      // } else {
      // // adjacentSquares = [ i-11, i-10, i-9, i-1, i+1, i+9, i+10, i+11 ];
      //   for(var adjSquareNum = 0; adjSquareNum < adjacentSquares.length; adjSquareNum++) {
      //     var currAdjNum = squareNum + adjacentSquares[adjSquareNum];
      //     // if(bombSquareCoords.indexOf(currAdjNum) !== -1) {
      //     //   console.log("currAdjNum", currAdjNum);
      //     //   bombsInAdjacent++;
      //     // }
      //   }
      //   // -11, -10, -9, -1, 1, ,9, 10, 11
      //   if(bombsInAdjacent > 0) {
      //     squares.push(<Square num={squareNum + 1} key={squareNum} numberOfAdjacentBombs={bombsInAdjacent} type={"normal"} />);
      //     bombsInAdjacent = 0;
      //   } else {
      //     squares.push(<Square num={squareNum + 1} key={squareNum} type={"normal"} />);
      //   }
      // }
    //}
   // return squares;
 }
    //setBoard(squares);
  }


  useEffect(() => {
    // if(bombSquaresPlaced != 10) {
    //   createBoard();
    // }
    
    // if(bomb.length != 10) { 
    //   setBoard(createBoard());
    // }
    //selectBombSquares();
    //createBoard();
  },[])

  return (
    <div>
      <button onClick={() => {createBoard()}}>Create Board</button>
      <div className='board'>
        {/* { createBoard() } */}
        { board }
      </div>
    </div>
  )
}

export default Board