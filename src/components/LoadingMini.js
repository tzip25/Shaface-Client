import React from 'react';
import { Icon } from 'semantic-ui-react'

class LoadingMini extends React.Component {

  render(){
    return(
        <div>
          <h1 className="pulsate loadText">
            ShaGathering your info...
          </h1>
          <Icon
            size="huge"
            loading
            name='spinner'
          />
      </div>
    )
  }
}


export default LoadingMini
