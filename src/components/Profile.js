import React from 'react';
import withAuth from '../HOC/withAuth'
import { withRouter } from 'react-router-dom'
import UserInfo from './UserInfo'
import ActorTile from './ActorTile'
import { Segment, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

class Profile extends React.Component {

  renderActorTiles = () => {
    return this.props.currentUser.actors.map(actor => <ActorTile key={actor.id} actor={actor}/>)
  }

  render(){
    const { actors } = this.props.currentUser
    return(
      <div className="profilePage">
        <span>
          <UserInfo/>
        </span>
        <div className="newSearchButton">
          <Button
            content='Find a New Face'
            color="yellow"
            onClick={()=> this.props.history.push('/home') }
            />
        </div>
        {actors && actors.length ?
        <Segment.Group compact className="actorTileSegment">
        <Segment secondary>
          <h1 className="RecentSearchText">Search History</h1>
        </Segment>
        <Segment >
          {actors && this.renderActorTiles()}
        </Segment>
        </Segment.Group >
        :
        null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps)(withAuth(withRouter(Profile)));
