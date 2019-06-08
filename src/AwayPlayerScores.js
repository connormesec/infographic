import React from 'react';

function AwayPlayerScores({ data: [_, awayScores] }) {
  return awayScores
    .map(score => score[5].replace(/\./g, '. '))
    .map(data => <h5>{data}</h5>);
}

export default AwayPlayerScores;
