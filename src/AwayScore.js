import React from 'react';

function AwayScore({ data }) {
  const awayScore = data[5][0];
  return <h1>{awayScore}</h1>;
}

export default AwayScore;
