import React, { Component } from 'react';
import './App.css';

import HockeyPlot from './HockeyPlot';
import HockeyGraph from './HockeyGraph';
import PenaltyMinutesGraph from './penaltyMinutesGraph';

function App() {
  return (
    <div className="App">
      
        <div class="lineChart">
          <HockeyPlot /> 
        </div>
        <div class="ppGoals">
          <HockeyGraph />
        </div>
        <div class="ppMin">
          <PenaltyMinutesGraph />
        </div>
      
    </div>
  );
}

export default App;
