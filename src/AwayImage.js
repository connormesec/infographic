import React from 'react';

function AwayImage(props) {
  const data = props.data;
  
  return <img src={`images/${data.additional.away.name}.png`} alt={`Away team logo`} />;
  
}

export default AwayImage;
