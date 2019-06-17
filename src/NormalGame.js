import React from 'react';
import './App.css';
import Header from './Header';
import HockeyPlot from './HockeyPlot';
import HockeyGraph from './HockeyGraph';
import PenaltyMinutesGraph from './penaltyMinutesGraph';
import ScoreTitle from './ScoreTitle';
import SavePercentage from './SavePercentage';
import HomeScore from './HomeScore';
import AwayScore from './AwayScore';
import Screenshot from './Screenshot';
import ShotsGraph from './shotsGraph';
import HomePlayerScores from './HomePlayerScores';
import AwayPlayerScores from './AwayPlayerScores';
import HomeImage from './HomeImage';
import AwayImage from './AwayImage';
import GameDate from './GameDate';
import DownloadImage from './DownloadImage';

function NormalGame({data}) {
  if (data[9] == false) {
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
          <div
            className="homePlayerScores"
            style={{
              background: `linear-gradient(to right, ${data[8][0]}, #282c34)`
            }}
          >
            <div>
              <HomePlayerScores data={data} />
            </div>
          </div>
          <div className="lineChart">
            <HockeyPlot data={data} />
          </div>
          <div
            className="awayPlayerScores"
            style={{
              background: `linear-gradient(to left, ${data[8][1]}, #282c34)`
            }}
          >
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
  } else {
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
}
  
  export default NormalGame;