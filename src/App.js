import React, { Component } from 'react';
import './App.css';

import HockeyPlot from './HockeyPlot';
import HockeyGraph from './HockeyGraph';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HockeyPlot> </HockeyPlot>
        <HockeyGraph> </HockeyGraph>
      </header>
    </div>
  );
}

export default App;
