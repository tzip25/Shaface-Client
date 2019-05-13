import React from 'react';
import './App.css';
import FaceCapture from './components/FaceCapture'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={'/Shaface-Logo.png'} width="250" alt="logo" />
        <p className="logoText">ShaFace</p>
        <button> Login / Signup </button>
        < FaceCapture />
      </header>
    </div>
  );
}

export default App;
