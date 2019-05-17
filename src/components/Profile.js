import React from 'react';
import withAuth from '../HOC/withAuth'
import UserInfo from './UserInfo'
import ActorTile from './ActorTile'
import { Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'

class Profile extends React.Component {

  renderActorTiles = () => {
    return this.props.currentUser.actors.map(actor => <ActorTile key={actor.id} actor={actor}/>)
  }

  render(){
    return(
      <div className="profilePage">
        <span>
          <UserInfo/>
        </span>
        <Segment.Group compact className="actorTileSegment">
          <Segment secondary>
          <h1 className="RecentSearchText">Search History</h1>
          </Segment>
          <Segment >
              {this.props.currentUser.actors && this.renderActorTiles()}
          </Segment>
          </Segment.Group >
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps)(withAuth(Profile));
