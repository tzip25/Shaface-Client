import React from 'react';

class Loading extends React.Component {

  render(){
    return(
      <div className="LoadingDiv">
      <h1 className="pulsate">Finding Likely Faces</h1>
      <br/>
      <img className="rotate" width="200px" src={'/Shaface-Logo.png'} alt="loading screen"/>
      </div>
    )
  }
}


export default Loading
