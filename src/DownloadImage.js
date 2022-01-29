import React from 'react';

function DownloadImage(props) {
  const data = props.data;
  let fileName = `${data.highLevelStats.homeTeam.info.abbreviation}vs${data.highLevelStats.visitingTeam.info.abbreviation}_${data.highLevelStats.details.GameDateISO8601.split('T')[0]}.png`;
  return (
    <button
      className="button"
      id="download_button"
      onClick={() => {
        downloadCanvasAsImage(fileName);
      }}
    >
      Download Image
    </button>
  );
}

function downloadCanvasAsImage(fileName) {
  let downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', fileName);
  let canvas = document.getElementsByTagName('canvas')[0];
  canvas.toBlob(function(blob) {
    let url = URL.createObjectURL(blob);
    console.log(url)
    downloadLink.setAttribute('href', url);
    downloadLink.click();
  },'image/jpeg', 0.5);
}

export default DownloadImage;
