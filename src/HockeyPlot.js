import React from 'react';
import Plot from 'react-plotly.js';

function formatData(data) {
  const [homeScores, awayScores, shots] = data;
  const colors = data[8];

  const xValues = shots[0].slice(1, 4);

  const formattedData = {
    teams: [],
    scores: [],
    homeLabel: 'bottom right',
    awayLabel: 'top left',
    homeColor: colors[0],
    awayColor: colors[1]
  };

  if (shots[1][4] >= shots[2][4]) {
    formattedData.homeLabel = 'top left';
    formattedData.awayLabel = 'bottom right';
  }

  shots.slice(1, 3).forEach(team => {
    let data = team.slice(1, 4).map(i => parseInt(i));

    let out = [];
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i];
      out.push(sum);
    }

    formattedData.teams.push({
      team_name: team[0],
      y: [0, ...out]
    });
  });

  formattedData.teams.forEach(team => {
    team.x = [0, ...xValues];
  });

  const formattedHomeScores = formatScores(homeScores);
  const formattedAwayScores = formatScores(awayScores);

  formattedData.scores.push(formattedHomeScores);
  formattedData.scores.push(formattedAwayScores);
 
  return formattedData;
}

function formatScores(scores) {
  return scores
    .map(score => {
      return {
        x: [score[3]],
        y: [score[4]],
        title: [score[5]]
      };
    })
    .reduce((s1, s2) => {
      return {
        x: [...s1.x, ...s2.x],
        y: [...s1.y, ...s2.y],
        title: [...s1.title, ...s2.title]
      };
    });
}

function HockeyPlot(props) {
  const data = formatData(props.data);

  return (
    <Plot
      data={[
        //Away Team Shots
        {
          name: data.teams[0].team_name,
          x: data.teams[0].x,
          y: data.teams[0].y,
          type: 'scatter',
          mode: 'lines+points',
          line: { color: data.awayColor, width: 10 }
        },
        //Home Team Shots
        {
          name: data.teams[1].team_name,
          x: data.teams[1].x,
          y: data.teams[1].y,
          type: 'scatter',
          mode: 'lines+points',
          line: { color: data.homeColor, width: 10 }
        },
        //Home Scores
        {
          x: data.scores[0].x,
          y: data.scores[0].y,
          mode: 'markers+text',
          textfont: { color: 'white', size: 20 },
          marker: {
            color: data.homeColor,
            size: 20,
            line: { color: 'white', width: 2 }
          }
        },
        //Away Scores
        {
          x: data.scores[1].x,
          y: data.scores[1].y,
          mode: 'markers+text',
          textfont: { color: 'white', size: 20 },
          marker: {
            color: data.awayColor,
            size: 20,
            line: { color: 'white', width: 2 }
          }
        }
      ]}
      layout={{
        width: 800,
        height: 400,
        title: {
          text: 'Shots + Goals',
          font: { family: 'Courier New, monospace', size: 30, color: 'white' }
        },
        staticPlot: true,
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        margin: { r: 50, t: 40, b: 50, l: 50 },
        xaxis: {
          color: '#aaa',
          autotick: false,
          tickvals: [1, 2, 3],
          range: [0, 3],
          ticktext: ['End of 1st', 'End of 2nd', 'Final'],
          tickmode: 'array',
          ticks: 'outside',
          fixedrange: true,
          tickwidth: 2,
          ticklen: 5,
          tickfont: {
            family: 'Courier New, monospace',
            size: 20,
            color: 'white'
          },
          gridcolor: '#aaa',
          gridwidth: 2,
          showgrid: true,
          showline: true,
          linecolor: '#969696',
          linewidth: 3,
          mirror: true
        },
        yaxis: {
          color: '#aaa',
          zerolinecolor: '#969696',
          zerolinewidth: 4,
          rangemode: 'nonnegative',
          fixedrange: true,
          showgrid: false,
          ticks: 'outside',
          tickwidth: 2,
          ticklen: 5,
          showline: true,
          mirror: true,
          linecolor: '#969696',
          linewidth: 3,
          tickfont: {
            family: 'Courier New, monospace',
            size: 20,
            color: 'white'
          }
        }
      }}
      config = {{
        staticPlot: true,
        displayModeBar: false,
      }}
    />
  );
}

export default HockeyPlot;
