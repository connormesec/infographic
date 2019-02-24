import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import Plot from 'react-plotly.js';

async function scrape_table(_) {
  return formatData([[["Home score","1 - 1","2",1.3599999999999999,22.4,"S.Coulter","1"],["Home score","1 - 2","2",1.3900000000000001,22.85,"J.Warner","2"],["Home score","2 - 3","3",2.22,36.4,"J.Forbes","3"],["Home score","2 - 4","3",2.41,40.2,"L.Bing","4"],["Home score","2 - 5","3",2.46,41.2,"R.Hanson","5"],["Home score","2 - 6","3",2.81,48.2,"J.Pilskalns","6"]],[["Away score","1 - 0","2",1.07,4.28,"B.Rutherford","1"],["Away score","2 - 2","2",1.8199999999999998,7.28,"R.Bagley","2"]],[["Shots","1","2","3","T"],["Montana Tech","4","4","5","13"],["Montana Stat","17","15","20","52"]],[["Power Plays","PP","PIM"],["Montana Tech","1-7","20"],["Montana Stat","3-9","16"]]]);
}

function formatData(data) {
  const [homeScores, awayScores, shots] = data;

  const xValues = shots[0].slice(1, 4);

  const formattedData = {
    teams: [],
    scores: [],
  };

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
      y: [0, ...out],
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
/*
*
0: (6) ["Home score", "1 - 1", "2", 1.3599999999999999, 22.4, "S.Coulter"]
1: (6) ["Home score", "1 - 2", "2", 1.3900000000000001, 22.85, "J.Warner"]
2: (6) ["Home score", "2 - 3", "3", 2.22, 36.4, "J.Forbes"]
3: (6) ["Home score", "2 - 4", "3", 2.41, 40.2, "L.Bing"]
4: (6) ["Home score", "2 - 5", "3", 2.46, 41.2, "R.Hanson"]
5: (6) ["Home score", "2 - 6", "3", 2.81, 48.2, "J.Pilskalns"]


0: (6) [1.3599999999999999, 22.4, "S.Coulter"]
1: (6) [1.3900000000000001, 22.85, "J.Warner"]
2: (6) [2.22, 36.4, "J.Forbes"]
3: (6) [2.41, 40.2, "L.Bing"]
4: (6) [2.46, 41.2, "R.Hanson"]
5: (6) [2.81, 48.2, "J.Pilskalns"]
*
*/

function formatScores(scores) {
  return scores.map(score => {
    return {
      x: [score[3]],
      y: [score[4]],
      title: [score[6]],
    };
  }).reduce((s1, s2) => {
    return {
      x: [...s1.x, ...s2.x],
      y: [...s1.y, ...s2.y],
      title: [...s1.title, ...s2.title],
    };            
  });
}

function HockeyPlot(props) {
  const [data, setData] = useState(null);

  useEffect(async () => {
    const data = await scrape_table('http://d15k3om16n459i.cloudfront.net/prostats/gamesheet_full.html?gameid=3364989');

    console.log(`data ${data}`);

    setData(data);
  }, []);

  if (!data) return (<div> Loading... </div>);

  return (
    <Plot
      data={
        [
          ...data.teams.map(team => {
            return {
              name: team.team_name,
              x: team.x,
              y: team.y,
              type: 'scatter',
              mode: 'lines+points',
              marker: {color: 'red'},
            };
          }),
          ...data.scores.map(score => {
            return {
              x: score.x,
              y: score.y,
              mode: 'markers+text',
              name: '',
              text: score.title,
              textposition:'top left',
              textfont: { color: '#fff' },
              marker: {color: 'pink'}
            };
          }),
        ]
      }
      layout={{
        width: 1280,
        height: 720,
        plot_bgcolor: '#2d343e',
        paper_bgcolor: '#2d343e',
        showlegend: false,
        xaxis: {
          color: '#aaa',
          autotick: false,
          tickvals: [1, 2, 3],
          ticktext: ['End of 1st', 'End of 2nd', 'End of 3rd'],
          tickmode: 'array',
        },
        yaxis: { color: '#aaa' },
      }}
    />
  );
}

export default HockeyPlot;