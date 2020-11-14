import React, { useContext } from 'react';
import {SizeContext} from "./Context";

export default function Home() {
    const sizeContext = useContext(SizeContext)

    let handleHeight = e => {
        sizeContext.dispatch({type: 'height', value: parseInt(document.getElementById('h').value)})
    }

    let handleWidth = e => {
        sizeContext.dispatch({type: 'width', value: parseInt(document.getElementById('w').value)})
    }

    return(
        <>
        <h1>home</h1>'
            <input type="text" id="h" placeholder="enter here" onChange={handleHeight}/>
            <input type="text" id="w" placeholder="enter here" onChange={handleWidth}/>

        </>
    )
}