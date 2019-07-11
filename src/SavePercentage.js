import React from 'react';
import Plot from 'react-plotly.js';

function formatData(data) {
  const shots = data[2];
  const score = data[5];
  const goalies = data[6];
  const colors = data[8];

  const formattedShots = {
    homeScore: score[1],
    awayScore: score[0],
    homeTotalShots: shots[2][4],
    awayTotalShots: shots[1][4],
    homeSavedShots: [],
    awaySavedShots: [],
    awaySavePercentage: '',
    homeSavePercentage: '',
    homeColor: colors[0],
    awayColor: colors[1],
    homeGoalie: [goalies[1]],
    awayGoalie: [goalies[0]]
  };

  //TODO There has to be a better way of doing this
  formattedShots.homeSavedShots = shots[2][4] - score[1];
  formattedShots.awaySavedShots =
    formattedShots.awayTotalShots - formattedShots.homeScore;
  formattedShots.awaySavePercentage =
    formattedShots.homeSavedShots / formattedShots.homeTotalShots;
  formattedShots.homeSavePercentage =
    formattedShots.awaySavedShots / formattedShots.awayTotalShots;
  let m = Math.round(((shots[1][4] - score[0]) / shots[1][4]) * 100) / 100;
  let n = m.toString();
  formattedShots.homeSavePercentage = n.replace(/^0+/, '');
  let o = Math.round(((shots[2][4] - score[1]) / shots[2][4]) * 100) / 100;
  let p = o.toString();
  formattedShots.awaySavePercentage = p.replace(/^0+/, '');
  //handle OT scenarios
  for (let i = 0; i < shots[0].length; i++) {
    if (shots[0][i] === "OT") {
      formattedShots.homeSavedShots = shots[2][5] - score[1];
      formattedShots.awaySavedShots =
        formattedShots.awayTotalShots - formattedShots.homeScore;
      formattedShots.awaySavePercentage =
        formattedShots.homeSavedShots / formattedShots.homeTotalShots;
      formattedShots.homeSavePercentage =
        formattedShots.awaySavedShots / formattedShots.awayTotalShots;
      let m = Math.round(((shots[1][5] - score[0]) / shots[1][5]) * 100) / 100;
      let n = m.toString();
      formattedShots.homeSavePercentage = n.replace(/^0+/, '');
      let o = Math.round(((shots[2][5] - score[1]) / shots[2][5]) * 100) / 100;
      let p = o.toString();
      formattedShots.awaySavePercentage = p.replace(/^0+/, '');
    }
     //handle SO scenarios
    if (shots[0][i] === "SO") {
      formattedShots.homeSavedShots = shots[2][6] - score[1];
      formattedShots.awaySavedShots =
        formattedShots.awayTotalShots - formattedShots.homeScore;
      formattedShots.awaySavePercentage =
        formattedShots.homeSavedShots / formattedShots.homeTotalShots;
      formattedShots.homeSavePercentage =
        formattedShots.awaySavedShots / formattedShots.awayTotalShots;
      let m = Math.round(((shots[1][6] - score[0]) / shots[1][6]) * 100) / 100;
      let n = m.toString();
      formattedShots.homeSavePercentage = n.replace(/^0+/, '');
      let o = Math.round(((shots[2][6] - score[1]) / shots[2][6]) * 100) / 100;
      let p = o.toString();
      formattedShots.awaySavePercentage = p.replace(/^0+/, '');
    }
  }
  return formattedShots;
}

function SavePercentage(props) {
  const data = formatData(props.data);

  return (
    <Plot
      data={[
        {
          x: [data.homeSavePercentage + '\u200b'],
          y: [data.homeSavePercentage],
          type: 'bar',
          mode: 'lines+points',
          text: data.homeGoalie,
          textposition: 'auto',
          hoverinfo: 'none',
          marker: {
            color: data.homeColor,
            line: { color: 'white', width: 2 }
          }
        },
        {
          x: [data.homeSavePercentage + '\u200b'],
          y: [1 - data.homeSavePercentage],
          type: 'bar',
          mode: 'lines+points',
          marker: {
            color: 'grey',
            opacity: 0.2,
            line: { color: 'white', width: 2 }
          }
        },
        {
          x: [data.awaySavePercentage],
          y: [data.awaySavePercentage],
          type: 'bar',
          mode: 'lines+points',
          text: data.awayGoalie,
          textposition: 'auto',
          hoverinfo: 'none',
          marker: {
            color: data.awayColor,
            line: { color: 'white', width: 2 }
          }
        },
        {
          x: [data.awaySavePercentage],
          y: [1 - data.awaySavePercentage],
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
          family: 'Courier New, monospace', size: 30, color: '#fff' },
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
            text: 'Goaltending',
            font: { family: 'Courier New, monospace', size: 25, color: 'white' }
          }
        },
        yaxis: {
          color: 'white',
          zerolinewidth: 4,
          showgrid: false,
          showline: false,
          showticklabels: false,
          textangle: 45
        }
      }}
      config={{
        staticPlot: true,
        displayModeBar: false,
      }}
    />
  );
}

export default SavePercentage;
