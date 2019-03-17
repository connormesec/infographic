import React from 'react';

function formatData(data) {
    const [_, __, ___, ____, _____, scores] = data;
    const score = {
        awayScore: scores[0],
    }
    
    return score;
}  


function AwayScore(props) {
    const data = formatData(props.data);
    return (
        <h1>{data.awayScore}</h1>
    )
  }
  export default AwayScore;