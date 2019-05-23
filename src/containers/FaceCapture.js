import React from 'react';
import { Button, Input, Divider, Message, Icon } from 'semantic-ui-react'
import ActorCard from '../components/ActorCard'
import { connect } from 'react-redux'
import Loading from '../components/Loading'
import adapter from '../adapter'

const Clarifai = require('clarifai');
const app = new Clarifai.App({apiKey: '9bd2155eae344e3799387f96f70ac318'});
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
    this.setState({ loading: true, foundActor: null }, () => {
      app.models.predict("e466caa0619f444ab97497640cefc4dc", this.state.imgUrl ? this.state.imgUrl : {base64: this.state.clarifaiBase64})
        .then(response => {
          topMatchValue = response['outputs'][0]['data']['regions'][0]['data']['face']['identity']['concepts'][0]['value']
          const actorName = response['outputs'][0]['data']['regions'][0]['data']['face']['identity']['concepts'][0]['name']

          topMatchValue > 0.15
          ?
          this.fetchActorFromBackend({name: actorName})
          :
          this.setState({ noMatchFound: true, loading: false })
        },
        function(err) {
            alert("There was an error reading your image. Please try another photo.")
        }
      );
    })
  }

  fileUpload = (e) => {

    const file = e.target.files[0]

    if (file){
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

      }
    }
  }

  rotate = () => {
    // create an off-screen canvas
    var offScreenCanvas = document.createElement('canvas');
    var offScreenCanvasCtx = offScreenCanvas.getContext('2d');
    // cteate Image
    var img = new Image();
    img.src = this.state.imgPath;
    // set its dimension to rotated size
    offScreenCanvas.height = img.width;
    offScreenCanvas.width = img.height;
    // rotate and draw source image into the off-screen canvas:
    offScreenCanvasCtx.rotate(Math.PI / 2);
    offScreenCanvasCtx.translate(0, -offScreenCanvas.width);
    offScreenCanvasCtx.drawImage(img, 0, 0);

    const dataURL = offScreenCanvas.toDataURL("image/jpeg", 1);
    const clarifaiBase64 = dataURL.split(`data:image/jpeg;base64,`)[1]

    this.setState({
      clarifaiBase64: clarifaiBase64,
      imgPath: dataURL,
      noMatchFound: null,
      imgUrl: null,
    })
  }

  fetchActorFromBackend = (actorName) => {
    const token = localStorage.getItem("token")
    adapter.searchActor(actorName, token)
    .then(actor => {
      actor[0] === "no actor found"
      ?
        this.setState({
          noMatchFound: true,
          loading: false
        })
      :
        this.setState({
          clarifaiBase64: "",
          imgPath: "",
          imgUrl: null,
          noMatchFound: null,
          foundActor: actor,
          loading: false,
        }, () => {
          // refetch current user after finding actor because new association was created
          if (token){
            adapter.autoLogin(token)
      			.then((res) => res.errors ? null : this.props.setUser(res) )
      		}
        })
    })
  }

  fileInputRef = React.createRef();

  render(){
    return(
      <div className="searchPageDiv">
      { this.state.loading ? <Loading/> : null }
      <div className="searchForm">
        <h1 className="h1HeaderText">Find a New Face</h1>
        <Input
          className="searchFormButton"
          name="imgUrl"
          placeholder="Enter an image url"
          onChange={this.handleURLChange}/>
        <Divider horizontal>Or</Divider>
        <Button
          color="black"
          className="searchFormButton"
          content="Grab an Image"
          labelPosition="left"
          icon="camera"
          onClick={() => this.fileInputRef.current.click()}
        />
        <input
          ref={this.fileInputRef}
          type="file"
          hidden
          onChange={this.fileUpload}
          className="searchFormButton"
        />
        <br/>
        {
          this.state.imgPath.length ?
            <>
              <div className="imgPrevContainer">
                <Icon
                  size="large"
                  link
                  inverted
                  name='redo alternate'
                  className="imgRotate"
                  onClick={this.rotate}
                />
                <img src={this.state.imgPath} alt="img preview" className="imgPrev" id="imgPrev" />
              </div>
              <Button
                color="yellow"
                className="searchFormButton"
                content="Find That Face"
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
              WhoDang. No likely matches found.
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
          WhoDat! We found a likely match. ({Math.round(topMatchValue * 100)}% match)
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
