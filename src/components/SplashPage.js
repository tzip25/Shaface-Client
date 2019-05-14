import React from 'react';
import '../App.css';
import { Button } from 'semantic-ui-react'

function SplashPage() {

  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src={'/Shaface-Logo.png'} alt="logo" />
        <p className="logoText">ShaFace</p>
        <div>
          <Button
            inverted
            content='Scan a Face'
            size='large'
            icon='camera'
           />
          <Button
            inverted
            content='Login / Sign Up'
            size='large'
            icon='user'
          />
        </div>
        </header>
    </div>
  );
}

export default SplashPage;
