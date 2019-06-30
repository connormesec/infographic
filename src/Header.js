import React from 'react';

function Header({data}) {
  const shots = data[2]; 
  if (shots[0][5] == "SO") {
    return ( <h2 style={{fontSize: `75px`, paddingTop: `60px`}}>FINAL/SO</h2> );
  }
  else if (shots[0][4] == "OT") {
    return ( <h2 style={{fontSize: `75px`, paddingTop: `60px`}}>FINAL/OT</h2> );
  } else {
    return ( <h2 style={{fontSize: `130px`, paddingTop: `30px`}}>FINAL</h2> );
  }
}
export default Header;
