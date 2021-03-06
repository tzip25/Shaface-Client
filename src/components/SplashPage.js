import React from 'react';
import '../App.css';
import { Button } from 'semantic-ui-react'


function SplashPage(props) {

  const token = localStorage.getItem("token")
  const rerouteToHome = () => props.history.push('home')
  const rerouteToLogin = () => props.history.push('login')

  return (
    <div className="App">
      <header className="SplashPage">
        <img className="App-logo" src={'/whodat_logo.png'} alt="logo" />
        <p className="logoText fadeIn2">
        <span className="logoLetter">W</span>
        <span className="logoLetter">h</span>
        <span className="logoLetter">o</span>
        <span className="logoLetter">D</span>
        <span className="logoLetter">a</span>
        <span className="logoLetter">t</span>
        </p>
        <div>
        <span className="SplashPageButton fadeIn3">
          <Button
            inverted
            content='Find a Face'
            size='big'
            icon='camera'
            onClick={rerouteToHome}
           />
        </span>
        { token ? null
          :
          <span className="SplashPageButton fadeIn3">
            <Button
              inverted
              content='Login / Sign Up'
              size='big'
              icon='user'
              onClick={rerouteToLogin}
            />
          </span>
        }
        </div>
      </header>
    </div>
  );
}

export default SplashPage
