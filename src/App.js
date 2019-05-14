import React from 'react';
import './App.css';
import { Button } from 'semantic-ui-react'
import FaceCapture from './components/FaceCapture'
import Nav from './components/Nav'

function App() {

  return (
    <>
    <Nav/>
    <FaceCapture/>
    </>
  );
}

export default App;
