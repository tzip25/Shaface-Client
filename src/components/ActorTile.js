import React from 'react'
import { Segment, Button } from 'semantic-ui-react'
import ActorModal from '../components/ActorModal'
import { connect } from 'react-redux'
import adapter from '../adapter'


const ActorTile = ( props ) => {

  const { actor } = props

  const deleteActor = () => {
    const token = localStorage.getItem("token")
    adapter.deleteActor(actor.id, token)
    .then(res => { props.setUser(res) })
  }

  return (
    <div className="actorTileDiv" >
    <Segment className="actorTileDiv">
      <span >
        <button className="tileDelete" onClick={deleteActor}>Delete</button>
      </span>
      <img src={actor.img_url} className="tileImage" alt="actor tile"/>
      <div>
      <span className="actorTileName">
        {actor.name}
      </span>
      <span className="actorTileInfoButton">
        <ActorModal actor={actor} button={<Button color="yellow" icon='info' compact/>} />
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
