import React, { useState, useEffect } from 'react';

import './App.css';
import OverTime from './OverTime';
import NormalGame from './NormalGame';
import Shootout from './ShootOut';
import homeimage from './homePageImage.png';
import $ from 'jquery';
import BoxGraphic from './BoxGraphic';

const axios = require('axios');

let homeScores = [];
let awayScores = [];
let teamColors = [];
let noShots = false;
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
          placeholder="Paste in a game ID to generate an infographic"
          ref={ref => (textInputRef = ref)}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
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
        <p className="h8">
          <strong>Test links:</strong> copy and paste one of the links below into the generator to see an example.</p>
        <kbd>http://pointstreak.com/prostats/gamesheet_full.html?gameid=3390133</kbd><br></br>
        <kbd>http://pointstreak.com/prostats/gamesheet_full.html?gameid=3388750</kbd><br></br>
        <kbd>http://pointstreak.com/prostats/gamesheet_full.html?gameid=3424857</kbd><br></br>
        <p className="h8">
          See the <strong>example</strong> below...
        </p>
        <img src={homeimage} alt={''}></img>
      </div>
    );
  }
  return <Plots url={url} />;
}

async function getStats(id) {
  const url = `https://ncsxqe21t6.execute-api.us-east-2.amazonaws.com/default/getGameInfoAPI?game_id=${id}`;
  const response = await axios.get(url).catch((error) => {
    console.error(error);
  });
  return response.data
}

function Plots({ url }) {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      let tempData = await getStats(url);
      Object.assign(tempData, { additional: getTeamLogoAndColors(tempData.highLevelStats.homeTeam.info.name, tempData.highLevelStats.visitingTeam.info.name) });
      setData(tempData);
    }
    fetchData();
  }, []);

  if (!data) return <div> Loading... </div>;
  console.log(data)
  
  //set overtime to true of status has "OT" in it
  let overtime = false



  if (shootoutBool === true) {
    return (
      <div className="App">
        <Shootout data={data} />
      </div>
    );
  } else if (overtime === true) {
    return (
      <div className="App">
        <OverTime data={data} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <BoxGraphic data={data} />
        <NormalGame data={data} />
      </div>
    );
  }
}


function getTeamLogoAndColors(homeName, awayName) {
  let json = require('./test.json');
  let tempHomeArr = [];
  let tempAwayArr = [];
  for (let i = 0; i < json.length; i++) {
    tempHomeArr.push({
      name: json[i][0],
      score: similarity(homeName, json[i][0]),
      color: json[i][1]
    });
    tempAwayArr.push({
      name: json[i][0],
      score: similarity(awayName, json[i][0]),
      color: json[i][1]
    });
  }
  let homeres = Math.max.apply(Math, tempHomeArr.map(function (o) { return o.score; }))
  let homeNameHighScore = tempHomeArr.find(function (o) { return o.score == homeres; })

  let awayres = Math.max.apply(Math, tempAwayArr.map(function (o) { return o.score; }))
  let awayNameHighScore = tempAwayArr.find(function (o) { return o.score == awayres; })

  return {
    home: {
      name: homeNameHighScore.name.replace(/\s/g, '_'),
      color: homeNameHighScore.color
    },
    away: {
      name: awayNameHighScore.name.replace(/\s/g, '_'),
      color: awayNameHighScore.color
    }
  }


  function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  }
  function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = [];
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }
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

export default App;
