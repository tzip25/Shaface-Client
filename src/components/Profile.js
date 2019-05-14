import React from 'react';
import withAuth from '../HOC/withAuth'

class Profile extends React.Component {

  render(){
    return(
      <div>
      In Profile
      </div>
    )
  }
}

export default withAuth(Profile)
