import React from 'react';

function awayShootOutRatio({ data }) {
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
    return (
            <h3>
            Shootout: <strong>{awayScores} / {awayTotalShots}</strong>  
            </h3>
      );

}

export default awayShootOutRatio;