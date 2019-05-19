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
    
    return <div dangerouslySetInnerHTML={createMarkup(data.awayTeam, data.homeTeam)} />;
  }

  function ghettoAssFontSizing(home, away) {
      return ('fuck the police' + home + away)
  }

  function createMarkup(away, home) {
    let characters = away.length + home.length + 4;
    if (characters <= 26) {
        n = 60;
    }    
    if (characters <= 36 && characters > 26) {
        n = 50;
    }
    if (characters <= 45 && characters > 36) {
        n = 45;
    }

    if (characters > 40 && characters < 60) {
        n = 20;
    }
    let n = 45;
    return {__html: '<h3 style="font-size: ' + n + 'px;">University YWt4scylI wVt<br /> at University Dy9YWt4sc ylIwVt<h3>'};
  }
  
  
  
  
  
  
  export default ScoreTitle;

//   <h3>{data.awayTeam}<br></br>
//   at {data.homeTeam}</h3>