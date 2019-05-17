import React from 'react'
import { Segment, Button } from 'semantic-ui-react'
import ActorModal from '../components/ActorModal'

const ActorTile = ( { actor} ) => {

  const modalButton = () => {
    return (
      <Button
        color="yellow"
        icon='info'
        compact
      />
    )
  }


  return (
    <div className="actorTileSegment" >
    <Segment className="actorTileSegment">
      <img src={actor.img_url} className="tileImage" alt="actor tile"/>
      <div>
      <span className="actorTileName">
      {actor.name}
      </span>
      <span className="actorTileInfoButton">
      <ActorModal actor={actor} button={modalButton()}/>
      </span>
      </div>
    </Segment>
    </div>
  )
}


export default ActorTile
