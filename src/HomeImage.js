import React from 'react';

function HomeImage({ data }) {
  const name = data[4][1].replace(/\s/g, '_');

  return <img src={`images/${name}.png`} />;
}

export default HomeImage;
