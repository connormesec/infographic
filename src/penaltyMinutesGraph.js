import React from 'react';
import Plot from 'react-plotly.js';

function formatData(data) {
  const [_, __, ___, penalties] = data;

  const formattedPenaltyMinutes = {
    homePenaltyMinutes: [],
    awayPenaltyMinutes: [],
    color: ['#00205B'],
  };

  formattedPenaltyMinutes.awayPenaltyMinutes = [penalties[1][2]];
  formattedPenaltyMinutes.homePenaltyMinutes = [penalties[2][2]];

  return formattedPenaltyMinutes;
}

function penaltyMinutesGraph(props) {
  const data = formatData(props.data);

  return (
    <Plot
      data={
        [
          //Home Team Shots
          {
            x: data.homePenaltyMinutes,
            y: data.homePenaltyMinutes,
            type: 'bar',
            mode: 'lines+points',
            marker: { 
              color: data.color,
              line: {
                color: 'white',
                width: 2,
              }
            }
          },
          //Away Team Shots
          {
            x: data.awayPenaltyMinutes,
            y: data.awayPenaltyMinutes,
            type: 'bar',
            mode: 'lines+points',
            marker: { 
              color: 'green',
              line: {
                color: 'white',
                width: 2,
              }
            }
          },
        ]
      }
      layout={{
        width: 600,
        height: 600,
        barmode: 'stack',
        font: {
          family: 'Courier New, monospace',
          size: 72,
          color: 'white'
        },
        plot_bgcolor: '#2d343e',
        paper_bgcolor: '#2d343e',
        showlegend: false,
        xaxis: {
          autotick: true,
          tickmode: 'array',
          type: "category",
        },
        yaxis: { 
          color: 'white',
          zerolinewidth: 4, 
          showgrid: false,
          showline: false,
          showticklabels: false,
        },
      }}
    />
  );
}
export default penaltyMinutesGraph;