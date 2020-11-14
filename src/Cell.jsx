// import React, {useContext, useEffect} from 'react';
// import {Context, IndexContext} from './Context'
//
//
// export default function Cell() {
//     const context = useContext(Context)
//     const indexContext = useContext(IndexContext)
//     let grid = context.state.user.overallGrid;//call the state follow the format:  context.state.user.overallGrid
//     let rowNumber = indexContext.row
//     let colNumber = indexContext.col
//     let cellContent = grid[rowNumber][colNumber]
//     let numberGrid = generateNumberGrid(grid.length, grid[1].length);
//     const handleGrid = e => {
//
//         context.dispatch({type: 'overallGrid', value: "123"})
//     }
//     // useEffect(() => {
//     //     //update grid
//     // }, [cellContent])
//
//
//     let number = numberGrid[rowNumber][colNumber];
//     return (
//
//         <div onClick={() => handleGrid()}
//              style={{
//                  backgroundColor: cellContent === 1 ? "black" : "white",
//                  color: "blue",
//                  height: 30,
//                  width: 30,
//                  border: "solid 1px black",
//                  textAlign: "center",
//              }}>
//             {number}
//         </div>
//     );
// }
//
//
// let generateNumberGrid = (row, col) => {
//     let count = 1;
//     let numberGrid = []
//     for (let i = 0; i < row; i++) {
//         numberGrid.push([]);
//         for (let k = 0; k < col; k++) {
//             numberGrid[i].push(count);
//             count += 1;
//         }
//     }
//
//     return numberGrid;
// }
//
