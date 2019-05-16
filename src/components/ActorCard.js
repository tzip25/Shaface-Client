import React from 'react';
import { Grid, Image, Segment, Button} from 'semantic-ui-react'

class ActorCard extends React.Component {

  render(){
    const { actor } = this.props
    const sortedMovies = actor.movies.sort((a,b) => a.year <= new Date().getFullYear() ? b.year - a.year : null).slice(0,10)
    const formattedMovies = () => sortedMovies.map(movie => <li key={movie.id}>{movie.year}: {movie.title}</li>)

    return(
      actor ?
      <Segment >
        <div className="actorCard">
          <Grid stackable columns={2}>
            <Grid.Column>
              <Image className="actorCardImage" src={actor.img_url} />
            </Grid.Column>
            <Grid.Column>
              <div className="actorDetails">
                <h1 className="actorNameCaps">{actor.name}</h1>
                <p><b>Birthday:</b> {actor.birthday}</p>
                <h3>Recent Features</h3>
                <ul>{formattedMovies()}</ul>
                <br/>
                <Button
                  color="yellow"
                  content='View Actor Details'
                  icon='info'
                  labelPosition='left'
                />
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </Segment>
      :
      null
    )
  }
}


export default ActorCard
