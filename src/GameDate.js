import React from 'react';

function GameDate({ data }) {
  const dashedDate = data.highLevelStats.details.GameDateISO8601;
  const date = new Date(dashedDate).toDateString();
  
  return <h4>{date}</h4>;
}

export default GameDate;
