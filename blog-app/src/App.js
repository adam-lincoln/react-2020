import React from 'react';
import styles from './App.module.scss';

import Blog from './containers/Blog/Blog';

const App = (props) => {
  return (
    <div className="App">
      <header className="App-header">
        App
      </header>
      <Blog />
    </div>
  );
}

export default App;
