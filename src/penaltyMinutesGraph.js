import React from 'react';
import Plot from 'react-plotly.js';

function PenaltyMinutesGraph(props) {
  const data = props.data;
  return (
    <Plot
      data={[
        //Home Team Shots
        {
          x: [data.highLevelStats.homeTeam.stats.penaltyMinuteCount + '\u200b'],
          y: [data.highLevelStats.homeTeam.stats.penaltyMinuteCount],
          type: 'bar',
          mode: 'lines+points',
          marker: {
            color: data.additional.home.color,
            opacity: 1,
            line: { color: 'white', width: 2, opacity: 1, }
          }
        },
        //Away Team Shots
        {
          x: [data.highLevelStats.visitingTeam.stats.penaltyMinuteCount + '\u200b'],
          y: [data.highLevelStats.visitingTeam.stats.penaltyMinuteCount],
          type: 'bar',
          mode: 'lines+points',
          marker: {
            color: data.additional.away.color,
            opacity: 1,
            line: { color: 'white', width: 2, opacity: 1, }
          }
        }
      ]}
      layout={{
        width: 300,
        height: 300,
        barmode: 'stack',
        margin: { t: 20 },
        font: { family: 'Courier New, monospace', size: 30, color: 'white' },
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
          title: {
            text: 'Penalty Minutes',
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
      config = {{
        staticPlot: true,
        displayModeBar: false,
      }}
    />
  );
}

export default PenaltyMinutesGraph;
