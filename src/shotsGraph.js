import React from 'react';
import Plot from 'react-plotly.js';

function ShotsGraph(props) {
  const data = props.data;
  return (
    <Plot
      data={[
        //Home Team Shots
        {
          x: [data.highLevelStats.homeTeam.stats.shots  + '\u200b\u200b'], //add aditional character or else Plotly will stack bars with same value
          y: [data.highLevelStats.homeTeam.stats.shots],
           
          type: 'bar',
          mode: 'lines+points',
          marker: {
            color: data.additional.home.color,
            line: { color: 'white', width: 2 }
          }
        },
        //Away Team Shots
        {
          x: [data.highLevelStats.visitingTeam.stats.shots + '\u200b'],
          y: [data.highLevelStats.visitingTeam.stats.shots],
          type: 'bar',
          mode: 'lines+points',
          marker: {
            color: data.additional.away.color,
            line: { color: 'white', width: 2 }
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
            text: 'Shots',
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

export default ShotsGraph;
