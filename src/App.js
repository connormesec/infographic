import React, { useState, useEffect } from 'react';
import ColorPicker from 'material-ui-color-picker';

import './App.css';
import Header from './Header';
import HockeyPlot from './HockeyPlot';
import HockeyGraph from './HockeyGraph';
import PenaltyMinutesGraph from './penaltyMinutesGraph';
import ScoreTitle from './ScoreTitle';
import SavePercentage from './SavePercentage';
import HomeScore from './HomeScore';
import AwayScore from './AwayScore';

const request = require('request');
const cheerio = require('cheerio');

let homeScores = [];
let awayScores = [];

function App() {
  const [url, setUrl] = useState();
  const [homeColor, setHomeColor]= useState();
  const [awayColor, setAwayColor]= useState();
  let textInputRef = React.createRef();

  if (!url) {
    return (
        <div>
            <div>
                <input
                    placeholder='Url'
                    ref={(ref) => textInputRef = ref}
                />
                <button onClick={() => {setUrl(textInputRef.value)}}> Enter </button>
            </div>
            <div>
                <ColorPicker
                    name='home color'
                    defaultValue='#000'
                    // value={this.state.color} - for controlled component
                    onChange={homeColor => homeColor && setHomeColor(homeColor)}

                />
            </div>
            <div>
                <ColorPicker
                    name='away color'
                    defaultValue='#000'
                    // value={this.state.color} - for controlled component
                    onChange={awayColor => awayColor && setAwayColor(awayColor)}

                />
            </div>
        </div>
    );
  }
  return (<Plots url={'https://cors-anywhere.herokuapp.com/' + url} homeColor={homeColor} awayColor={awayColor} />);
}

function Plots({url, homeColor, awayColor}) {
  const [data, setData] = useState();

  useEffect(async () => {
    const data = await scrape_table(url); 
    data.push([homeColor, awayColor]);
    console.log(data);

    setData(data);
  }, []);

  if (!data) return (<div> Loading... </div>);

  return (
    <div className="App">
        <div className="header">
            <Header data={data} />
        </div>
        <div className="homeScore" style={{background: `linear-gradient(to right, ${data[6][0]}, #282c34)`}}>
            <HomeScore data={data} />
        </div>
        <div className="scoreTitle">  
            <ScoreTitle data={data} />
        </div>
        <div className="awayScore" style={{background: `linear-gradient(to left, ${data[6][1]}, #282c34)`}}>
            <AwayScore data={data} />
        </div>
        <div className="lineChart">
            <HockeyPlot data={data} />
        </div>
        <div className="ppGoals">
            <HockeyGraph data={data} />
        </div>
        <div className="ppMin">
            <PenaltyMinutesGraph data={data} />
        </div>
        <div>
            <SavePercentage data={data} />
        </div>
    </div>
  );
}

function getWebsiteHtml(url) {
  return new Promise((resolve, reject) => {
      request(url, function (error, response, html) {
          if (!error && response.statusCode == 200) {
              resolve(html);
          } else {
              console.log(error);
              reject('no');
          }
      });
  });
}

async function scrape_table(url) {
  const html = await getWebsiteHtml(url);
  const $ = cheerio.load(html);
  let shots = [];
  let score = [];
  let penalties = [];
  let teamScore = [];
  let teamNames = [];
  let scores = [];
  //finds each table
  $('html').find('table').each((_, t) => {
      const table = $(t);

      const shotValues = {
          cellpadding: 2,
          cellspacing: 0,
          width: '80%',
          border: 0,
      };

      const tableKeys = Object.keys(table.attr());

      if (Object.keys(shotValues).length === tableKeys.length && tableKeys.every(key => table.attr(key) == `${shotValues[key]}`)) {
          table.find('tr').each((_, row) => {
              const rowValues = [];

              $(row).find('td').each((_, td) => {
                  rowValues.push($(td).html().trim().replace(/&#xA0;/g, ''));
              });

              shots.push(rowValues);
          });
      }

      const scoreValues = {
          cellpadding: 2,
          cellspacing: 0,
          width: '80%',
      };

      if (Object.keys(scoreValues).length === tableKeys.length && tableKeys.every(key => table.attr(key) == `${scoreValues[key]}`)) {
          table.find('tr').each((_, row) => {
              const rowValues = [];

              $(row).find('td').each((_, td) => {
                  rowValues.push($(td).html().trim().replace(/&#xA0;/g, ''));
              });

              score.push(rowValues);
          });
      }

      const penaltyValues = {
          width: '98%',
          border: 0,
          cellspacing: 0,
          cellpadding: 2,
      };

      if (Object.keys(penaltyValues).length === tableKeys.length && tableKeys.every(key => table.attr(key) == `${penaltyValues[key]}`)) {
          table.find('tr').each((_, row) => {
              const rowValues = [];

              $(row).find('td').each((_, td) => {
                  rowValues.push($(td).html().trim().replace(/&#xA0;/g, ''));
              });

              penalties.push(rowValues);
          });
      }

      const teamScoreValues = {
          width: 720,
          border: 0,
          cellspacing: 0,
          cellpadding: 0,
      };

      if (Object.keys(teamScoreValues).length === tableKeys.length && tableKeys.every(key => table.attr(key) == `${teamScoreValues[key]}`)) {
          table.find('tr').each((_, row) => {
              const rowValues = [];

              $(row).find('td').each((_, td) => {
                  rowValues.push($(td).html().trim().replace(/&#xA0;/g, ''));
              });

              teamScore.push(rowValues);
          });
      }
  });

//   let unformattedTeamNames = $(".gameinfo").html().split("<br>")[4].split("<span class=\"big\">");
//   for (let i = 0; i < unformattedTeamNames.length; i++) {
//       let a = unformattedTeamNames[i].replace(/<(.|\n)*?>/g, '');
//       let b = a.replace(/\d\sat\s/g, '');
//       let c = b.trim();
//       teamNames.push(c);
//       let e = a.replace(/\D+/g, '');
//       let f = e.trim();
//       scores.push(f);
//   }
//   teamNames.pop();
//   scores.shift();

  removeItems(teamScore);
  console.log(teamScore);
  makeTime(teamScore);
  getHomeScores(teamScore);
  getCoordinates(shots[2], homeScores);
  getCoordinates(shots[1], awayScores);
  //let finalData = makeJSON(homeScores, awayScores, shots, penalties, teamNames, scores);
  let testData = [[["Home score","1 - 1","1",0.33,3.3,"D.Bound","1"],["Home score","1 - 2","2",1.4,14,"T.Pompu","2"],["Home score","1 - 3","2",1.63,16.3,"K.Peters","3"],["Home score","2 - 4","3",2.02,20.32,"D.Nomerstad","4"],["Home score","2 - 5","3",2.25,24,"C.Van Kommer","5"],["Home score","2 - 6","3",2.58,29.28,"K.Peters","6"]],[["Away score","1 - 0","1",0.26,4.68,"R.Hanson","1"],["Away score","2 - 3","2",1.8900000000000001,32.24,"J.Warner","2"]],[["Shots","1","2","3","T"],["Montana Stat","18","16","15","49"],["Dakota Colle","10","10","16","36"]],[["Power Plays","PP","PIM"],["Montana Stat","0-7","17"],["Dakota Colle","2-6","16"]],["Montana State University","Dakota College"],["2","6"]];
  //return finalData;
  return testData;
}

//removes all unecessary items from array
function removeItems(p1) {
  p1.splice(0,1);
  for (let i = 0; i < p1.length; i++) {
      p1[i].length = 6;
      p1[i].splice(3,1);
      p1[i].splice(1,1);
      //if there are no scores reported return thay key
      if(p1[i][0] === '') {
          //removes all keys after last reported score
          p1.length = i;
      }
  }
  return p1;
}

//converts time from min:sec format to units of time (incorporates periods)
function makeTime (p2) {
  for (let i = 0; i < p2.length; i++) {
      let a = p2[i][2].split(':');
      let b = ((+a[0]) * 60 + (+a[1])) / 1200;
      let seconds = Number(Math.max( Math.round(b * 100) / 100).toFixed(2));
      if (p2[i][1] == 1) {
          let c = seconds;
          p2[i][2] = c;
      }
      else if (p2[i][1] == 2) {
          let d = seconds + 1;
          p2[i][2] = d;
      }
      else if (p2[i][1] == 3) {
          let e = seconds + 2;
          p2[i][2] = e;
      }
      else if (p2[i][1] == 'OT') {
          let f = seconds + 3;
          p2[i][2] = f;
      }
  }
  return p2;
}

//Splits array into two arrays containg home or away scores
function getHomeScores(p3) {
  let score = [];
  score.unshift(['0', '0']);
  for (let i = 0; i < p3.length; i++) {
      let a = p3[i][0].split(' - ');
      score.push(a);
  }
  for (let j = 0; j < p3.length; j++) {
      if (score[j][0] == score[j+1][0]) {
          p3[j].unshift('Home score');
          homeScores.push(p3[j]);
      } else {
          p3[j].unshift('Away score');
          awayScores.push(p3[j]);
      }
  }
  createScoreCount(awayScores);
  createScoreCount(homeScores);
  return p3;
}

function createScoreCount(item) {
  for (let i = 0; i < item.length; i++) {
      item[i].push(String(i + 1));
  }
}




// [DEPRECATED]
// function splitArrayIntoHomeAndAwayScores(p4) {
//     for (let i = 0; i < p4.length; i++) {
//         if(p4[i][0] == 'Home score') {
//             homeScores.push(p4[i]);
//         } else {
//             awayScores.push(p4[i]);
//         }    
//     }
//     return p4, homeScores, awayScores;   
// }

function getCoordinates (shots, p5) {
  for (let i = 0; i < p5.length; i++) {
      if (p5[i][2] == '1') {
          let y1 = +p5[i][3] * +shots[1];
          let z1 = Number(Math.max( Math.round(y1 * 100) / 100).toFixed(2));
          p5[i].splice(4, 0, z1);
      }
      else if (p5[i][2] == '2') {
          let y2 = (+p5[i][3] - 1) * +shots[2] + +shots[1];
          let z2 = Number(Math.max( Math.round(y2 * 100) / 100).toFixed(2));
          p5[i].splice(4, 0, z2);
      }
      else if (p5[i][2] == '3') {
          let y3 = ((+p5[i][3] - 2) * +shots[3]) + (+shots[1] + +shots[2]);
          let z3 = Number(Math.max( Math.round(y3 * 100) / 100).toFixed(2));
          p5[i].splice(4, 0, z3);
      }
      else if (p5[i][2] == 'OT') {
          let y4 = ((+p5[i][3] - 3) * +shots[4]) + (+shots[1] + +shots[2] + +shots[3]);
          let z4 = Number(Math.max( Math.round(y4 * 100) / 100).toFixed(2));
          p5[i].splice(4, 0, z4);
      } else {
          console.log('err');
      }
  }
  return p5;
}

function makeJSON(item, item2, item3, item4, item5, item6) {
  let everything = [item, item2, item3, item4, item5, item6];
  // let myJSON = JSON.stringify(everything);
  // var fs = require('fs');
  // fs.writeFile("test.json", myJSON, function(err) {
  // if (err) {
  //     console.log(err);
  // }
  // });
  return everything;
}


export default App;