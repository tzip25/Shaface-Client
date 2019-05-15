import React from 'react';
import withAuth from '../HOC/withAuth'
import UserInfo from './UserInfo'

class Profile extends React.Component {

  render(){
    return(
    <UserInfo/>
    )
  }
}


export default withAuth(Profile)
