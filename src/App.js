import React, { useState, useEffect } from 'react';
import './App.css';
import HockeyPlot from './HockeyPlot';
import HockeyGraph from './HockeyGraph';
import PenaltyMinutesGraph from './penaltyMinutesGraph';

const request = require('request');
const cheerio = require('cheerio');

let homeScores = [];
let awayScores = [];

function App() {
  const [url, setUrl] = useState();
  let textInputRef = React.createRef();

  if (!url) {
    return (
      <div>
        <input
          placeholder='Url'
          ref={(ref) => textInputRef = ref}
        />
        <button
          onClick={() => setUrl(textInputRef.value)}
        > Enter </button>
      </div>
    );
  }

  return (<Plots url={'https://cors-anywhere.herokuapp.com/' + url} />);
}

function Plots(url) {
  const [data, setData] = useState();

  useEffect(async () => {
    const data = await scrape_table(url);

    console.log(`data ${data}`);

    setData(data);
  }, []);

  if (!data) return (<div> Loading... </div>);

  return (
    <div className="App">
      <div class="lineChart">
        <HockeyPlot data={data} />
      </div>
      <div class="ppGoals">
        <HockeyGraph data={data} />
      </div>
      <div class="ppMin">
        <PenaltyMinutesGraph data={data} />
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
  removeItems(teamScore);
  makeTime(teamScore);
  getHomeScores(teamScore);
  getCoordinates(shots[2], homeScores);
  getCoordinates(shots[1], awayScores);
  console.log(homeScores);
  console.log(awayScores);
  let finalData = makeJSON(homeScores, awayScores, shots, penalties);
  let testData = [[["Home score", "1 - 1", "2", 1.3599999999999999, 22.4, "S.Coulter", "1"], ["Home score", "1 - 2", "2", 1.3900000000000001, 22.85, "J.Warner", "2"], ["Home score", "2 - 3", "3", 2.22, 36.4, "J.Forbes", "3"], ["Home score", "2 - 4", "3", 2.41, 40.2, "L.Bing", "4"], ["Home score", "2 - 5", "3", 2.46, 41.2, "R.Hanson", "5"], ["Home score", "2 - 6", "3", 2.81, 48.2, "J.Pilskalns", "6"]], [["Away score", "1 - 0", "2", 1.07, 4.28, "B.Rutherford", "1"], ["Away score", "2 - 2", "2", 1.8199999999999998, 7.28, "R.Bagley", "2"]], [["Shots", "1", "2", "3", "T"], ["Montana Tech", "4", "4", "5", "13"], ["Montana Stat", "17", "15", "20", "52"]], [["Power Plays", "PP", "PIM"], ["Montana Tech", "1-7", "20"], ["Montana Stat", "3-9", "16"]]];
  //return finalData;
  return testData;
  //return [data1, data2];

  // console.log(shots);
  // console.log(score);
  // console.log(penalties);
  // console.log(teamScore);
  // console.log(awayScores);
  // console.log(homeScores);
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

function makeJSON(item, item2, item3, item4) {
  let everything = [item, item2, item3, item4];
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