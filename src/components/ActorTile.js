import React from 'react'
import { Segment, Icon, Image } from 'semantic-ui-react'
import ActorModal from '../components/ActorModal'
import { connect } from 'react-redux'
import adapter from '../adapter'

class ActorTile extends React.Component {

  deleteActor = () => {
    const token = localStorage.getItem("token")
    adapter.deleteActor(this.props.actor.id, token)
    .then(res => { this.props.setUser(res) })
  }

  render(){
      const { actor } = this.props
      return (
        <div className="actorTileDiv" >
            <Segment className="actorTileDiv">
            < ActorModal
              actor={actor}
              button={
                <div>
                <Image rounded src={actor.img_url} className="tileImage" alt="actor tile"/>
                <br/>
                <span className="actorTileName">
                  {actor.name}
                </span>
                </div>
              }
            />
            < Icon
              size='small'
              link
              name='trash alternate outline'
              onClick={this.deleteActor}
              className="tileIcon"
            />
            </Segment>
        </div>
      )
    }
}


function mapDispatchToProps(dispatch) {
  return {
    setUser: (currentUser) => {
      dispatch({type: "SET_USER", payload: currentUser})
    }
  }
}
export default connect(null, mapDispatchToProps)(ActorTile);
