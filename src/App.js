import React, { Component } from 'react';
import './App.css';

import HockeyPlot from './HockeyPlot';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HockeyPlot count={42}> </HockeyPlot>
      </header>
    </div>
  );
}

export default App;
