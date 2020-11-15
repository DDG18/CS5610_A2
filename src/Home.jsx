import React, { useContext } from 'react';
import { SizeContext } from './Context';
import { useHistory } from 'react-router-dom';
import './index.css';

export default function Home() {
    const sizeContext = useContext(SizeContext);

    let handleHeight = e => {
        sizeContext.dispatch({
            type: 'height',
            value: parseInt(document.getElementById('h').value),
        });
    };

    let handleWidth = e => {
        sizeContext.dispatch({
            type: 'width',
            value: parseInt(document.getElementById('w').value),
        });
    };
    const history = useHistory();
    const redirect = e => {
        history.push('/game');
    };
    return (
        <div className="container">
            <h1>Home</h1>
            <input
                type="text"
                id="h"
                placeholder="enter here"
                onChange={handleHeight}
            />
            <input
                type="text"
                id="w"
                placeholder="enter here"
                onChange={handleWidth}
            />
            <button
                onClick={() => {
                    redirect();
                }}>
                Submit
            </button>
        </div>
    );
}
