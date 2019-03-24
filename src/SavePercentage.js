import React from 'react';
import Plot from 'react-plotly.js';

function formatData(data) {
    const [_, __, shots, ______, ____, score, colors] = data;

    const formattedShots = {
        homeScore: score[1],
        awayScore: score[0],
        homeTotalShots: shots[2][4],
        awayTotalShots: shots[1][4],
        homeSavedShots: [],
        awaySavedShots: [],
        awaySavePercentage: '',
        homeSavePercentage: '',
        homeColor: ['#2d343e', colors[0]],
        awayColor: ['#2d343e', colors[1]],
        homeDonut: [],
        awayDonut: [],
    };

    formattedShots.homeSavedShots = shots[2][4] - score[1];
    formattedShots.awaySavedShots = formattedShots.awayTotalShots - formattedShots.homeScore;
    formattedShots.awaySavePercentage = formattedShots.homeSavedShots / formattedShots.homeTotalShots;
    formattedShots.homeSavePercentage = formattedShots.awaySavedShots / formattedShots.awayTotalShots;
    formattedShots.homeDonut = [score[0], shots[1][4]];
    formattedShots.awayDonut = [score[1], shots[2][4]];
    let m = Math.round(((shots[1][4] - score[0])/shots[1][4]) * 1000) / 1000;
    let n = m.toString();
    formattedShots.homeSavePercentage = n.replace(/^0+/, '');
    let o = Math.round(((shots[2][4] - score[1])/shots[2][4]) * 1000) / 1000;
    let p = o.toString();
    formattedShots.awaySavePercentage = p.replace(/^0+/, '');
    return formattedShots;
}

function SavePercentage(props) {
    const data = formatData(props.data);

    return ( 
        <Plot 
            data = {
            [{
                values: data.homeDonut,
                labels: ["hello", "world"],
                domain: {
                    column: 0
                },
                name: 'GHG Emissions',
                marker: {
                    colors: data.homeColor,
                    line: {
                        color: 'white',
                        width: 2
                    }
                  },
                hole: .6,
                type: 'pie',
                textinfo: 'none'
            }, {
                values: data.awayDonut,
                labels: ['US', 'China'],
                text: data.awaySavePercentage,
                textposition: 'inside',
                domain: {
                    column: 1
                },
                name: 'CO2 Emissions',
                marker: {
                    colors: data.awayColor,
                    line: {
                        color: 'white',
                        width: 2
                    }
                  },
                hole: .6,
                type: 'pie',
                textinfo: 'none',
            }]
        }
        layout = {{
            title: 'Goaltending',
            font: {
                family: 'Courier New, monospace',
                size: 30,
                color: '#ffffff'
            },
            annotations: [{
                    font: {
                        size: 30
                    },
                    showarrow: false,
                    text: data.homeSavePercentage,
                    x: 0.1,
                    y: 0.5,
                },
                {
                    font: {
                        size: 30
                    },
                    showarrow: false,
                    text: data.awaySavePercentage,
                    x: 0.87,
                    y: 0.5
                },
                {
                    font: {
                        size: 20
                    },
                    showarrow: false,
                    text: 'Home Goalie and this is long but will it go off the page',
                    x: 0.0,
                    y: 0,
                },
                {
                    font: {
                        size: 20
                    },
                    showarrow: false,
                    text: 'Away Goalie',
                    x: 1,
                    y: 0,
                }
            ],
            height: 400,
            width: 400,
            margin: {
                l: 40,
                r: 40,
                //pad: 2,
            },
            showlegend: false,
            plot_bgcolor: '#2d343e',
            paper_bgcolor: '#2d343e',
            grid: {
                rows: 1,
                columns: 2
            }
        }}
        />
    );
}
export default SavePercentage;