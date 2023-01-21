import React from 'react';
import Plot from 'react-plotly.js';


function SavePercentage(props) {
  const data = props.data;
  let homeGoalieName;
  let awayGoalieName;
  let homeSavePercentage = round(1 - Number(data.highLevelStats.visitingTeam.stats.goals / data.highLevelStats.visitingTeam.stats.shots).toFixed(2),2);
  let awaySavePercentage = round(1 - Number(data.highLevelStats.homeTeam.stats.goals / data.highLevelStats.homeTeam.stats.shots).toFixed(2),2);
  for (let i = 0; i < data.highLevelStats.homeTeam.goalies.length; i++) {
    if (data.highLevelStats.homeTeam.goalies[i].starting === 1) {
      homeGoalieName = data.highLevelStats.homeTeam.goalies[i].info.lastName;
    }
  }
  for (let j = 0; j < data.highLevelStats.visitingTeam.goalies.length; j++) {
    if (data.highLevelStats.visitingTeam.goalies[j].starting === 1) {
      awayGoalieName = data.highLevelStats.visitingTeam.goalies[j].info.lastName;
    }
  }

  function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}

  return (
    <Plot
      data={[
        {
          x: ['.' + homeSavePercentage.toString().split('.')[1] + '\u200b\u200b'], //add aditional character or else Plotly will stack bars with same value
          y: [homeSavePercentage],
          type: 'bar',
          mode: 'lines+points',
          text: homeGoalieName,
          textposition: 'auto',
          hoverinfo: 'none',
          marker: {
            color: data.additional.home.color,
            line: { color: 'white', width: 2 }
          }
        },
        {
          x: ['.' + homeSavePercentage.toString().split('.')[1] + '\u200b'],
          y: [ 1- homeSavePercentage],
          type: 'bar',
          mode: 'lines+points',
          marker: {
            color: 'grey',
            opacity: 0.2,
            line: { color: 'white', width: 2 }
          }
        },
        {
          x: ['.' + awaySavePercentage.toString().split('.')[1]  + '\u200b'],
          y: [awaySavePercentage],
          type: 'bar',
          mode: 'lines+points',
          text: awayGoalieName,
          textposition: 'auto',
          hoverinfo: 'none',
          marker: {
            color: data.additional.away.color,
            line: { color: 'white', width: 2 }
          }
        },
        {
          x: ['.' + awaySavePercentage.toString().split('.')[1] + '\u200b'],
          y: [1- awaySavePercentage],
          type: 'bar',
          mode: 'lines+points',
          marker: {
            color: 'grey',
            opacity: 0.2,
            line: { color: 'white', width: 2 }
          }
        }
      ]}
      layout={{
        width: 300,
        height: 300,
        barmode: 'stack',
        margin: {
          t: 20
        },
        font: {
          family: 'Courier New, monospace', size: 30, color: '#fff' },
        plot_bgcolor: '#00000000',
        paper_bgcolor: '#00000000',
        showlegend: false,
        xaxis: {
          color: 'white',
          autotick: true,
          tickmode: 'array',
          type: 'category',
          showgrid: false,
          showline: false,
          tickangle: 0,
          title: {
            text: 'Goaltending',
            font: { family: 'Courier New, monospace', size: 25, color: 'white' }
          }
        },
        yaxis: {
          color: 'white',
          zerolinewidth: 4,
          showgrid: false,
          showline: false,
          showticklabels: false,
          textangle: 45
        }
      }}
      config={{
        staticPlot: true,
        displayModeBar: false,
      }}
    />
  );
}

export default SavePercentage;
