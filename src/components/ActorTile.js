import React from 'react'
import { Segment, Button } from 'semantic-ui-react'
import ActorModal from '../components/ActorModal'
import { connect } from 'react-redux'

const APP_URL = "http://localhost:3000"

const ActorTile = ( props ) => {

  const deleteActor = () => {
    const token = localStorage.getItem("token")
    fetch(`${APP_URL}/useractor/${props.actor.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', "Authorization": token }
    })
    .then(response => response.json())
    .then(response => {
      props.setUser(response)
    })
  }

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
    <div className="actorTileDiv" >
    <Segment className="actorTileDiv">
      <span >
        <a className="actorTileDelete" href="/profile" onClick={deleteActor} > Delete</a>
      </span>
      <img src={props.actor.img_url} className="tileImage" alt="actor tile"/>
      <div>
      <span className="actorTileName">
      {props.actor.name}
      </span>
      <span className="actorTileInfoButton">
      <ActorModal actor={props.actor} button={modalButton()}/>
      </span>
      </div>
    </Segment>
    </div>
  )
}


function mapDispatchToProps(dispatch) {
  return {
    setUser: (currentUser) => {
      dispatch({type: "SET_USER", payload: currentUser})
    }
  }
}
export default connect(null, mapDispatchToProps)(ActorTile);
