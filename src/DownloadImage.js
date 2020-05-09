import React from 'react';

function DownloadImage() {
  return (
    <button
      className="button"
      onClick={() => {
        saveAs(document.getElementsByTagName('canvas')[0].toBlob(), 'file-name.png');
      }}
    >
      Download Image
    </button>
  );
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
