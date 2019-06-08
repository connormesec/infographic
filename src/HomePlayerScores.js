import React from 'react';

function HomePlayerScores({ data: [homeScores] }) {
  return homeScores
    .map(score => score[5].replace(/\./g, '. '))
    .map(data => <h5>{data}</h5>);
}

export default HomePlayerScores;
