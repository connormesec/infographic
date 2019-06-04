import React from 'react';
import Plot from 'react-plotly.js';
import { withTheme } from '@material-ui/core';

function formatData(data) {
    const [_, __, shots, ______, ____, score, goalies, _______, colors ] = data;

    const formattedShots = {
        homeScore: score[1],
        awayScore: score[0],
        homeTotalShots: shots[2][4],
        awayTotalShots: shots[1][4],
        homeSavedShots: [],
        awaySavedShots: [],
        awaySavePercentage: '',
        homeSavePercentage: '',
        homeColor: colors[0],
        awayColor: colors[1],
        homeDonut: [],
        awayDonut: [],
        homeGoalie: [goalies[1]],
        awayGoalie: [goalies[0]],
    };

    formattedShots.homeSavedShots = shots[2][4] - score[1];
    formattedShots.awaySavedShots = formattedShots.awayTotalShots - formattedShots.homeScore;
    formattedShots.awaySavePercentage = formattedShots.homeSavedShots / formattedShots.homeTotalShots;
    formattedShots.homeSavePercentage = formattedShots.awaySavedShots / formattedShots.awayTotalShots;
    formattedShots.homeDonut = [score[0], shots[1][4]];
    formattedShots.awayDonut = [score[1], shots[2][4]];
    let m = Math.round(((shots[1][4] - score[0])/shots[1][4]) * 100) / 100;
    let n = m.toString();
    formattedShots.homeSavePercentage = n.replace(/^0+/, '');
    let o = Math.round(((shots[2][4] - score[1])/shots[2][4]) * 100) / 100;
    let p = o.toString();
    formattedShots.awaySavePercentage = p.replace(/^0+/, '');
    return formattedShots;
}

function SavePercentage(props) {
    const data = formatData(props.data);

    return ( 
        <Plot 
            data = {
            [
                {
                    x: [data.homeSavePercentage + "\u200b"],
                    y: [data.homeSavePercentage],
                    type: 'bar',
                    mode: 'lines+points',
                    text: data.homeGoalie,
                    textposition: 'auto',
                    hoverinfo: 'none',
                    marker: { 
                      color: data.homeColor,
                      line: {
                        color: 'white',
                        width: 2,
                      }
                    }
                },
                {
                    x: [data.homeSavePercentage + "\u200b"],
                    y: [1 - data.homeSavePercentage],
                    type: 'bar',
                    mode: 'lines+points',
                    marker: { 
                        color: 'grey',
                        opacity: 0.2,
                        line: {
                          color: 'white',
                          width: 2,
                        },
                    },
                },
                {
                    x: [data.awaySavePercentage],
                    y: [data.awaySavePercentage],
                    type: 'bar',
                    mode: 'lines+points',
                    text: data.awayGoalie,
                    textposition: 'auto',
                    hoverinfo: 'none',
                    marker: { 
                      color: data.awayColor,
                      line: {
                        color: 'white',
                        width: 2,
                      }
                    }
                },
                {
                    x: [data.awaySavePercentage],
                    y: [1 - data.awaySavePercentage],
                    type: 'bar',
                    mode: 'lines+points',
                    marker: { 
                        color: 'grey',
                        opacity: 0.2,
                        line: {
                          color: 'white',
                          width: 2,
                        },
                    },
                },
            ]
        }
        layout={{
            width: 300,
            height: 300,
            barmode: 'stack',
            margin: {
                t: 20,
            },
            font: {
                family: 'Courier New, monospace',
                size: 30,
                color: '#ffffff'
            },
            plot_bgcolor: '#282c34',
            paper_bgcolor: '#282c34',
            showlegend: false,
            xaxis: {
              color: 'white',
              autotick: true,
              tickmode: 'array',
              type: "category",
            },
            xaxis: {
                color: 'white',
                autotick: true,
                tickmode: 'array',
                type: "category",
                showgrid: false,
                showline: false,
                title: {
                  text: 'Goaltending',
                  font: {
                    family: 'Courier New, monospace',
                    size: 25,
                    color: 'white',
                  }
                },
              },
            yaxis: { 
              color: 'white',
              zerolinewidth: 4, 
              showgrid: false,
              showline: false,
              showticklabels: false,
              textangle: 45,
            },
          }}
        />
    );
}
export default SavePercentage;