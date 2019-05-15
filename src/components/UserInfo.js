import React from 'react';
import withAuth from '../HOC/withAuth'
import { connect } from 'react-redux'

class UserInfo extends React.Component {

  render(){
    return(
    this.props.currentUser ?
    <div className="mainBody">
    <h1>{this.props.currentUser.first_name} {this.props.currentUser.last_name}</h1>
    <p><b>Username:</b> {this.props.currentUser.username}</p>
    <p><b>Email:</b> {this.props.currentUser.email}</p>
    </div>
    :
    null
    )
  }
}


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps)(withAuth(UserInfo));
