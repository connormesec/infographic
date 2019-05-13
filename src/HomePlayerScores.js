import React from 'react';

function formatData(data) {
    const [homeScores, __, ___, ____, _____] = data;
    const score = {
        scorers: [],
    } 
    for (let i = 0; i < homeScores.length; i++) {
        score.scorers.push(homeScores[i][5].replace(/\./g, '. '));
    }
    return score;
}  

function HomePlayerScores(props) {
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
  export default HomePlayerScores;