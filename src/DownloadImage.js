import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';



function DownloadImage() {
    
    return (
        <button onClick={() => {
            
                //saveAs(document.getElementById("canvas").toDataURL(), 'file-name.png');
        
        }}> Create Image </button>
    )

    
    // return (
    //     <button onClick={() => {
    //         html2canvas(document.querySelector(".AppBody")).then(canvas => {
    //             document.querySelector(".AppBody").replaceWith(canvas);
    //             //saveAs(canvas.toDataURL(), 'file-name.png');
    //         });
    //     }}> Create Image </button>
    // )
  }


  function saveAs(uri, filename) {

    var link = document.createElement('a');

    if (typeof link.download === 'string') {

        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);

    } else {

        window.open(uri);

    }
}
  export default DownloadImage;