import React from 'react';
import Plot from 'react-plotly.js';

function formatData(data) {
  const [_, __, ___, penalties, ____, _____, ______, _______, colors] = data;

  const formattedPenaltyMinutes = {
    homePenaltyMinutes: [],
    awayPenaltyMinutes: [],
    homeColor: colors[0],
    awayColor: colors[1],
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
              color: data.homeColor,
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
              color: data.awayColor,
              line: {
                color: 'white',
                width: 2,
              }
            }
          },
        ]
      }
      layout={{
        width: 300,
        height: 300,
        barmode: 'stack',
        margin: {
          t: 20,
        },
        font: {
          family: 'Courier New, monospace',
          size: 30,
          color: 'white'
        },
        plot_bgcolor: '#282c34',
        paper_bgcolor: '#282c34',
        showlegend: false,
        xaxis: {
          color: 'white',
          autotick: true,
          tickmode: 'array',
          type: "category",
          showgrid: false,
          showline: false,
          title: {
            text: 'Penalty Minutes',
            font: {
              family: 'Courier New, monospace',
              size: 25,
              color: 'white',
            }
          },
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