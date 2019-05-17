import React from 'react';
import { Button, Input, Divider, Message } from 'semantic-ui-react'
import ActorCard from '../components/ActorCard'
import Loading from '../components/Loading'
import { connect } from 'react-redux'

const Clarifai = require('clarifai');
const app = new Clarifai.App({apiKey: '9bd2155eae344e3799387f96f70ac318'});
const APP_URL = "http://localhost:3000"
let topMatchValue = ""


class FaceCapture extends React.Component {

  state = {
    clarifaiBase64: "",
    imgPath: "",
    imgUrl: null,
    noMatchFound: null,
    foundActor: null,
    loading: false,
  }

  handleURLChange = (e) => {
    this.setState({
      imgPath: [e.target.value],
      imgUrl: [e.target.value],
      noMatchFound: null,
    })
  }

  fetchActorFromClarifai = () => {
    this.setState({
      loading: true
    }, () => {
      app.models.predict("e466caa0619f444ab97497640cefc4dc", this.state.imgUrl ? this.state.imgUrl : {base64: this.state.clarifaiBase64})
        .then(response => {
          topMatchValue = response['outputs'][0]['data']['regions'][0]['data']['face']['identity']['concepts'][0]['value']
          const actorName = response['outputs'][0]['data']['regions'][0]['data']['face']['identity']['concepts'][0]['name']

          topMatchValue > 0.15
          ?
          this.fetchActorFromBackend({name: actorName})
          :
          this.setState({
            noMatchFound: true,
            loading: false
          })
        },
        function(err) {
            alert("There was an error reading your image. Please try another photo.")
        }
      );
    })
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
        imgUrl: null,
      })
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    }
  }

  fetchActorFromBackend = (actorName) => {
    const token = localStorage.getItem("token")
    fetch(`${APP_URL}/actors`, {
      method: 'POST',
      body: JSON.stringify(actorName),
      headers:{'Content-Type': 'application/json', "Authorization": token}
    })
    .then(res => res.json())
    .then(actor => {
      actor[0] === "no actor found"
      ?
        this.setState({
          noMatchFound: true,
          loading: false
        })
      :
        this.setState({
          loading: false,
          foundActor: actor
        }, () => {
          // refetch current user after finding actor because new association was created
          const token = localStorage.getItem("token")
      		if (token){
      			fetch(`${APP_URL}/auto_login`, {
      				headers: {
      					"Authorization": token
      				}
      			})
      			.then(res => res.json())
      			.then((response) => {
      				if (response.errors) {
      					return null
      				} else {
      					this.props.setUser(response)
      				}
      			})
      		}

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
              ShaDang. No likely matches found.
            </Message.Header>
          </Message>
          :
          null
        }
      </div>

      <div className="actorCard">
      { this.state.loading ? <Loading/> : null }
      {
        this.state.foundActor
        ?
        <>
        <Message color='teal'>
        <Message.Header>
        ShaBang! We found a likely match ({Math.round(topMatchValue * 100)}% Match).
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



function mapDispatchToProps(dispatch) {
  return {
    setUser: (currentUser) => {
      dispatch({type: "SET_USER", payload: currentUser})
    }
  }
}

export default connect(null, mapDispatchToProps)(FaceCapture);
