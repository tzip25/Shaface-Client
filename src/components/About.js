import React from 'react';
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class About extends React.Component {

  render(){
    return(
        <div className="aboutPageContainer">
          <h1 className="h1HeaderText">Welcome to WhoDat</h1>
          <h3>Meet "Shazam" for faces! (But don't worry - it's only actor faces).</h3>
          <div className="aboutP">
            <p>
            If you've ever watched a movie and thought to yourself,
            <i>"Who the heck is that actor?! I know I've seen them before!"</i>... we've got your back.
            </p>
            <p>
            Simply take a picture (mobile only) of the actor, upload an image
            or enter an image url and we'll tell you <b>WhoDat actor is!</b>
            </p>
            <p>
            Create an account to save your search history and gain access to other great features.
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
