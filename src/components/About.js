import React from 'react';
import { Button } from 'semantic-ui-react'
import Founder from './Founder'
import { withRouter } from 'react-router-dom'

class About extends React.Component {

  render(){
    return(
        <div className="aboutPageContainer">
          <h1 className="h1HeaderText">Welcome to WhoDat</h1>
          <h3>Think, "Shazam" for faces! (but don't worry - we only find famous faces).</h3>
          <div>
            <p>
            If you've ever watched a movie and thought to yourself,
            <i>"Who the heck is that actor?! I know I've seen them before!"</i>... we've got your back.
            </p>
            <p>
            Simply take a picture of the actor on your mobile device, or upload an image
            url / file and we'll tell you <b>WhoDat actor is!</b>
            </p>
            <p>
            Create an account to save your search history and gain access to other fun features.
            </p>

            <div className="mobileShow">
            <p>
            <Button content='Create an Account' color="teal" onClick={()=> this.props.history.push('/login') }/>
            </p>
            <Founder/>
            </div>

          </div>
        </div>
    )
  }
}


export default withRouter(About)
