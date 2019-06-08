import React from 'react';

function HomeScore({ data }) {
  const homeScore = data[5][1];

  return <h1>{homeScore}</h1>;
}

export default HomeScore;
