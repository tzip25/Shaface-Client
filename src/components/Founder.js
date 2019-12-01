import React from 'react';
import { Icon } from 'semantic-ui-react'

class Founder extends React.Component {

  render(){
    return(
      <>
        <h1 className="h1HeaderText">About the Founder</h1>
        <img className="founder" src="/tali-avatar.png" alt="tali scheer avatar" width="100px"/>
        <p>Tali Scheer has a background in Marketing and Brand Design.
        After nearly 12 years with her previous company she took the leap to switch careers and become a software engineer.
        </p>
        <p>
        <a href="https://github.com/tzip25" target="_blank" rel="noopener noreferrer">
          <Icon
            link
            name='github'
            size="large"
          />
          </a>
          <a href="https://www.linkedin.com/in/tali-scheer/" target="_blank" rel="noopener noreferrer">
          <Icon
            link
            name='linkedin'
            size="large"
          />
          </a>
          <a href="https://www.talischeer.com/" target="_blank" rel="noopener noreferrer">
          <Icon
            link
            name='wordpress'
            size="large"
          />
          </a>
          <br/><br/>
        </p>
      </>
    )
  }
}


export default Founder
