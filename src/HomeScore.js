import React from 'react';

function HomeScore({ data }) {
  const homeScore = data.highLevelStats.homeTeam.stats.goals;

  return <h1>{homeScore}</h1>;
}

export default HomeScore;
