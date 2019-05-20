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
    
    return <div dangerouslySetInnerHTML={ghettoAssFontSizing(data.awayTeam, data.homeTeam)} />;
  }

function ghettoAssFontSizing(away, home) {
    let characters = away.length + home.length + 4;
    
    let n = '';
    if (characters <= 26) {
        n = '60';
        
    }    
    else if (characters <= 36 && characters > 26) {
        n = '50';
        
    }
    else if (characters <= 45 && characters > 36) {
        n = '45';
        
    }
    else if (characters <=80  && characters > 45) {
        n = '40';
        
    }else{
        n = '35';
        
    }
    console.log("There are " + characters + " characters and n= " + n)
    return {__html: '<h3 style="font-size: ' + n + 'px;">' + away + '<br /> at ' + home + '</h3>'};
}
export default ScoreTitle;

//   <h3>{data.awayTeam}<br></br>
//   at {data.homeTeam}</h3>