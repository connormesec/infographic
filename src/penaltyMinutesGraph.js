import React from 'react';
import Plot from 'react-plotly.js';

function formatData(data) {
  const penalties = data[3];
  const colors = data[8];

  const formattedPenaltyMinutes = {
    homePenaltyMinutesTitle: [],
    awayPenaltyMinutesTitle: [],
    homePenaltyMinutes: [],
    awayPenaltyMinutes: [],
    homeColor: colors[0],
    awayColor: colors[1],
    opacity: [1],
  };

  formattedPenaltyMinutes.awayPenaltyMinutesTitle = [penalties[1][2]];
  formattedPenaltyMinutes.homePenaltyMinutesTitle = [penalties[2][2]];
  formattedPenaltyMinutes.awayPenaltyMinutes = [penalties[1][2]];
  formattedPenaltyMinutes.homePenaltyMinutes = [penalties[2][2]];
  console.log(formattedPenaltyMinutes.homePenaltyMinutes)

  //handle cases where there are no penalties
  if (formattedPenaltyMinutes.homePenaltyMinutes === 0 && formattedPenaltyMinutes.awayPenaltyMinutes === 0) {
    formattedPenaltyMinutes.homePenaltyMinutes = [1];
    formattedPenaltyMinutes.awayPenaltyMinutes = [1];
    formattedPenaltyMinutes.opacity = [0];
    console.log("hit the if")
  }
  
  return formattedPenaltyMinutes;
}

function PenaltyMinutesGraph(props) {
  const data = formatData(props.data);

  return (
    <Plot
      data={[
        //Home Team Shots
        {
          x: [data.homePenaltyMinutesTitle + '\u200b'],
          y: data.homePenaltyMinutes,
          type: 'bar',
          mode: 'lines+points',
          marker: {
            color: data.homeColor,
            opacity: data.opacity,
            line: { color: 'white', width: 2, opacity: data.opacity, }
          }
        },
        //Away Team Shots
        {
          x: [data.awayPenaltyMinutesTitle],
          y: data.awayPenaltyMinutes,
          type: 'bar',
          mode: 'lines+points',
          marker: {
            color: data.awayColor,
            opacity: data.opacity,
            line: { color: 'white', width: 2, opacity: data.opacity, }
          }
        }
      ]}
      layout={{
        width: 300,
        height: 300,
        barmode: 'stack',
        margin: { t: 20 },
        font: { family: 'Courier New, monospace', size: 30, color: 'white' },
        plot_bgcolor: '#00000000',
        paper_bgcolor: '#00000000',
        showlegend: false,
        xaxis: {
          color: 'white',
          autotick: true,
          tickmode: 'array',
          type: 'category',
          showgrid: false,
          showline: false,
          title: {
            text: 'Penalty Minutes',
            font: { family: 'Courier New, monospace', size: 25, color: 'white' }
          }
        },
        yaxis: {
          color: 'white',
          zerolinewidth: 4,
          showgrid: false,
          showline: false,
          showticklabels: false
        }
      }}
      config = {{
        staticPlot: true,
        displayModeBar: false,
      }}
    />
  );
}

export default PenaltyMinutesGraph;
