import React from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

class Nav extends React.Component {

  menuClass = (path) => window.location.pathname === path ? "activeNav" : null

  render(){
    const token = localStorage.getItem("token")

      return(
        <div className="nav">
          <input type="checkbox" id="nav-check"/>
          <div className="nav-header">

          <Link to="/">
          <div className="nav-title">
            <img className="navLogo" src={'/Shaface-Logo.png'} alt="logo" width="20px"/>
            ShaFace
          </div>
          </Link>

          </div>
          <div className="nav-btn">
            <label htmlFor="nav-check">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>

          <div className="nav-links">

          {
            token
          ?
            <Link onClick={this.props.logOut} to="/">
              Logout
            </Link>
          :
            <Link to="/login">
              <span className={this.menuClass('/login')} >
                Login
              </span>
            </Link>
          }

          {
            token
            ?
            <Link to="/profile">
              <span className={this.menuClass('/profile')} >
                Profile
              </span>
            </Link>
            :
            null
          }
          <Link className={this.menuClass('/home')} to="/home">
            <span className={this.menuClass('/home')} >
            Find a Face
            </span>
          </Link>

          </div>
        </div>
      )
    }
  }

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps)(withRouter(Nav));
