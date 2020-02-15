import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';

function Screenshot() {
  const [shouldDraw, setShouldDraw] = useState(true);
  useEffect(() => {
    document.body.classList.add('hide-scrollbar');
    html2canvas(document.querySelector('.AppBody')).then(canvas => {
      document.querySelector('.AppBody').replaceWith(canvas);
      document.body.classList.remove('hide-scrollbar');
    });

    setShouldDraw(false);
  }, []);

  if (!shouldDraw) return <></>;

  return <div> </div>;
}

export default Screenshot;
