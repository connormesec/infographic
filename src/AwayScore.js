import React from 'react';

function AwayScore({ data }) {
  const awayScore = data.highLevelStats.visitingTeam.stats.goals;
  return <h1>{awayScore}</h1>;
}

export default AwayScore;
