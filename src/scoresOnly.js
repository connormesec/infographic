import React from 'react';
import './App.css';
import Header from './Header';
import ScoreTitle from './ScoreTitle';
import HomeScore from './HomeScore';
import AwayScore from './AwayScore';
import Screenshot from './Screenshot';
import HomeImage from './HomeImage';
import AwayImage from './AwayImage';
import GameDate from './GameDate';
import DownloadImage from './DownloadImage';

function ScoresOnly({data}) {
    
    return (
        <div>
        <div id="screenshot">
          <Screenshot />
        </div>
        <p class="h7">Your image preview is below</p>
        <DownloadImage />
        <div className="AppBody">
          <div
            className="homeWrapper"
            style={{
              background: `linear-gradient(to right, ${data[8][0]}, #282c34)`
            }}
          >
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
          <div
            className="awayWrapper"
            style={{
              background: `linear-gradient(to left, ${data[8][1]}, #282c34)`
            }}
          >
            <div className="awayLogo">
              <AwayImage data={data} />
            </div>
            <div className="awayScore">
              <AwayScore data={data} />
            </div>
          </div>
      </div>
      </div>
    );
    }
  
  export default ScoresOnly;