import React from 'react';
import Plot from 'react-plotly.js';

function formatData(data) {
  const shots = data[2];
  const colors = data[8];

  const formattedShots = {
    homeShots: [],
    awayShots: [],
    homeColor: colors[0],
    awayColor: colors[1]
  };

  formattedShots.awayShots = [shots[1][4]];
  formattedShots.homeShots = [shots[2][4]];
  
  //TODO make these loops not suck so much, maybe just find the array key that has the "T" (total)
  //handle OT scenarios
  for (let i = 0; i < shots[0].length; i++) {
    if (shots[0][i] == "OT") {
      formattedShots.awayShots = [shots[1][5]];
      formattedShots.homeShots = [shots[2][5]];
    }
  }
  //handle OT scenarios
  for (let i = 0; i < shots[0].length; i++) {
    if (shots[0][i] == "SO") {
      formattedShots.awayShots = [shots[1][6]];
      formattedShots.homeShots = [shots[2][6]];
    }
  }

  return formattedShots;
}

function ShotsGraph(props) {
  const data = formatData(props.data);
  return (
    <Plot
      data={[
        //Home Team Shots
        {
          x: [data.homeShots  + '\u200b'],
          y: data.homeShots,
           
          type: 'bar',
          mode: 'lines+points',
          marker: {
            color: data.homeColor,
            line: { color: 'white', width: 2 }
          }
        },
        //Away Team Shots
        {
          x: [data.awayShots],
          y: data.awayShots,
          type: 'bar',
          mode: 'lines+points',
          marker: {
            color: data.awayColor,
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
        plot_bgcolor: '#282c34',
        paper_bgcolor: '#282c34',
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
    />
  );
}

export default ShotsGraph;
