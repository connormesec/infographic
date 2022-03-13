import React from 'react';
import Plot from 'react-plotly.js';

function HockeyGraph(props) {
  const data = props.data;
  console.log(data)
  let homeTitle = data.highLevelStats.homeTeam.stats.powerPlayGoals + '/' + data.highLevelStats.visitingTeam.stats.infractionCount + '\u200b';
  let awayTitle = data.highLevelStats.visitingTeam.stats.powerPlayGoals + '/' + data.highLevelStats.homeTeam.stats.infractionCount + '\u200b';
  return (
    <Plot
      data={[
        {
          x: [homeTitle],
          y: [data.highLevelStats.homeTeam.stats.powerPlayGoals],
          type: 'bar',
          mode: 'lines+points',
          marker: {
            color: data.additional.home.color,
            line: { color: 'white', width: 2 }
          }
        },
        {
          x: [homeTitle],
          y: [data.highLevelStats.visitingTeam.stats.infractionCount - data.highLevelStats.homeTeam.stats.powerPlayGoals],
          type: 'bar',
          mode: 'lines+points',
          marker: {
            color: 'grey',
            opacity: 0.2,
            line: { color: 'white', width: 2 }
          }
        },
        {
          x: [awayTitle],
          y: [data.highLevelStats.visitingTeam.stats.powerPlayGoals],
          type: 'bar',
          mode: 'lines+points',
          marker: {
            color: data.additional.away.color,
            line: { color: 'white', width: 2 }
          }
        },
        {
          x: [awayTitle],
          y: [data.highLevelStats.homeTeam.stats.infractionCount - data.highLevelStats.visitingTeam.stats.powerPlayGoals],
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
          family: 'Courier New, monospace',
          size: 25,
          color: '#ffffff'
        },
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
            text: 'Power Play',
            font: { family: 'Courier New, monospace', size: 25, color: 'white' }
          }
        },
        yaxis: {
          color: 'white',
          zerolinewidth: 4,
          showgrid: false,
          showline: false,
          showticklabels: false
        }
      }}
      config={{
        staticPlot: true,
        displayModeBar: false,
      }}
    />
  );
}

export default HockeyGraph;
