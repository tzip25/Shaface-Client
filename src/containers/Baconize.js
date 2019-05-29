import React from 'react';
import { Segment, Label, Button } from 'semantic-ui-react'
import v4 from 'uuid'
import adapter from '../adapter'
import { withRouter } from 'react-router-dom'

class Baconize extends React.Component {

  state = {
    baconized: [],
    loading: false
  }

  componentDidMount(){
    this.mounted = true;

    this.setState({
      loading: true
    })
    const token = localStorage.getItem("token")
    adapter.getBaconized(token)
    .then(movies => {
      if(this.mounted){
        this.setState({
          baconized: movies,
          loading: false
        })
      }
    })
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  renderActors = () => {
    if(this.state.baconized.length){
      return this.state.baconized.map(movie => {
        return(
          <div className="baconize" key={v4()}>
            <Segment >
              <h4>{movie.title}: {movie.year}</h4>
              {movie.actors.map(actor => <div key={v4()} className="baconLabel"><Label basic image size="large"><img src={actor.img} alt="actor mini headshot"/>{actor.name}</Label></div>)}
            </Segment>
          </div>
        )
      })
    } else {
      return <div className="baconize"><h3>Dang. No relationships found.</h3></div>
    }
  }

  render(){
    return(
      <div className="mainBody">
      <div className="newSearchButton">
        <Button
          content="Back to Account History"
          color="teal"
          onClick={() => this.props.history.push('/profile')}
        />
      </div>
      <Segment.Group compact className="actorTileSegment">
        <Segment inverted>
          <h2>Degrees of Kevin Bacon</h2>
        </Segment>
        <Segment secondary>
        <p>See which of your actors have starred in movies together!</p>
        </Segment>
        <Segment >
        {this.state.loading ? <h1 className="pulsate math">Doing some killer math!</h1> : this.renderActors()}
        </Segment >
      </Segment.Group >
      </div>
    )
  }
}

export default withRouter(Baconize)
