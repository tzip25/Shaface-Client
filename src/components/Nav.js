import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends React.Component {

  // menuClass = () => window.location.pathname === this.props.path ? "item active" : "item"

  render(){
      return(
        <div className="nav">
          <input type="checkbox" id="nav-check"/>
          <div className="nav-header">

          <Link to="/"><div className="nav-title">ShaFace</div></Link>

          </div>
          <div className="nav-btn">
            <label htmlFor="nav-check">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
          
          <div className="nav-links">

          <Link to="/home">Find a Face</Link>

          {
            this.props.currentUser
            ?
            <Link to="/profile">Profile</Link>
            :
            null
          }

          {
            this.props.currentUser
          ?
            <Link to="/login"><div onClick={this.props.logOut}>Logout</div></Link>
          :
            <Link to="/login">Login</Link>
          }


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

export default connect(mapStateToProps)(Nav);
