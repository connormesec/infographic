import React from 'react';

function homeShootOutRatio({ data }) {
    const table = data[10];
    let awayScores = 0;
    let awayMisses = 0;
    let homeScores = 0;
    let homeMisses = 0;
console.log(table)
    for (let i = 0; i < table.length; i++) {
        if (table[i][1] === "no") {
            awayMisses = ++awayMisses;
            console.log('made it here' + awayMisses)
        }
        if (table[i][1] === "yes") {
            awayScores = ++awayScores;
        }
        if (table[i][0] === "no") {
            homeMisses = ++homeMisses;
        }
        if (table[i][0] === "yes") {
            homeScores = ++homeScores;
        }
    }
    let homeTotalShots = homeMisses + homeScores;
    return (
        
          <h3>
          Shootout: <strong> {homeScores} / {homeTotalShots} </strong>
          </h3>
     
      );

}

export default homeShootOutRatio;