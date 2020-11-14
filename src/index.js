import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Home from './Home';
import GameRule from './GameRule'
import SizeContext from './Context'
import './index.css';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'
import Parent from "./Parent";

ReactDOM.render(
    <Parent/>,
    document.getElementById('root')
);

        {/*<SizeContext.Provider value={{height: 10, width: 10}}>*/}
        {/*    <SizeContext.Provider/>*/}