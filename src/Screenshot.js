import React from 'react';
import html2canvas from 'html2canvas';


function Screenshot(props) {
    
    
    return (
        <button onClick={() => {
            html2canvas(document.querySelector("#root")).then(canvas => {
                document.body.appendChild(canvas)
            });
        }}> Enter </button>
    )
    //React.createElement('h1', {}, data.awayTeam + " at " + data.homeTeam);
  }
  export default Screenshot;