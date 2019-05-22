import React from 'react';
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

class Nav extends React.Component {

  state = {
    navOpen: false
  }

  linkClass = (path) => window.location.pathname === path ? "activeNav" : null

  toggleNav = () => this.setState(prevState => ({navOpen: !prevState.navOpen}))
  className = () => this.state.navOpen ? "open" : "closed"
  closeNav = () => this.setState(prevState => ({navOpen: false}))
  logOut = () => {
    this.setState(prevState => ({navOpen: false}))
    this.props.logOut()

  }

  render(){
    const token = localStorage.getItem("token")

      return(
        <div className="nav">

          <div className="nav-header">
          <Link to="/">
          <div className="nav-title">
            <img className="navLogo" src={'/Shaface-Logo.png'} alt="logo" width="17px"/>
            ShaFace
          </div>
          </Link>
          </div>

          <Icon inverted size="large" id="nav-btn" className={this.className()} onClick={this.toggleNav} name="bars" />

          <div className="nav-links">
          {
            token
          ?
            <Link onClick={this.logOut} to="/">
              Logout
            </Link>
          :
            <Link onClick={this.closeNav} to="/login">
              <span className={this.linkClass('/login')} >
                Login
              </span>
            </Link>
          }

          {
            token
            ?
            <Link onClick={this.closeNav} to="/profile">
              <span className={this.linkClass('/profile')} >
                Profile
              </span>
            </Link>
            :
            null
          }
          <Link onClick={this.closeNav} className={this.linkClass('/home')} to="/home">
            <span className={this.linkClass('/home')} >
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
