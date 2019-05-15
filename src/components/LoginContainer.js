import React from 'react';
import Login from '../containers/Login'
import Signup from '../containers/Signup'

function LoginContainer(props){
  return(
    <div className="mainBody">
      <Login {...props}/>
        <br/>
      <Signup />
    </div>
  )}
export default LoginContainer
