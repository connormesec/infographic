import React from 'react';
import Plot from 'react-plotly.js';

function formatData(data) {
  const [_, __, shots, ___, ____, _____, ______, colors] = data;

  const formattedShots = {
    homeShots: [],
    awayShots: [],
    homeColor: colors[0],
    awayColor: colors[1],
  };

  formattedShots.awayShots = [shots[1][2]];
  formattedShots.homeShots = [shots[2][2]];

  return formattedShots;
}

function shotsGraph(props) {
  const data = formatData(props.data);

  return (
    <Plot
      data={
        [
          //Home Team Shots
          {
            x: data.homeShots,
            y: data.homeShots,
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
            x: data.awayShots,
            y: data.awayShots,
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
        title: 'Shots',
        width: 300,
        height: 400,
        barmode: 'stack',
        font: {
          family: 'Courier New, monospace',
          size: 30,
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
export default shotsGraph;