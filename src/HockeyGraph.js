import React from 'react';
import Plot from 'react-plotly.js';

function formatData(data) {
  const [_, __, ___, penalties, ____, _____, color] = data;

  const formattedPenalties = {
    //teamNames: ["Montana State", "Other Team"],
    homeTeamName: [penalties[2][1].replace('-', '/')],
    awayTeamName: [penalties[1][1].replace('-', '/')],
    totalHomePenalties: [],
    totalAwayPenalties: [],
    ppGoalsHome: [],
    ppGoalsAway: [],
    homeColor: color[0],
    awayColor: color[1],
  };

  let a = [penalties[1][1].split('-'), penalties[2][1].split('-')];

  formattedPenalties.totalHomePenalties = [Number(a[0][1] - a[0][0])];
  formattedPenalties.totalAwayPenalties = [Number(a[0][1] - a[0][0])];
  formattedPenalties.ppGoalsHome = [a[1][0]];
  formattedPenalties.ppGoalsAway = [a[0][0]];

  return formattedPenalties;
}

function HockeyGraph(props) {
  const data = formatData(props.data);

  return (
    <Plot
      data={
        [
          //Home Team Shots
          {
            x: data.homeTeamName,
            y: data.ppGoalsHome,
            type: 'bar',
            mode: 'lines+points',
            marker: { 
              color: data.homeColor,
              line: {
                color: 'white',
                width: 2,
              },
             },
          },
          {
            x: data.homeTeamName,
            y: data.totalHomePenalties,
            type: 'bar',
            mode: 'lines+points',
            marker: { 
                color: 'grey',
                opacity: 0.2,
                line: {
                  color: 'white',
                  width: 2,
                },
            },
          },
          {
            x: data.awayTeamName,
            y: data.ppGoalsAway,
            type: 'bar',
            mode: 'lines+points',
            marker: { 
              color:data.awayColor,
              line: {
                color: 'white',
                width: 2,
              },
            },
          },
          {
            x: data.awayTeamName,
            y: data.totalAwayPenalties,
            type: 'bar',
            mode: 'lines+points',
            marker: { 
              color: 'grey',
              opacity: 0.2,
              line: {
                color: 'white',
                width: 2,
              },
            }, 
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
            color: '#ffffff'
        },
        plot_bgcolor: '#2d343e',
        paper_bgcolor: '#2d343e',
        showlegend: false,
        xaxis: {
          color: 'white',
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
export default HockeyGraph;