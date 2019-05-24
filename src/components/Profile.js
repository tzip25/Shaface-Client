import React from 'react';
import withAuth from '../HOC/withAuth'
import { withRouter } from 'react-router-dom'
import UserInfo from './UserInfo'
import ActorTile from './ActorTile'
import { Segment, Button, Popup, Input} from 'semantic-ui-react'
import { connect } from 'react-redux'

class Profile extends React.Component {

  state = {
    actors: [],
    filteredActors: []
  }

  componentDidMount() {
    this.setState({
      actors: this.props.currentUser.actors
    })
  }

  filter = (e) => {
    const filteredActors = this.state.actors.filter(actor => actor.name.includes(e.target.value))
    return this.setState({
      filteredActors: filteredActors
    })
  }

  renderActorTiles = () => {
    if(this.state.filteredActors.length){
      return this.state.filteredActors.map(actor => <ActorTile key={actor.id} actor={actor}/>)
    } else {
      return this.state.actors.map(actor => <ActorTile key={actor.id} actor={actor}/>)
    }
  }

  render(){
    const actors = this.state.actors
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
              color="yellow"
              onClick={() => this.props.history.push('/baconize')}
              >
              <span className="customButton">Baconize</span>
            </Button>}
          />
        </div>
        <Segment.Group compact className="actorTileSegment">
        <Segment secondary>
          <h1 className="RecentSearchText">Your Search History</h1>
          <div className="floatR">
          <Input
            size='mini'
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
