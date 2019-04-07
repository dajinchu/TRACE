import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchPage from './components/SearchPage/SearchPage';
import CoursePage from './components/CoursePage/CoursePage';
import * as serviceWorker from './serviceWorker';
import GlobalStyle, { CSSReset } from './GlobalStyle'

const App = () => {
  return (
    <>
      <CSSReset />
      <GlobalStyle />
      {/* <SearchPage /> */}
      <CoursePage UID='CS3500' />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
