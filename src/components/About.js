import React from 'react';
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class About extends React.Component {

  render(){
    return(
        <div className="aboutPageContainer">
          <h1 className="h1HeaderText">Welcome to WhoDat</h1>
          <h3>"Shazam" for faces! (But only for actors)</h3>
          <div className="aboutP">
            <p>
            For anyone who has watched a movie and thought to themselves,
            <i>"Who the heck is that actor?! Where have I seen them before!"</i>
            </p>
            <p>
            Simply take a picture of the actor (mobile only) or upload an image
            or url and we'll tell you <b>WhoDat actor is!</b>
            </p>
            <p>
            Create an account to save your search history and to gain access to other great features.
            </p>
            <p className="mobileShow">
            <Button content='Create an Account' color="teal" onClick={()=> this.props.history.push('/login') }/>
            </p>
          </div>
        </div>
    )
  }
}


export default withRouter(About)
