import React from 'react';
import { Card, Icon } from 'semantic-ui-react'

class ActorCard extends React.Component {

  render(){
    const { actor } = this.props

    const extra = (
      <>
        <Icon name='user' />
        View More
      </>
    )
    return(

      actor ?
        <Card
          fluid
          color='yellow'
          image={actor.img_url}
          header={actor.name}
          meta={`Born: ${actor.birthday}`}
          description={actor.place_of_birth}
          extra={extra}
        />
      :
      null

    )
  }
}


export default ActorCard
