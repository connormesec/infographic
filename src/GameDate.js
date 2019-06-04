import React from 'react';

function formatData(data) {
    const [_, __, ___, ____, _____, ______, _______, date] = data;
    const gameDate = {
        theDate: date,
    }
    console.log("aaaaaaa" + date);
    return gameDate;
}  


function Date(props) {
    const data = formatData(props.data);
    return (
        <h4>{data.theDate}</h4>
    )
  }
  export default Date;