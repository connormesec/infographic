import React, { Component, useState, useEffect } from 'react';

import Plot from 'react-plotly.js';



async function scrape_table(_) {
  return formatData([[["Home score","1 - 1","2",1.3599999999999999,22.4,"S.Coulter","1"],["Home score","1 - 2","2",1.3900000000000001,22.85,"J.Warner","2"],["Home score","2 - 3","3",2.22,36.4,"J.Forbes","3"],["Home score","2 - 4","3",2.41,40.2,"L.Bing","4"],["Home score","2 - 5","3",2.46,41.2,"R.Hanson","5"],["Home score","2 - 6","3",2.81,48.2,"J.Pilskalns","6"]],[["Away score","1 - 0","2",1.07,4.28,"B.Rutherford","1"],["Away score","2 - 2","2",1.8199999999999998,7.28,"R.Bagley","2"]],[["Shots","1","2","3","T"],["Montana Tech","4","4","5","13"],["Montana Stat","17","15","20","52"]],[["Power Plays","PP","PIM"],["Montana Tech","1-7","20"],["Montana Stat","3-9","16"]]]);
}

function formatData(data) {
  const [_, __, ___, penalties] = data;
  
  const formattedPenaltyMinutes = {
    homeTeamName: ["Montana State"],
    awayTeamName: ["Other Team"],
    homePenaltyMinutes: [],
    awayPenaltyMinutes: [],
    color: ['#00205B'],
  };

  formattedPenaltyMinutes.awayPenaltyMinutes = [penalties[1][2]];
  formattedPenaltyMinutes.homePenaltyMinutes = [penalties[2][2]];
    
  return formattedPenaltyMinutes;
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

function test() {
  var fs = require("fs");
  const json = fs.readFileSync('../../test.json');
  let obj = JSON.parse(json);
  console.log(obj);
}



function penaltyMinutesGraph(props) {
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
          //Home Team Shots
          { 
            x: data.homeTeamName,
            y: data.homePenaltyMinutes,
            type: 'bar',
            mode: 'lines+points',
            marker: {color: data.color},
          },
          { 
            x: data.awayTeamName,
            y: data.awayPenaltyMinutes,
            type: 'bar',
            mode: 'lines+points',
            marker: {color: 'green'},
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
            color: '#7f7f7f'
        },
        plot_bgcolor: '#2d343e',
        paper_bgcolor: '#2d343e',
        showlegend: false,
        xaxis: {
          color: '#aaa',
          autotick: true,
          tickmode: 'array',
        },
        yaxis: { color: '#aaa' },
      }}
    />
  );
}
export default penaltyMinutesGraph;