import React from 'react';
import { Button, Input, Divider, Message } from 'semantic-ui-react'
import ActorCard from '../components/ActorCard'

const Clarifai = require('clarifai');
const app = new Clarifai.App({apiKey: '9bd2155eae344e3799387f96f70ac318'});
const APP_URL = "http://localhost:3000"

class FaceCapture extends React.Component {

  state = {
    clarifaiBase64: "",
    imgPath: "",
    imgUrl: null,
    noMatchFound: null,
    foundActor: null
  }

  handleURLChange = (e) => {
    this.setState({
      imgPath: [e.target.value],
      imgUrl: [e.target.value],
      noMatchFound: null,
      foundActor: null
    })
  }

  fetchActorFromClarifai = () => {
    app.models.predict("e466caa0619f444ab97497640cefc4dc", this.state.imgUrl ? this.state.imgUrl : {base64: this.state.clarifaiBase64})
      .then(response => {
        console.log(response);
        const topMatchValue = response['outputs'][0]['data']['regions'][0]['data']['face']['identity']['concepts'][0]['value']
        const actorName = response['outputs'][0]['data']['regions'][0]['data']['face']['identity']['concepts'][0]['name']

        topMatchValue > 0.1
        ?
        this.fetchActorFromBackend({name: actorName})
        :
        this.setState({
          noMatchFound: true
        })
      },
      function(err) {
        alert("There was an error reading your image. Please try another photo.")
      }
    );
  }

  fileUpload = (e) => {
    const file = e.target.files[0]
    const fileType = file.type.split('/')[1]
    const reader = new FileReader();

    reader.readAsDataURL(file)
    reader.onload = () => {
      const clarifaiBase64 = reader.result.split(`data:image/${fileType};base64,`)[1]
      this.setState({
        clarifaiBase64: clarifaiBase64,
        imgPath: reader.result,
        noMatchFound: null,
        foundActor: null
      })
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    }
  }

  fetchActorFromBackend = (actorName) => {
    fetch(`${APP_URL}/actors`, {
      method: 'POST',
      body: JSON.stringify(actorName),
      headers:{'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(actor => {
      this.setState({
        foundActor: actor
      })
    })
  }

  fileInputRef = React.createRef();

  render(){
    return(
      <div className="searchPageDiv">
      <div className="searchForm">
        <h1 className="h1HeaderText">Find a New Face</h1>
        <Input
          className="searchFormButton"
          name="imgUrl"
          placeholder="Enter an image url"
          onChange={this.handleURLChange}/>
        <br/>
        <Divider horizontal>Or</Divider>
        <Button
          className="searchFormButton"
          content="Upload an image file"
          labelPosition="left"
          icon="file"
          onClick={() => this.fileInputRef.current.click()}
        />
        <input
          ref={this.fileInputRef}
          type="file"
          hidden
          onChange={this.fileUpload}
        />
        <br/>
        {
          this.state.imgPath.length ?
          <>
          <img src={this.state.imgPath} alt="img preview" className="imgPrev"/>
          <Button
            color="teal"
            className="searchFormButton"
            content="Find My Face"
            type='submit'
            onClick={this.fetchActorFromClarifai}
          />
          </>
          :
          null
        }

        {
          this.state.noMatchFound
          ?
          <Message negative>
            <Message.Header>
              ShaDang
              <p>No likely matches found.</p>
            </Message.Header>
          </Message>
          :
          null
        }
      </div>

      <div className="actorCard">
      {
        this.state.foundActor
        ?
        <>
        <Message color='teal'>
        <Message.Header>
        ShaBang!
        <p>We found a likely match.</p>
        </Message.Header>
        </Message>
        <ActorCard actor={this.state.foundActor}/>
        </>
        :
        null
      }
      </div>
      </div>

    )
  }
}

export default FaceCapture
