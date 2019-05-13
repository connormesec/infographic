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

  formattedShots.awayShots = [shots[1][4]];
  formattedShots.homeShots = [shots[2][4]];

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
          autotick: true,
          tickmode: 'array',
          type: "category",
        },
        xaxis: {
          color: 'white',
          autotick: true,
          tickmode: 'array',
          type: "category",
          showgrid: false,
          showline: false,
          title: {
            text: 'Shots',
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
export default shotsGraph;