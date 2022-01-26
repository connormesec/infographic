import React from 'react';
import Plot from 'react-plotly.js';

function HockeyPlot(props) {
  const data = props.data;

  let homeTeamShots = {
    period_x: [0],
    shots_y: [0]
  };
  let awayTeamShots = {
    period_x: [0],
    shots_y: [0]
  };
  const homeTeamId = data.highLevelStats.homeTeam.info.id;
  const awayTeamId = data.highLevelStats.visitingTeam.info.id;
  let homeTeamGoals = {
    time_x: [],
    estimated_shots_y: []
  };
  let awayTeamGoals = {
    time_x: [],
    estimated_shots_y: []
  };
  let homeTeamShotsTotal = 0;
  let awayTeamShotsTotal = 0;


  for (let i = 0; i < data.highLevelStats.periods.length; i++) {

    homeTeamShots.period_x.push(i + 1);
    homeTeamShots.shots_y.push(parseInt(data.highLevelStats.periods[i].stats.homeShots) + parseInt(homeTeamShotsTotal));
    awayTeamShots.period_x.push(i + 1);
    awayTeamShots.shots_y.push(parseInt(data.highLevelStats.periods[i].stats.visitingShots) + parseInt(awayTeamShotsTotal));

    for (let j = 0; j < data.highLevelStats.periods[i].goals.length; j++) {
      let time = makeTime(data.highLevelStats.periods[i].goals[j].time) + i;
      
      if (data.highLevelStats.periods[i].goals[j].team.id === homeTeamId) {
        homeTeamGoals.time_x.push(time);
        homeTeamGoals.estimated_shots_y.push(data.highLevelStats.periods[i].stats.homeShots * (time - i) + parseInt(homeTeamShotsTotal));
      }
      
      if (data.highLevelStats.periods[i].goals[j].team.id === awayTeamId) {
        awayTeamGoals.time_x.push(time);
        awayTeamGoals.estimated_shots_y.push(data.highLevelStats.periods[i].stats.visitingShots * (time - i) + parseInt(awayTeamShotsTotal));
      }
    }

    homeTeamShotsTotal = homeTeamShotsTotal + parseInt(data.highLevelStats.periods[i].stats.homeShots)
    awayTeamShotsTotal = awayTeamShotsTotal + parseInt(data.highLevelStats.periods[i].stats.visitingShots)
  }

  //Overtime logic below
  //set overtime to true of status has "OT" in it
  let overtime = /OT/.test(data.highLevelStats.details.status);
  let tickVals = [1, 2, 3];
  let rangeVals = [0, 3];
  let tickText =  ['End of 1st', 'End of 2nd', 'Final']
  if (overtime === true) {
    tickText = ['End of 1st', 'End of 2nd', 'End of 3rd', ''];
    let otWinnerHome = homeTeamGoals.time_x.at(-1)
    let otWinnerAway = awayTeamGoals.time_x.at(-1)
    let finalTime
    if (otWinnerHome > otWinnerAway) {
      // adding .05 so the marker is not cut off
       finalTime = otWinnerHome + 0.04;
    } else {
      finalTime = otWinnerAway + 0.04;
    }
    tickVals = [1, 2, 3, finalTime];
    rangeVals = [0, finalTime];
  } 

  // converts time from min:sec format to units of time (does not incorporate periods, added later)
  function makeTime(p2) {
    let a = p2.split(':');
    let b = (+a[0] * 60 + +a[1]) / 1200;
    return b;
  }

  return (
    <Plot
      data={[
        //Away Team Shots
        {
          name: data.highLevelStats.visitingTeam.info.nickname,
          x: awayTeamShots.period_x,
          y: awayTeamShots.shots_y,
          type: 'scatter',
          mode: 'lines+points',
          line: { color: data.additional.away.color, width: 10 }
        },
        //Home Team Shots
        {
          name: data.highLevelStats.homeTeam.info.nickname,
          x: homeTeamShots.period_x,
          y: homeTeamShots.shots_y,
          type: 'scatter',
          mode: 'lines+points',
          line: { color: data.additional.home.color, width: 10 }
        },
        //Home Scores
        {
          x: homeTeamGoals.time_x,
          y: homeTeamGoals.estimated_shots_y,
          mode: 'markers+text',
          textfont: { color: 'white', size: 20 },
          marker: {
            color: data.additional.home.color,
            size: 20,
            line: { color: 'white', width: 2 }
          }
        },
        //Away Scores
        {
          x: awayTeamGoals.time_x,
          y: awayTeamGoals.estimated_shots_y,
          mode: 'markers+text',
          textfont: { color: 'white', size: 20 },
          marker: {
            color: data.additional.away.color,
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
          tickvals: tickVals,
          range: rangeVals,
          ticktext: tickText,
          tickmode: 'array',
          tickangle: 0,
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
      config={{
        staticPlot: true,
        displayModeBar: false,
      }}
    />
  );
}

export default HockeyPlot;
