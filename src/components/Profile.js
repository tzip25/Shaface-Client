import React from 'react';
import withAuth from '../HOC/withAuth'
import { withRouter } from 'react-router-dom'
import UserInfo from './UserInfo'
import ActorTile from './ActorTile'
import { Segment, Button, Popup, Input} from 'semantic-ui-react'
import { connect } from 'react-redux'

class Profile extends React.Component {

  state = {
    filterVal: "",
  }

  filter = (e) => {
    this.setState({
      filterVal: e.target.value.toLowerCase()
    })
  }

  renderActorTiles = () => {
    const filteredActors = this.props.currentUser.actors.filter(actor => actor.name.includes(this.state.filterVal))
    return filteredActors.map(actor => <ActorTile key={actor.id} actor={actor}/>)
  }

  render(){
    const {actors} = this.props.currentUser
    return(
      <div className="profilePage">
        <Segment className="profileDetailsSegment">
          <UserInfo/>
        </Segment>
        <div className="newSearchButton">
          <Button
            content='Start New Search'
            color="black"
            onClick={()=> this.props.history.push('/home') }
            />
        </div>
        { actors && actors.length ?
          <>
        <div className="newSearchButton">
          <Popup
            wide='very'
            content='Find out which of your actors have starred in movies together'
            position='bottom left'
            trigger={
              <Button
              color="teal"
              onClick={() => this.props.history.push('/baconize')}
              content="Baconize"/>
              }
          />
        </div>
        <Segment.Group compact className="actorTileSegment">
        <Segment secondary>
          <h1 className="RecentSearchText">Previous Search History</h1>
          <div className="filterAct">
          <Input
            type="text"
            size='small'
            value={this.state.filterVal}
            placeholder="Filter actors by name"
            onChange={this.filter}
          />
          </div>
        </Segment>
        <Segment >
          {this.renderActorTiles()}
        </Segment>
        </Segment.Group >
        </>
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
