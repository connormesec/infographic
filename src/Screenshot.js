import React from 'react';
import html2canvas from 'html2canvas';


function Screenshot(props) {
    
    
    return (
        <button onClick={() => {
            html2canvas(document.querySelector(".App")).then(canvas => {
                document.body.appendChild(canvas);
                // var download = document.getElementById("download");
                // var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                // download.setAttribute("href", img);
            });
        }}> Enter </button>
    )
    //React.createElement('h1', {}, data.awayTeam + " at " + data.homeTeam);
  }

  function download() {
    var download = document.getElementById("download");
    var image = document.getElementById("myCanvas").toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
    //download.setAttribute("download","archive.png");
    }

  export default Screenshot;