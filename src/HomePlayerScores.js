import React from 'react';

function HomePlayerScores({ data }) {
  const homeTeamId = data.highLevelStats.homeTeam.info.id;
  let homeTeamGoalScorers = [];
  for (let i = 0; i < data.highLevelStats.periods.length; i++) {
    for (let j = 0; j < data.highLevelStats.periods[i].goals.length; j++){
      if (data.highLevelStats.periods[i].goals[j].team.id === homeTeamId) {
        homeTeamGoalScorers.push(data.highLevelStats.periods[i].goals[j].scoredBy.firstName + ' ' + data.highLevelStats.periods[i].goals[j].scoredBy.lastName);
      }
    }
  }
  return homeTeamGoalScorers.map((data, index) => <h5 key={index}>{data}</h5>);
}

export default HomePlayerScores;
