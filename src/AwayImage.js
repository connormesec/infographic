import React from 'react';

function formatData(data) {
  const teamNames = data[4];

  const awayTeamName = { name: teamNames[0].replace(/\s/g, '_') };
  console.log(awayTeamName);
  return awayTeamName;
}

function AwayImage(props) {
  const data = formatData(props.data);
  
  return <img src={`images/${data.name}.png`} alt={`Away team logo`} />;
}

export default AwayImage;
