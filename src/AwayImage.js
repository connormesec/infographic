import React from 'react';

function formatData(data) {
    const [_, __, ___, ____, teamNames] = data;
    const awayTeamName = {
        name: teamNames[0].replace(/\s/g, "_"),
    }
    console.log(awayTeamName);
    return awayTeamName;
}  


function AwayImage(props) {
    const data = formatData(props.data);
    //document.getElementById('homeImageBox').src = 'images/' + data.name + '.png';
    //document.write('<img src="images/' data.name '.png"></img>');
    return (
        <img src={`images/${data.name}.png`}/>
    )
  }
  export default AwayImage;
 