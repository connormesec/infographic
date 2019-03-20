import React from 'react';

function formatData(data) {
    const [_, __, ___, ____, _____] = data;
    const title = {
        header: "FINAL",
    }
    
    return title;
}  


function Header(props) {
    const data = formatData(props.data);
    return (
        <h2>{data.header}</h2>
    )
  }
  export default Header;