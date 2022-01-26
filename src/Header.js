import React from 'react';

function Header({data}) {
  const status = data.highLevelStats.details.status; 
  if (/.*SO.*/.test(status)) {
    return ( <h2 style={{fontSize: `75px`, paddingTop: `60px`}}>FINAL/SO</h2> );
  }
  else if (/.*OT.*/.test(status)) {
    return ( <h2 style={{fontSize: `75px`, paddingTop: `60px`}}>FINAL/OT</h2> );
  } else {
    return ( <h2 style={{fontSize: `130px`, paddingTop: `30px`}}>FINAL</h2> );
  }
}
export default Header;
