import React, { useState, useEffect } from 'react';

import './App.css';
import OverTime from './OverTime';
import NormalGame from './NormalGame';
import Shootout from './ShootOut';

const request = require('request');
const cheerio = require('cheerio');

let homeScores = [];
let awayScores = [];
let teamColors = [];
let noShots = false;
let overtime = false;
let shootout = [];
let shootoutBool = false;

function App() {
  const [url, setUrl] = useState();
  let textInputRef = React.createRef();

  if (!url) {
    return (
      <div className="contentWrapper">
        
          <p className="h7">
            <strong>Infographics</strong> provide a clean, visually appealing
            way to show game scores and results
          </p>
          <input
            className="field"
            type="url"
            placeholder="Paste in a URL to generate an infographic"
            ref={ref => (textInputRef = ref)}
            onKeyPress={(ev) => {
              console.log(`Pressed keyCode ${ev.key}`);
              if (ev.key === 'Enter') {
                // Do code here
                setUrl(textInputRef.value);
                ev.preventDefault();
              }
            }}
          />
          <button
            className="button"
            onClick={() => {
              setUrl(textInputRef.value);
            }}
          >
            Generate
          </button>
        <p className="h7">
        <strong>Test links:</strong> copy and paste one of the links below into the generator to see an example.</p>
          <kbd>http://pointstreak.com/prostats/gamesheet_full.html?gameid=3390133</kbd><br></br> 
          <kbd>http://pointstreak.com/prostats/gamesheet_full.html?gameid=3388750</kbd><br></br> 
          <kbd>http://pointstreak.com/prostats/gamesheet_full.html?gameid=3424857</kbd><br></br>  
        <p className="h7">
          See <strong>examples</strong> below...
        </p>
      </div>
    );
  }
  return <Plots url={'https://cors-anywhere.herokuapp.com/' + url} />;
}

function Plots({ url }) {
  const [data, setData] = useState();

  async function fetchTableData() {
    const data = await scrape_table(url);
    const filteredData = dataFilter(data);
    console.log(filteredData);
    setData(filteredData);
  }

  useEffect(() => {
    fetchTableData();
  }, []);

  if (!data) return <div> Loading... </div>;
  
  if (shootoutBool === true) {
    return (
      <div className="App">
        <Shootout data={data}/>
      </div>
    );
  } else if (overtime === true) {
    return (
      <div className="App">
        <OverTime data={data}/>
      </div>
    );
  } else {
    return (
      <div className="App">
        <NormalGame data={data}/>
      </div>
    );
  }
}

function getWebsiteHtml(url) {
  return new Promise((resolve, reject) => {
    request(url, function(error, response, html) {
      if (!error && response.statusCode === 200) {
        resolve(html);
      } else {
        console.log(error);
        reject('no');
      }
    });
  });
}

function getColors(homeColor1, awayColor1) {
  let json = require('./test.json');
  let homeColor;
  let awayColor;
  for (let i = 0; i < json.length; i++) {
    if (homeColor1 === json[i][0]) {
      homeColor = json[i][1];
    }
    if (awayColor1 === json[i][0]) {
      awayColor = json[i][1];
    }
  }
  teamColors = [homeColor, awayColor];
}

async function scrape_table(url) {
  homeScores = [];
  awayScores = [];

  const html = await getWebsiteHtml(url);
  const $ = cheerio.load(html);
  let shots = [];
  let score = [];
  let penalties = [];
  let teamScore = [];
  let teamNames = [];
  let scores = [];
  let goalieValues = [];
  // finds each table
  $('html')
    .find('table')
    .each((_, t) => {
      const table = $(t);

      const shotValues = {
        cellpadding: 2,
        cellspacing: 0,
        width: '80%',
        border: 0
      };

      const tableKeys = Object.keys(table.attr());

      if (
        Object.keys(shotValues).length === tableKeys.length &&
        tableKeys.every(key => table.attr(key) === `${shotValues[key]}`)
      ) {
        table.find('tr').each((_, row) => {
          const rowValues = [];

          $(row)
            .find('td')
            .each((_, td) => {
              rowValues.push(
                $(td)
                  .html()
                  .trim()
                  .replace(/&#xA0;/g, '')
              );
            });

          shots.push(rowValues);
        });
      }

      const scoreValues = {
        cellpadding: 2,
        cellspacing: 0,
        width: '80%'
      };

      if (
        Object.keys(scoreValues).length === tableKeys.length &&
        tableKeys.every(key => table.attr(key) === `${scoreValues[key]}`)
      ) {
        table.find('tr').each((_, row) => {
          const rowValues = [];

          $(row)
            .find('td')
            .each((_, td) => {
              rowValues.push(
                $(td)
                  .html()
                  .trim()
                  .replace(/&#xA0;/g, '')
              );
            });

          score.push(rowValues);
        });
      }

      const penaltyValues = {
        width: '98%',
        border: 0,
        cellspacing: 0,
        cellpadding: 2
      };

      if (
        Object.keys(penaltyValues).length === tableKeys.length &&
        tableKeys.every(key => table.attr(key) === `${penaltyValues[key]}`)
      ) {
        table.find('tr').each((_, row) => {
          const rowValues = [];

          $(row)
            .find('td')
            .each((_, td) => {
              rowValues.push(
                $(td)
                  .html()
                  .trim()
                  .replace(/&#xA0;/g, '')
              );
            });

          penalties.push(rowValues);
        });
      }

      const teamScoreValues = {
        width: 720,
        border: 0,
        cellspacing: 0,
        cellpadding: 0
      };

      if (
        Object.keys(teamScoreValues).length === tableKeys.length &&
        tableKeys.every(key => table.attr(key) === `${teamScoreValues[key]}`)
      ) {
        table.find('tr').each((_, row) => {
          const rowValues = [];

          $(row)
            .find('td')
            .each((_, td) => {
              rowValues.push(
                $(td)
                  .html()
                  .trim()
                  .replace(/&#xA0;/g, '')
              );
            });

          teamScore.push(rowValues);
        });
      }

      const goalies = {
        width: '99%',
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      };

      if (
        Object.keys(goalies).length === tableKeys.length &&
        tableKeys.every(key => table.attr(key) === `${goalies[key]}`)
      ) {
        table.find('tr').each((_, row) => {
          const rowValues = [];

          $(row)
            .find('td')
            .each((_, td) => {
              rowValues.push(
                $(td)
                  .html()
                  .trim()
                  .replace(/&#xA0;/g, '')
              );
            });
          const regex = /.*\(win\).*|.*\(loss\).*|.*\(tie\).*|.*\(otl\).*|.*\(sol\).*/g;
          for (let i = 0; i < rowValues.length; i++) {
            if (regex.test(rowValues[i])) {
              goalieValues.push(rowValues[i].replace(/\d+|\(.*\)/g, '').trim());
            }
          }
        });
      }
      
      const shootOutScrape = {
        width: '100%',
        cellspacing: 0,
        cellpadding: 1,
      };
      try {
        if (
          Object.keys(shootOutScrape).length === tableKeys.length &&
          tableKeys.every(key => table.attr(key) === `${shootOutScrape[key]}`)
        ) {
          table.find('tr').each((_, row) => {
            const rowValues = [];
  
            $(row)
              .find('td')
              .each((_, td) => {
                rowValues.push(
                  $(td)
                    .html()
                    .trim()
                    .replace(/&#xA0;/g, '')
                );
              });
              shootout.push(rowValues);
            });
          
            console.log(shootout)
        }
      } catch {
        console.log('Err: No shootout values')
      }
    });

  // Code from here to "end" collects team names and scores
  let unformattedTeamNames = $('.gameinfo')
    .html()
    .split('<br>')[4]
    .split('<span class="big">');
    console.log(unformattedTeamNames)
  for (let i = 0; i < unformattedTeamNames.length; i++) {
    let a = unformattedTeamNames[i].replace(/<(.|\n)*?>/g, '');
    let b = a.replace(/\d\sat\s/g, '');
    let c = b.replace(/\w*M1\w*|\w*M2\w*|\w*M3\w*/g, '');
    let d = c.trim();
    teamNames.push(d);
    let e = a.replace(/(?=at).*$/g, '');
    let f = e.trim()
    scores.push(f);
  }
  teamNames.pop();
  console.log(teamNames)
  scores.shift();

  // Get game date
  let unformattedGameDate = $('.gameinfo')
    .html()
    .split('<br>')[2];
  let gameDate = unformattedGameDate.replace(/, 20\d\d(.*)|\sat\s/g, '');

  // Get shootout results

  shotTableValidator(shots);
  removeItems(teamScore);
  makeTime(teamScore);
  getHomeScores(teamScore);
  getCoordinates(shots[2], homeScores);
  getCoordinates(shots[1], awayScores);
  getColors(teamNames[1], teamNames[0]);
  let finalData = [
    homeScores,
    awayScores,
    shots,
    penalties,
    teamNames,
    scores,
    goalieValues,
    gameDate,
    teamColors,
    noShots,
    shootout,
  ];
  console.log(finalData.noShots)
  return finalData;
}

// removes all unecessary items from array
function removeItems(p1) {
  p1.splice(0, 1);
  for (let i = 0; i < p1.length; i++) {
    p1[i].length = 6;
    p1[i].splice(3, 1);
    p1[i].splice(1, 1);
    //if there are no scores reported return thay key
    if (p1[i][0] === '') {
      //removes all keys after last reported score
      p1.length = i;
    }
  }
  return p1;
}

function shotTableValidator(shotTable) {
   if (shotTable[0].length === 2 && shotTable[0][1] === 'Total') {
      let homeShotPlaceholder = parseInt(shotTable[2][1]) / 3;
      let awayShotPlaceholder = parseInt(shotTable[1][1]) / 3;
      shotTable[0].splice(1, 0, '1');
      shotTable[0].splice(2, 0, '2');
      shotTable[0].splice(3, 0, '3');
      shotTable[1].splice(1, 0, awayShotPlaceholder.toString() );
      shotTable[1].splice(2, 0, awayShotPlaceholder.toString() );
      shotTable[1].splice(3, 0, awayShotPlaceholder.toString() );
      shotTable[2].splice(1, 0, homeShotPlaceholder.toString() );
      shotTable[2].splice(2, 0, homeShotPlaceholder.toString() );
      shotTable[2].splice(3, 0, homeShotPlaceholder.toString() );
    }
    if(shotTable[0][4] === "OT") {
      overtime = true;
    }
    if(shotTable[0][5] === "SO") {
      shootoutBool = true;
    }
    console.log(shotTable)
  return shotTable;
}

// converts time from min:sec format to units of time (incorporates periods)
function makeTime(p2) {
  for (let i = 0; i < p2.length; i++) {
    let a = p2[i][2].split(':');
    let b = (+a[0] * 60 + +a[1]) / 1200;
    let seconds = Number(Math.max(Math.round(b * 100) / 100).toFixed(2));
    if (p2[i][1] === '1') {
      let c = seconds;
      p2[i][2] = c;
    } else if (p2[i][1] === '2') {
      let d = seconds + 1;
      p2[i][2] = d;
    } else if (p2[i][1] === '3') {
      let e = seconds + 2;
      p2[i][2] = e;
    } else if (p2[i][1] === 'OT') {
      let f = seconds + 3;
      p2[i][2] = f;
    }
  }
  return p2;
}

// Splits array into two arrays containg home or away scores
function getHomeScores(p3) {
  let score = [];
  score.unshift(['0', '0']);
  for (let i = 0; i < p3.length; i++) {
    let a = p3[i][0].split(' - ');
    score.push(a);
  }
  for (let j = 0; j < p3.length; j++) {
    if (score[j][0] === score[j + 1][0]) {
      p3[j].unshift('Home score');
      homeScores.push(p3[j]);
    } else {
      p3[j].unshift('Away score');
      awayScores.push(p3[j]);
    }
  }
  createScoreCount(awayScores);
  createScoreCount(homeScores);
}

function createScoreCount(item) {
  item.forEach(i => i.push(`${i + 1}`));
}

function getCoordinates(shots, p5) {
  p5.forEach(v => {
    if (v[2] === '1') {
      let y1 = v[3] * shots[1];
      let z1 = Number(Math.max(Math.round(y1 * 100) / 100).toFixed(2));
      v.splice(4, 0, z1);
    } else if (v[2] === '2') {
      let y2 = (v[3] - 1) * +shots[2] + +shots[1];
      let z2 = Number(Math.max(Math.round(y2 * 100) / 100).toFixed(2));
      v.splice(4, 0, z2);
    } else if (v[2] === '3') {
      let y3 = (v[3] - 2) * +shots[3] + (+shots[1] + +shots[2]);
      let z3 = Number(Math.max(Math.round(y3 * 100) / 100).toFixed(2));
      v.splice(4, 0, z3);
    } else if (v[2] === 'OT') {
      let y4 = (v[3] - 3) * (+shots[4] / 0.25) + (+shots[1] + +shots[2] + +shots[3]);
      let z4 = Number(Math.max(Math.round(y4 * 100) / 100).toFixed(2));
      v.splice(4, 0, z4);
    } else {
      console.log('err');
      console.log(v)
    }
  });
  return p5;
}

function dataFilter(data) {
  //check for shutouts
  if (data[0] === undefined || data[0].length === 0) {
    // array empty or does not exist
    data[0].push(['', '', '', '', '', '', ''])
  }
  if (data[1] === undefined || data[1].length === 0) {
    data[1].push(['', '', '', '', '', '', ''])
  }
  //check team names for a shootout (SHO) and remove that line
  let badValue;
  for (let i = 0; i < data[0].length; i++) {
    for (let j = 0; j < data[0][i].length; j++) {
      if (data[0][i][j] === "SHO") {
        badValue = i;
      }
    }
  }
  for (let i = 0; i < data[1].length; i++) {
    for (let j = 0; j < data[1][i].length; j++) {
      if (data[1][i][j] === "SHO") {
        badValue = i;
      }
    }
  }
  delete data[0][badValue];
  delete data[1][badValue];
  //Shots table filtering
  //check to see if shots table has 5 columns. If there are 5 columns we can assume all is well, if not, do the following...
  if (data[2].length !== 3 || data[2][0].length !== 5) {
    console.log('The shots table is whack ' + data[2][0].length);
    //check to see if shots table was filled out
    if (data[2] === undefined || data[2].length === 0) {
      // array empty or does not exist then some fun stuff is going to happen
      console.log("Err: the shots table is empty")
      data[9] = true;
    }
    if (data[2][0][5] === 'T' && data[2][1][5] === 0 && data[2][1][5] === 0) {
      console.log("Err: No total in the ot shots table")
      data[9] = true;
    }
  }
  //check to make sure the total shots is not zero
  if (data[2][0][4] == 'T' && data[2][1][4] == 0 && data[2][1][4] == 0) {
    console.error("Err: No total in the normal shots table")
    data[9] = true;
  }
  //check to make sure the total shots of OT is not zero
  if (data[2][0][5] == 'T' && data[2][1][5] == 0 && data[2][1][5] == 0) {
    console.error("Err: No total in the OT shots table")
    data[9] = true;
  }
  //check to see if penalty table has 3 columns. If there are 3 columns we can assume all is well, if not, do the following...
  if (data[3][0].length !== 3) {
    console.log('Penalty Table FAILED its check: ' + data[3][0].length);
    data[9] = true;
    // maybe have this stuff search for column names and pass in values if found to make this work with the rest of the app
    // for (let i = 0; i < data[2].length; i++) {
    //   if (data[3][0][i] ){}
    // }
  }else{
    console.log('Penalty Table PASSED its check');
  }
  //check team names to make sure there are two strings here
  if (data[4].length === 2 && data[4].every(function(i){ return typeof i === "string" })) {
    console.log('Team Names PASSED its check');
  }
  //check team scores to make sure there are two ints here
  if (data[5].length === 2 && data[5].every(function(i){ return typeof i === "string" })) {
    console.log('Team Scores PASSED its check');
  }else{
    data[9] = true;
  }
  if (data[6].length === 2 && data[6].every(function(i){ return typeof i === "string" })) {
    console.log('Goalie Name PASSED its check');
  }else{
    //noShots = true;
  }
  //check game date to make sure it's a string and doesn't contain any funky characters
  if (typeof data[7] === "string" && /[~`!#$%^&*+=\-[\]\\';/{}|\\":<>?]/g.test(data[7]) === false) {
    console.log('Game Date PASSED its check');
  }

  return(data);
}


export default App;
