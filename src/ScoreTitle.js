import React from 'react';

function formatData(data) {
    const [_, __, ___, ____, names] = data;
    const teamNames = {
        homeTeam: names[1],
        awayTeam: names[0],
    }
    
    return teamNames;
}  


function ScoreTitle(props) {
    const data = formatData(props.data);
    console.log('this thingd' + data);
    return (
        <h3>{data.awayTeam}<br></br>
        at {data.homeTeam}</h3>
    )
    //React.createElement('h1', {}, data.awayTeam + " at " + data.homeTeam);
  }
  export default ScoreTitle;