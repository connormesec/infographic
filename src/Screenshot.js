import React from 'react';
import html2canvas from 'html2canvas';


function Screenshot(props) {
    
    
    return (
        <button onClick={() => {
            html2canvas(document.querySelector(".AppBody")).then(canvas => {
                document.body.appendChild(canvas);
            });
        }}> Create Image </button>
    )
    //React.createElement('h1', {}, data.awayTeam + " at " + data.homeTeam);
  }
  export default Screenshot;