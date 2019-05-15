import React from 'react';
import { Button, Input, Divider, Message } from 'semantic-ui-react'

const Clarifai = require('clarifai');
const app = new Clarifai.App({apiKey: '9bd2155eae344e3799387f96f70ac318'});
const APP_URL = "http://localhost:3000"

class FaceCapture extends React.Component {

  state = {
    clarifaiBase64: "",
    imgPath: "",
    imgUrl: null,
    noMatchFound: null
  }

  handleURLChange = (e) => {
    this.setState({
      imgPath: [e.target.value],
      imgUrl: [e.target.value]
    })
  }

  fetchActorFromClarifai = () => {
    app.models.predict("e466caa0619f444ab97497640cefc4dc", this.state.imgUrl ? this.state.imgUrl : {base64: this.state.clarifaiBase64})
      .then(response => {

        const topMatchValue = response['outputs'][0]['data']['regions'][0]['data']['face']['identity']['concepts'][0]['value']
        const actorName = response['outputs'][0]['data']['regions'][0]['data']['face']['identity']['concepts'][0]['name']

        topMatchValue > 0.1
        ?
        this.fetchActorFromBackend({name: actorName})
        :
        this.setState({
          noMatchFound: "No likely matches found."
        })
      },
      function(err) {
        alert("There was an error reading your photo. Please try again")
      }
    );
  }

  fileUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader();

    reader.readAsDataURL(file)
    reader.onload = () => {
      const clarifaiBase64 = reader.result.split("data:image/jpeg;base64,")[1]
      this.setState({
        clarifaiBase64: clarifaiBase64,
        imgPath: reader.result
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
    .then(console.log)
  }

  fileInputRef = React.createRef();

  render(){
    return(
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
        <br/>
        {this.state.imgPath.length ?
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
              <p>{this.state.noMatchFound}</p>
            </Message.Header>
          </Message>
          :
          null
        }

      </div>


    )
  }
}

export default FaceCapture
