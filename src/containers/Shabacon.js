import React from 'react';
import { Segment, Label } from 'semantic-ui-react'
import v4 from 'uuid'
import adapter from '../adapter'

class Shabacon extends React.Component {

  state = {
    baconized: []
  }

  componentDidMount(){
    const token = localStorage.getItem("token")
    adapter.getShabaconized(token)
    .then(movies => {
      this.setState({
        baconized: movies
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
      <div>
      {this.renderActors()}
      </div>
    )
  }
}

export default Shabacon
