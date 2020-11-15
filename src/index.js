import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Home from './Home';
import GameRule from './GameRule';
import { SizeContext } from './Context';
import './index.css';
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Switch,
} from 'react-router-dom';
import Parent from './Parent';

ReactDOM.render(<Parent />, document.getElementById('root'));

// ReactDOM.render(
//     <SizeContext.Provider value={{ height: 10, width: 10 }}>
//         <Router>
//             <Switch>
//                 <div>
//                     <NavLink to="/">Home</NavLink>
//                     <NavLink to="/rule">Game Rule</NavLink>
//                     <NavLink to="/game">Game</NavLink>
//                 </div>
//                 <Route exact path={'/'} component={Home} />
//                 <Route exact path={'/home'} component={Home} />
//                 <Route exact path={'/rule'} component={GameRule} />
//                 <Route exact path={'/game'} component={Parent} />
//                 <Route render={() => <h1>Not found!</h1>} />
//             </Switch>
//         </Router>
//     </SizeContext.Provider>,
//     document.getElementById('root')
// );
