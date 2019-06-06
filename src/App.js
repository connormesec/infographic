import React, { useState, useEffect } from "react";

import "./App.css";
import Header from "./Header";
import HockeyPlot from "./HockeyPlot";
import HockeyGraph from "./HockeyGraph";
import PenaltyMinutesGraph from "./penaltyMinutesGraph";
import ScoreTitle from "./ScoreTitle";
import SavePercentage from "./SavePercentage";
import HomeScore from "./HomeScore";
import AwayScore from "./AwayScore";
import Screenshot from "./Screenshot";
import ShotsGraph from "./shotsGraph";
import HomePlayerScores from "./HomePlayerScores";
import AwayPlayerScores from "./AwayPlayerScores";
import HomeImage from './HomeImage';
import AwayImage from './AwayImage';
import GameDate from './GameDate';
import DownloadImage from "./DownloadImage";

const request = require("request");
const cheerio = require("cheerio");

let homeScores = [];
let awayScores = [];
let homeColor = '';
let awayColor = '';

function App() {
  const [url, setUrl] = useState();
  let textInputRef = React.createRef();

  if (!url) {
    return (
      <div className="contentWrapper">
        <div>
        <p class ="h7"><strong>Infographics</strong> provide a clean, visually appealing way to show game scores and results</p>
          <input className="field" type="url" placeholder="Paste in a URL to generate an infographic" ref={ref => (textInputRef = ref)} />
          <button className="button"
            onClick={() => {setUrl(textInputRef.value);}}>
            Generate
          </button>
        </div>
      </div>
    );
  }
  return (
    <Plots
      url={"https://cors-anywhere.herokuapp.com/" + url}
    />
  );
}

function Plots({ url }) {
  const [data, setData] = useState();

  useEffect(async () => {
    const data = await scrape_table(url);
    getColors(data[4][1], data[4][0]);
    data.push([homeColor, awayColor]);
    console.log(data);

    setData(data);
  }, []);

  if (!data) return <div> Loading... </div>;
  
  return (
    <div className="App">
      <App />
      <div id="screenshot">
        <Screenshot />
      </div>
      <p class="h7">Your image preview is below</p>
      <DownloadImage />
      <div className="AppBody">
        <div className="homeWrapper" style={{background: `linear-gradient(to right, ${data[8][0]}, #282c34)`}}>
          <div className="homeLogo">
            <HomeImage data={data} />
          </div>
          <div className="homeScore">
            <HomeScore data={data} />
          </div>
        </div>
        <div className="middleWrapper">
          <div className="header">
            <Header data={data} />
          </div>
          <div className="scoreTitleWrapper">
           <div className="scoreTitle">
              <ScoreTitle data={data} />
            </div>
            <div className="scoringSummaryTitle">
             <GameDate data={data} />
            </div>
          </div>
        </div>
        <div className="awayWrapper" style={{background: `linear-gradient(to left, ${data[8][1]}, #282c34)`}}>
        <div className="awayLogo">
          <AwayImage data={data} />
        </div>
        <div className="awayScore">
          <AwayScore data={data} />
        </div>
        </div>
        <div className="homePlayerScores" style={{background: `linear-gradient(to right, ${data[8][0]}, #282c34)`}}>
          <div>
            <HomePlayerScores data={data} />
          </div>
        </div>
        <div className="lineChart">
          <HockeyPlot data={data} />
        </div>
        <div className="awayPlayerScores" style={{background: `linear-gradient(to left, ${data[8][1]}, #282c34)`}}>
          <div>
            <AwayPlayerScores data={data} />
          </div>
        </div>
        <div className="ppGoals">
          <HockeyGraph data={data} />
        </div>
        <div className="ppMin">
          <PenaltyMinutesGraph data={data} />
        </div>
        <div className="shotsGraph">
          <ShotsGraph data={data} />
        </div>
        <div className="savePercentage">
          <SavePercentage data={data} />
        </div>
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
        reject("no");
      }
    });
  });
}

function getColors(homeColor1, awayColor1) {
  let json = require('./test.json');
  console.log(json);
  for (let i = 0; i < json.length; i++) {
    if (homeColor1 == json[i][0]) {
      homeColor = json[i][1]
    } 
    if (awayColor1 == json[i][0]) {
      awayColor = json[i][1]
    }
  }
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
  let goalieValues = [];
  //finds each table
  $("html")
    .find("table")
    .each((_, t) => {
      const table = $(t);

      const shotValues = {
        cellpadding: 2,
        cellspacing: 0,
        width: "80%",
        border: 0
      };

      const tableKeys = Object.keys(table.attr());

      if (
        Object.keys(shotValues).length === tableKeys.length &&
        tableKeys.every(key => table.attr(key) == `${shotValues[key]}`)
      ) {
        table.find("tr").each((_, row) => {
          const rowValues = [];

          $(row)
            .find("td")
            .each((_, td) => {
              rowValues.push(
                $(td)
                  .html()
                  .trim()
                  .replace(/&#xA0;/g, "")
              );
            });

          shots.push(rowValues);
        });
      }

      const scoreValues = {
        cellpadding: 2,
        cellspacing: 0,
        width: "80%"
      };

      if (
        Object.keys(scoreValues).length === tableKeys.length &&
        tableKeys.every(key => table.attr(key) == `${scoreValues[key]}`)
      ) {
        table.find("tr").each((_, row) => {
          const rowValues = [];

          $(row)
            .find("td")
            .each((_, td) => {
              rowValues.push(
                $(td)
                  .html()
                  .trim()
                  .replace(/&#xA0;/g, "")
              );
            });

          score.push(rowValues);
        });
      }

      const penaltyValues = {
        width: "98%",
        border: 0,
        cellspacing: 0,
        cellpadding: 2
      };

      if (
        Object.keys(penaltyValues).length === tableKeys.length &&
        tableKeys.every(key => table.attr(key) == `${penaltyValues[key]}`)
      ) {
        table.find("tr").each((_, row) => {
          const rowValues = [];

          $(row)
            .find("td")
            .each((_, td) => {
              rowValues.push(
                $(td)
                  .html()
                  .trim()
                  .replace(/&#xA0;/g, "")
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
        tableKeys.every(key => table.attr(key) == `${teamScoreValues[key]}`)
      ) {
        table.find("tr").each((_, row) => {
          const rowValues = [];

          $(row)
            .find("td")
            .each((_, td) => {
              rowValues.push(
                $(td)
                  .html()
                  .trim()
                  .replace(/&#xA0;/g, "")
              );
            });

          teamScore.push(rowValues);
        });
      }

      const goalies = {
        width: "99%",
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      };

      if (
        Object.keys(goalies).length === tableKeys.length &&
        tableKeys.every(key => table.attr(key) == `${goalies[key]}`)
      ) {
        table.find("tr").each((_, row) => {
          const rowValues = [];

          $(row)
            .find("td")
            .each((_, td) => {
              rowValues.push(
                $(td)
                  .html()
                  .trim()
                  .replace(/&#xA0;/g, "")
              );
            });

          const regex = RegExp(".*(win).*|.*(loss).*", "g");
          for (let i = 0; i < rowValues.length; i++) {
            if (regex.test(rowValues[i])) {
              goalieValues.push(rowValues[i].replace(/\d+|\(.*\)/g, "").trim());
            }
          }
        });
      }
    });

    //Code from here to "end" collects team names and scores
    let unformattedTeamNames = $(".gameinfo").html().split("<br>")[4].split("<span class=\"big\">");
    for (let i = 0; i < unformattedTeamNames.length; i++) {
        let a = unformattedTeamNames[i].replace(/<(.|\n)*?>/g, '');
        let b = a.replace(/\d\sat\s/g, '');
        let c = b.trim();
        teamNames.push(c);
        let e = a.replace(/\D+/g, '');
        let f = e.trim();
        scores.push(f);
    }
    teamNames.pop();
    scores.shift();
    //end
    let unformattedGameDate = $(".gameinfo").html().split("<br>")[2];
    let gameDate = unformattedGameDate.replace(/, 20\d\d(.*)/g, '');

  removeItems(teamScore);
  makeTime(teamScore);
  getHomeScores(teamScore);
  getCoordinates(shots[2], homeScores);
  getCoordinates(shots[1], awayScores);
  let finalData = [homeScores, awayScores, shots, penalties, teamNames, scores, goalieValues, gameDate];
  // let testData = [
  //   [
  //     ["Home score", "2 - 1", "1", 0.96, 10.56, "R.Hanson", "1"],
  //     ["Home score", "2 - 2", "2", 1.03, 11.54, "R.Perius", "2"],
  //     ["Home score", "2 - 3", "2", 1.34, 17.12, "R.Hanson", "3"],
  //     ["Home score", "2 - 4", "2", 1.3599999999999999, 17.48, "C.Stefan", "4"],
  //     ["Home score", "2 - 5", "3", 2.4699999999999998, 31.82, "T.Padden", "5"]
  //   ],
  //   [
  //     ["Away score", "1 - 0", "1", 0.77, 5.39, "B.LaRue", "1"],
  //     ["Away score", "2 - 0", "1", 0.93, 6.51, "B.LaRue", "2"]
  //   ],
  //   [
  //     ["Shots", "1", "2", "3", "T"],
  //     ["Eastern Wash", "7", "8", "13", "28"],
  //     ["Montana Stat", "11", "18", "6", "35"]
  //   ],
  //   [
  //     ["Power Plays", "PP", "PIM"],
  //     ["Eastern Wash", "0-5", "34"],
  //     ["Montana Stat", "2-8", "22"]
  //   ],
  //   ["Eastern Washington University", "Montana State University"],
  //   ["2", "5"],
  //   ["A.Kirby", "C.Butler"]
  // ];
  return finalData;
  //return testData;
}

//removes all unecessary items from array
function removeItems(p1) {
  p1.splice(0, 1);
  for (let i = 0; i < p1.length; i++) {
    p1[i].length = 6;
    p1[i].splice(3, 1);
    p1[i].splice(1, 1);
    //if there are no scores reported return thay key
    if (p1[i][0] === "") {
      //removes all keys after last reported score
      p1.length = i;
    }
  }
  return p1;
}

//converts time from min:sec format to units of time (incorporates periods)
function makeTime(p2) {
  for (let i = 0; i < p2.length; i++) {
    let a = p2[i][2].split(":");
    let b = (+a[0] * 60 + +a[1]) / 1200;
    let seconds = Number(Math.max(Math.round(b * 100) / 100).toFixed(2));
    if (p2[i][1] == 1) {
      let c = seconds;
      p2[i][2] = c;
    } else if (p2[i][1] == 2) {
      let d = seconds + 1;
      p2[i][2] = d;
    } else if (p2[i][1] == 3) {
      let e = seconds + 2;
      p2[i][2] = e;
    } else if (p2[i][1] == "OT") {
      let f = seconds + 3;
      p2[i][2] = f;
    }
  }
  return p2;
}

//Splits array into two arrays containg home or away scores
function getHomeScores(p3) {
  let score = [];
  score.unshift(["0", "0"]);
  for (let i = 0; i < p3.length; i++) {
    let a = p3[i][0].split(" - ");
    score.push(a);
  }
  for (let j = 0; j < p3.length; j++) {
    if (score[j][0] == score[j + 1][0]) {
      p3[j].unshift("Home score");
      homeScores.push(p3[j]);
    } else {
      p3[j].unshift("Away score");
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

function getCoordinates(shots, p5) {
  for (let i = 0; i < p5.length; i++) {
    if (p5[i][2] == "1") {
      let y1 = +p5[i][3] * +shots[1];
      let z1 = Number(Math.max(Math.round(y1 * 100) / 100).toFixed(2));
      p5[i].splice(4, 0, z1);
    } else if (p5[i][2] == "2") {
      let y2 = (+p5[i][3] - 1) * +shots[2] + +shots[1];
      let z2 = Number(Math.max(Math.round(y2 * 100) / 100).toFixed(2));
      p5[i].splice(4, 0, z2);
    } else if (p5[i][2] == "3") {
      let y3 = (+p5[i][3] - 2) * +shots[3] + (+shots[1] + +shots[2]);
      let z3 = Number(Math.max(Math.round(y3 * 100) / 100).toFixed(2));
      p5[i].splice(4, 0, z3);
    } else if (p5[i][2] == "OT") {
      let y4 =
        (+p5[i][3] - 3) * +shots[4] + (+shots[1] + +shots[2] + +shots[3]);
      let z4 = Number(Math.max(Math.round(y4 * 100) / 100).toFixed(2));
      p5[i].splice(4, 0, z4);
    } else {
      console.log("err");
    }
  }
  return p5;
}

function isURL(str) {
  let pattern = new RegExp('^((ft|htt)ps?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?'+ // port
  '(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
  '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
}

export default App;