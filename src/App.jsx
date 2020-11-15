import React, { useEffect, useReducer, useContext } from 'react';
import { SizeContext } from './Context';
import './index.css';

// let height = 10;
// let width = 10;
const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
];

//make a copy of the grid
let copyGrid = (grid, height, width) => {
    let gridCopy = [];
    for (let i = 0; i < height; i++) {
        gridCopy.push([]);
        for (let k = 0; k < width; k++) {
            gridCopy[i].push(grid[i][k]);
        }
    }

    return gridCopy;
};

//create a number grid (1~ n*m)
let generateNumberGrid = (row, col) => {
    let count = 1;
    let numberGrid = [];
    for (let i = 0; i < row; i++) {
        numberGrid.push([]);
        for (let k = 0; k < col; k++) {
            numberGrid[i].push(count);
            count += 1;
        }
    }

    return numberGrid;
};

//generate empty grid with specific rows and columns
let generateEmptyGrid = (height, width) => {
    let emptyGrid = [];
    for (let i = 0; i < height; i++) {
        emptyGrid.push(Array.from(Array(width), () => 0));
    }
    return emptyGrid;
};

//initial grid with values (1 for alive, 0 for dead)
export let initialGrid = (height, width) => {
    let grid = generateEmptyGrid(height, width);
    for (let i = 0; i < height; i++) {
        for (let k = 0; k < width; k++) {
            let randomNum = Math.round(Math.random() * 100 + 1); //meaning random number from 1 to 100
            if (randomNum <= 5) {
                //make sure the cell has 5% to be alive
                grid[i][k] = 1;
            }
        }
    }

    return grid;
};

//update grid following the game of life rules
let updateGrid = (grid, height, width) => {
    let newGrid = copyGrid(grid, height, width);

    for (let i = 0; i < height; i++) {
        for (let k = 0; k < width; k++) {
            let livingNeighbors = 0;
            directions.forEach(([m, n]) => {
                let newRow = i + m;
                let newCol = k + n;
                if (
                    newRow >= 0 &&
                    newRow < height &&
                    newCol >= 0 &&
                    newCol < width
                ) {
                    livingNeighbors += grid[newRow][newCol];
                }
            });
            if (grid[i][k] === 1) {
                if (livingNeighbors < 2 || livingNeighbors > 3) {
                    newGrid[i][k] = 0;
                }
            } else if (grid[i][k] === 0 && livingNeighbors === 3) {
                newGrid[i][k] = 1;
            }
        }
    }
    return newGrid;
};

const Context = React.createContext(null);
const IndexContext = React.createContext(null);

//parent component
//=========================================APP=========================================
export default function App() {
    const sizeContext = useContext(SizeContext);
    let height = sizeContext.state.height;
    let width = sizeContext.state.width;
    //create store，note the level could matter
    const store = {
        overallGrid: initialGrid(height, width),
        isOn: [0],
        timeout: 1000,
        // alive: 0,
    };

    //create reducer
    const user = (state, action) => {
        switch (action.type) {
            case 'overallGrid':
                return { ...state, overallGrid: action.value };
            case 'isOn':
                return { ...state, isOn: action.value };
            case 'timeout':
                return { ...state, timeout: action.value };
            // case 'alive':
            //     return { ...state, alive: action.value };
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(user, store);

    return (
        <div>
            <Context.Provider value={{ state, dispatch }}>
                <Grid />
            </Context.Provider>
        </div>
    );
}

//=========================================GRID=========================================
function Grid(props) {
    const context = useContext(Context);
    const sizeContext = useContext(SizeContext);
    let height = sizeContext.state.height;
    let width = sizeContext.state.width;
    console.log(sizeContext);

    useEffect(() => {
        if (context.state.isOn[0] === 1) {
            gameStart();
        }
    }, [context.state]);

    const gameStart = () => {
        if (context.state.isOn[0] === 1) {
            const id = e => {
                context.dispatch({
                    type: 'overallGrid',
                    value: updateGrid(context.state.overallGrid, height, width),
                });
            };
            id();
            setTimeout(gameStart, context.state.timeout);
        }
    };

    const handleReset = () => {
        let grid = context.state.overallGrid;
        let reHeight = grid.length;
        let reWidth = grid[0].length;
        console.log('CHECK');
        console.log(reHeight);
        console.log(reWidth);
        context.dispatch({
            type: 'overallGrid',
            value: initialGrid(reHeight, reWidth),
        });
    };

    const handleTime = () => {
        context.dispatch({
            type: 'timeout',
            value: parseInt(document.getElementById('time').value),
        });
    };

    let updateALive = grid => {
        let numOfAlive = grid
            .reduce(function (a, b) {
                return a.concat(b);
            })
            .reduce(function (a, b) {
                return a + b;
            });
        return numOfAlive;
    };

    return (
        // <div className="container">
        <div>
            <div className="buttonBlock">
                <Button></Button>
                <button onClick={() => handleReset()}>Reset!!!!</button>
            </div>
            <div className="timeText">
                change time:
                <input type="text" id="time" onChange={handleTime} />
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${width}, 50px)`,
                    // width: "100%",
                    top: '25%',
                    left: '5%',
                    position: 'fixed',
                    width: 400,
                    height: 400,
                    overflowX: 'scroll',
                    overflowY: 'scroll',
                }}>
                {context.state.overallGrid.map((row, rowIndex) =>
                    row.map((value, colIndex) => (
                        <div key={colIndex}>
                            <IndexContext.Provider
                                value={{ row: rowIndex, col: colIndex }}>
                                <Cell />
                            </IndexContext.Provider>
                        </div>
                    ))
                )}
            </div>
            <div className="aliveCellText">
                Number of Alive Cells: {updateALive(context.state.overallGrid)}
            </div>
        </div>
    );
}

function Cell() {
    const context = useContext(Context);
    useEffect(() => {}, [context.state]);
    const indexContext = useContext(IndexContext);
    const sizeContext = useContext(SizeContext);
    let height = sizeContext.state.height;
    let width = sizeContext.state.width;
    const grid = context.state.overallGrid;

    let rowNumber = indexContext.row;
    let colNumber = indexContext.col;
    let cellContent = context.state.overallGrid[rowNumber][colNumber]; // 0 or 1
    let numberGrid = generateNumberGrid(grid.length, grid[0].length);
    let newGrid = copyGrid(grid, height, width);
    newGrid[rowNumber][colNumber] = cellContent === 1 ? 0 : 1; //flip the cell

    const handleGrid = e => {
        context.dispatch({ type: 'overallGrid', value: newGrid });
    };

    let number = numberGrid[rowNumber][colNumber]; //number on cell
    return (
        <div
            onClick={handleGrid}
            style={{
                backgroundColor:
                    context.state.overallGrid[rowNumber][colNumber] === 1
                        ? 'black'
                        : 'white',
            }}
            className="cell"
            //     color: 'blue',
            //     height: 30,
            //     width: 30,
            //     border: 'solid 1px black',
            //     textAlign: 'center',
            //     fontSize: 10,
            // }}
        >
            {number}
        </div>
    );
}

function Button() {
    const context = useContext(Context);
    let isOn = context.state.isOn;

    const handleIsOn = e => {
        isOn[0] = isOn[0] === 1 ? 0 : 1;
        context.dispatch({ type: 'isOn', value: isOn });
    };

    return (
        <>
            <button onClick={() => handleIsOn()}>
                {isOn[0] === 1 ? 'Pause' : 'Start'}
            </button>
        </>
    );
}
