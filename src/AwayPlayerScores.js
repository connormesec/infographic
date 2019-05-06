import React from 'react';

function formatData(data) {
    const [_, awayScores] = data;
    const score = {
        scorers: [],
    }
    
    for (let i = 0; i < awayScores.length; i++) {
        score.scorers.push(awayScores[i][5].replace(/\./g, '. '));
    }

    return score;
}  


function AwayPlayerScores(props) {
    const data = formatData(props.data);
    const reactElementsArray = data.scorers.map((data) => {
        return (
          <h5>{data}</h5>
        );
      });
    return (
        reactElementsArray
    )
  }
  export default AwayPlayerScores;