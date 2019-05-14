import React from 'react';
import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'

class Nav extends React.Component {

  render(){
    // if(this.props.currentUser){
    return(
      <div className="nav">
        <input type="checkbox" id="nav-check"/>
        <div className="nav-header">
          <div className="nav-title">
            ShaFace
          </div>
        </div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <div className="nav-links">
        <Link to="/home">
          Find a Face
        </Link>
        <Link to="/profile">
          Profile
        </Link>
        </div>
      </div>
    )
  }
}

export default Nav
