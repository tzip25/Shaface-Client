import React from 'react';
import { Segment, Label, Button } from 'semantic-ui-react'
import v4 from 'uuid'
import adapter from '../adapter'
import { withRouter } from 'react-router-dom'

class Shabacon extends React.Component {

  state = {
    baconized: [],
    loading: false
  }

  componentDidMount(){
    this.setState({
      loading: true
    })
    const token = localStorage.getItem("token")
    adapter.getShabaconized(token)
    .then(movies => {
      this.setState({
        baconized: movies,
        loading: false
      })
    })
  }

  renderActors = () => {
    return this.state.baconized.map(movie => {
      return(
        <div className="baconize" key={v4()}>
          <Segment >
            <h4>{movie.title}: {movie.year}</h4>
            {movie.actors.map(actor => <div key={v4()} className="shabaconLabel"><Label basic image><img src={actor.img} alt="actor mini headshot"/>{actor.name}</Label></div>)}
          </Segment>
        </div>
      )
    })
  }

  render(){
    return(
      <div className="mainBody">
      <div className="newSearchButton">
        <Button
          className="newSearchButton"
          color="black"
          onClick={() => this.props.history.push('/profile')}
          content="Back to Account History"
        />
      </div>
      <Segment.Group compact className="actorTileSegment">
        <Segment secondary>
          <h1 className="RecentSearchText">Six Degrees of ShaBacon</h1>
        </Segment>
        <Segment >
        {this.state.loading ? <h1 className="pulsate math">Doing some ShaMazing math!</h1> : null}
        {this.renderActors()}
        </Segment >
      </Segment.Group >
      </div>
    )
  }
}

export default withRouter(Shabacon)
