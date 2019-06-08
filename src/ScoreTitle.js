import React from 'react';

function ScoreTitle({ data }) {
  const [awayTeam, homeTeam] = [data[4][0], data[4][1]];

  return ghettoAssFontSizing(awayTeam, homeTeam);
}

function ghettoAssFontSizing(away, home) {
  let characters = away.length + home.length + 4;

  let n = '';
  if (characters <= 26) {
    n = '60';
  } else if (characters <= 36) {
    n = '50';
  } else if (characters <= 45) {
    n = '45';
  } else if (characters <= 80) {
    n = '40';
  } else {
    n = '35';
  }

  console.log(`There are ${characters} characters and n = ${n}`);

  return (
    <div>
      <h3 style={{ fontSize: `${n}px` }}>
        {away} <br /> at {home}
      </h3>
    </div>
  );
}

export default ScoreTitle;
