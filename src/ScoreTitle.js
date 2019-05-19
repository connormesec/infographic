import React from 'react';
var ReactFitText = require('react-fittext');

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
    
    return <div dangerouslySetInnerHTML={createMarkup(data.awayTeam, data.homeTeam)} />;
  }

  function ghettoAssFontSizing(home, away) {
      return ('fuck the police' + home + away)
  }

  function createMarkup(away, home) {
    let characters = away.length + home.length + 4;
    if (characters <= 24) {
        n = 60;
    }    
    
    if (characters <= 40) {
            n = 30;
        }
        if (characters > 40 && characters < 60) {
            n = 20;
        }
    let n = 50;
    return {__html: '<h3 style="font-size: ' + n + 'px;">RKrQUPvp ICWCzvn<br /> at RKrQUPvpIC WCzvn<h3>'};
  }
  
  
  
  
  
  
  export default ScoreTitle;

//   <h3>{data.awayTeam}<br></br>
//   at {data.homeTeam}</h3>