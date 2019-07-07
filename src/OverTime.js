import React from 'react';
import './App.css';
import Header from './Header';
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
import OvertimePlot from './OvertimePlot';

function OverTime({data}) {
  console.log('overtime')
    if (data[9] === false) {
      return (
        <div>
            <div id="screenshot">
                <Screenshot />
            </div>
            <p class="h7">Your image preview is below. Refresh to start over.</p>
            <DownloadImage />
            <div className="AppBody">
                <div className='topThird'
                    style={{
                        background: `linear-gradient(to right, ${data[8][0]}, #00000000, ${data[8][1]})`
                    }}>
                    <div className="homeWrapper">
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
                    <div className="awayWrapper">
                        <div className="awayLogo">
                            <AwayImage data={data} />
                        </div>
                        <div className="awayScore">
                            <AwayScore data={data} />
                        </div>
                    </div>
                </div> 
                <div className="border">
                </div>
                <div
                    className="homePlayerScores"
                    style={{
                        background: `linear-gradient(to right, ${data[8][0]}, #00000000)`
                    }}
                >
                    <div>
                        <HomePlayerScores data={data} />
                    </div>
                </div>
                <div className="lineChart">
                    <OvertimePlot data={data} />
                </div>
                <div
                    className="awayPlayerScores"
                    style={{
                        background: `linear-gradient(to left, ${data[8][1]}, #00000000)`
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
          <p class="h7">Your image preview is below. Refresh to start over.</p>
          <DownloadImage />
          <div className="AppBody">
          <div className='topThird'
                        style={{
                            background: `linear-gradient(to right, ${data[8][0]} 5%, #00000000, ${data[8][1]} 95%)`
                        }}>
            <div
              className="homeWrapper">
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
              className="awayWrapper">
              <div className="awayLogo">
                <AwayImage data={data} />
              </div>
              <div className="awayScore">
                <AwayScore data={data} />
              </div>
            </div>
          </div>
        </div>
        </div>
    );
    }
  }
  
  export default OverTime;