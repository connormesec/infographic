import React from 'react';

function HomeImage({ data }) {
  
  return <img src={`images/${data.additional.home.name}.png`} alt={`Away team logo`} />;
}

export default HomeImage;
