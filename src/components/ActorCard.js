import React from 'react';
import { Image, Button} from 'semantic-ui-react'
import ActorModal from '../components/ActorModal'

class ActorCard extends React.Component {

  modalButton = () => {
    return (
      <Button
        color="yellow"
        content='View Actor Details'
        icon='info'
        labelPosition='left'
      />
    )
  }

  render(){
    const { actor } = this.props
    const sortedMovies = actor.movies.sort((a,b) => a.year <= new Date().getFullYear() ? b.year - a.year : null).slice(0,5)
    const formattedMovies = () => sortedMovies.map(movie => <li key={movie.id}>{movie.year}: {movie.title}</li>)

    return(
      actor ?
      <span className="actorCard">
        <Image className="actorCardImage" src={actor.img_url} />
        <div className="actorCardDetails">
          <h1 className="actorCardName">{actor.name}</h1>
          <p><b>Birthday:</b> {actor.birthday}</p>
          <h3>Recent Features</h3>
          <ul>{formattedMovies()}</ul>
          <br/>
          <ActorModal actor={actor} button={this.modalButton()}/>
        </div>
      </span>
      :
      null
    )
  }
}


export default ActorCard
