import React from 'react';

function AwayPlayerScores({ data }) {
  const awayTeamId = data.highLevelStats.visitingTeam.info.id;
  let awayTeamGoalScorers = [];
  for (let i = 0; i < data.highLevelStats.periods.length; i++) {
    for (let j = 0; j < data.highLevelStats.periods[i].goals.length; j++){
      if (data.highLevelStats.periods[i].goals[j].team.id === awayTeamId) {
        awayTeamGoalScorers.push(data.highLevelStats.periods[i].goals[j].scoredBy.firstName + ' ' + data.highLevelStats.periods[i].goals[j].scoredBy.lastName);
      }
    }
  }
  return awayTeamGoalScorers.map((data, index) => <h5 key={index}>{data}</h5>);
}

export default AwayPlayerScores;
