import React from 'react';

function ShootOutRatio({ data }) {
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
    let awayTotalShots = awayMisses + awayScores;
    let homeTotalShots = homeMisses + homeScores;
    console.log(homeMisses + homeScores + homeTotalShots)
    return (
        <div>
        <div>
          <h3>
            Shootout <strong>{awayMisses} / {awayTotalShots}</strong>
          </h3>
        </div>
        <div>
        <h3>
        Shootout <strong> {homeMisses} / {homeTotalShots} </strong>
        </h3>
        </div>
      </div>
      );

}

export default ShootOutRatio;