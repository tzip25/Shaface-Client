import React from 'react';
import '../App.css';
import { Button } from 'semantic-ui-react'


function SplashPage(props) {

  const rerouteToHome = () => {
    props.history.push('home');
  }

  const rerouteToLogin = () => {
    props.history.push('login');
  }

  return (
    <div className="App">
      <header className="SplashPage">
        <img className="App-logo" src={'/Shaface-Logo.png'} alt="logo" />
        <p className="logoText">ShaFace</p>
        <div>
        <span className="SplashPageButton">
          <Button
            inverted
            content='Find a Face'
            size='big'
            icon='camera'
            onClick={rerouteToHome}
           />
        </span>
        <span className="SplashPageButton">
          <Button
            inverted
            content='Login / Sign Up'
            size='big'
            icon='user'
            onClick={rerouteToLogin}
          />
        </span>
        </div>
        </header>
    </div>
  );
}

export default SplashPage;
