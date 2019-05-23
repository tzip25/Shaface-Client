import React from 'react';
import { Modal, Image, Header, Button, Icon} from 'semantic-ui-react'

class ActorModal extends React.Component {

  state = {
    open: false
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })
  sortedMovies = () => this.props.actor.movies.sort((a,b) => a.year <= new Date().getFullYear() ? b.year - a.year : null).slice(0,20)
  formattedMovies = () => this.sortedMovies().map(movie => <li key={movie.id}><span className="movieTitle">{movie.title}</span><br/>Release: {movie.year}<br/>Type: {movie.media_type}<br/>{movie.genres ? `Genres: ${movie.genres.join(", ")}` : null}<br/><br/></li>)

  openIMDB = () => {
    return window.open(`https://www.imdb.com/name/${this.props.actor.imdb_id}`, "_blank")
  }

  nestedModal = () => {
    return(
      <Modal
        open={this.state.open}
        onOpen={this.open}
        onClose={this.close}
        size='large'
        trigger={
          <Button color="yellow"  icon>
            More <Icon name='right chevron' />
          </Button>
        }
      >
        <Modal.Header>20 Most Recent Features</Modal.Header>
        <Modal.Content>
        <ul>{this.formattedMovies()}</ul>
        </Modal.Content>
        <Modal.Actions>
          <Button color="yellow" icon='left chevron' content='Back' onClick={this.close} />
        </Modal.Actions>
      </Modal>
    )
  }

  render(){
    const { actor } = this.props

    return(
      <Modal trigger={this.props.button} size='large' closeIcon>
        <Modal.Header className="actorNameCaps">{actor.name} </Modal.Header>
        <Modal.Content image >
        <Image wrapped size='large' src={actor.img_url} />
          <Modal.Description>
            <Header>Born: {actor.birthday}</Header>
            {actor.deathday ? <h4>Died: ${actor.deathday}</h4> : null}
            <h3>Biography</h3>
            <p>{actor.biography}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
        <Button color="black" onClick={this.openIMDB} icon>View IMDB Profile</Button>
        {this.nestedModal()}
        </Modal.Actions>
      </Modal>
    )
  }

}

export default ActorModal
