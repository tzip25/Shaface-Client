import React from 'react';
import withAuth from '../HOC/withAuth'
import UserInfo from './UserInfo'
import ActorTile from './ActorTile'

import { connect } from 'react-redux'

class Profile extends React.Component {

  renderActorTiles = () => {
    return this.props.currentUser.actors.map(actor => <ActorTile key={actor.id} actor={actor}/>)
  }

  render(){
    return(
      <div className="profilePage">
        <span className="profileInfo">
          <UserInfo/>
        </span>
        <div className="actorTileDiv">
          <h1 className="RecentSearchText">Your Recent Searches</h1>
          {this.renderActorTiles()}
        </div>
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
