import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import App from './App';
import Home from './Home';
import GameRule from './GameRule';
import { SizeContext } from './Context';
import './index.css';

export default function Parent() {
    const store = {
        height: 10,
        width: 10,
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'height':
                return { ...state, height: action.value };
            case 'width':
                return { ...state, width: action.value };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, store);

    return (
        <React.StrictMode>
            <SizeContext.Provider value={{ state, dispatch }}>
                <Router>
                    <div className="navbar">
                        <NavLink to="/" exact>
                            Home
                        </NavLink>{' '}
                        |
                        <NavLink to="/game" exact>
                            Game
                        </NavLink>{' '}
                        |{' '}
                        <NavLink to="/gameRule" exact>
                            Game Rule
                        </NavLink>
                    </div>
                    <div className="container">
                        <Route path="/game" exact component={App} />
                        <Route path="/" exact component={Home} />
                        <Route path="/gameRule" exact component={GameRule} />
                    </div>
                </Router>
            </SizeContext.Provider>
        </React.StrictMode>
    );
}
