import React from 'react';
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router'

class Nav extends React.Component {

  state = {
    navOpen: false
  }

  linkClass = (path) => window.location.pathname === path ? "activeNav" : null

  toggleNav = () => this.setState(prevState => ({navOpen: !prevState.navOpen}))
  className = () => this.state.navOpen ? "open" : "closed"
  closeNav = () => this.setState(prevState => ({navOpen: false}))
  logOut = () => {
    this.closeNav()
    this.props.logOut()
  }

  render(){
    const token = localStorage.getItem("token")

      return(
        <div className="nav">

          <div className="nav-header">
          <Link to="/">
          <div className="nav-title">
            <img className="navLogo" src={"/whodat_logo.png"} alt="logo" width="17px"/>
            WhoDat
          </div>
          </Link>
          </div>

          <Icon inverted size="large" id="nav-btn" className={this.className()} onClick={this.toggleNav} name="bars" />

          <div className="nav-links">
          <Link onClick={this.closeNav} className={this.linkClass('/about')} to="/about">
            <span className={`${this.linkClass('/about')} mobileShow`}>
            About
            </span>
          </Link>
          
          <Link onClick={this.closeNav} className={this.linkClass('/home')} to="/home">
            <span className={this.linkClass('/home')} >
            Find a Face
            </span>
          </Link>

          { token
            ?
            <Link onClick={this.closeNav} to="/profile">
              <span className={this.linkClass('/profile')} >
                Profile
              </span>
            </Link>
            :
            null }
          { token
          ?
            <Link onClick={this.logOut} to="/">
              Logout
            </Link>
          :
            <Link onClick={this.closeNav} to="/login">
              <span className={this.linkClass('/login')} >
                Login / Sign Up
              </span>
            </Link>
          }
          </div>
        </div>
      )
    }
  }

export default withRouter(Nav)
