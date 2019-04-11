import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';
import SearchPage from './components/SearchPage/SearchPage';
import CoursePage from './components/CoursePage/CoursePage';
import * as serviceWorker from './serviceWorker';
import GlobalStyle, { CSSReset } from './GlobalStyle';
import Auth from './auth/Auth';

const auth = new Auth();

const App = () => (
  <Router>
    <CSSReset />
    <GlobalStyle />
    <Route path="/" exact render={props => <SearchPage {...props} auth={auth} />} />
    <Route path="/course/:UID" exact render={props => <CoursePage {...props} auth={auth} />} />
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
