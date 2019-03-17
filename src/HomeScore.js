import React from 'react';

function formatData(data) {
    const [_, __, ___, ____, _____, scores] = data;
    const score = {
        homeScore: scores[1],
    }
    
    return score;
}  


function HomeScore(props) {
    const data = formatData(props.data);
    return (
        <h1>{data.homeScore}</h1>
    )
  }
  export default HomeScore;