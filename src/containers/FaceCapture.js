import React from 'react';
import { Button, Input, Divider, Icon } from 'semantic-ui-react'
import ActorCard from '../components/ActorCard'
import { connect } from 'react-redux'
import Loading from '../components/Loading'
// import Stats from '../components/Stats'
import About from '../components/About'
import adapter from '../adapter'

const EXIF = require('exif-js')


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
    rotate: false,
  }

  handleURLChange = (e) => {
    this.setState({
      imgPath: [e.target.value],
      imgUrl: [e.target.value],
      noMatchFound: null,
    })
  }

  componentWillUpdate(){
    adapter.getStats()
    .then(res => {
      this.props.setStats(res)
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
          this.setState({
            noMatchFound: "Dang. No likely matches found.",
            loading: false
          })
        })
        .catch(err => {
          this.setState({
            loading: false,
            imgPath: "",
            noMatchFound: "Invalid image quality or type.",
          })
        })
    })
  }



  mobileAutoRotate = (e) => {
    e.persist()

    this.setState({
      rotate: true,
      imgPath: "",
      foundActor: null,
    }, () => {

      const file = e.target.files[0]
      if(file){

        const exifReader = new FileReader();
        exifReader.readAsArrayBuffer(file)

        exifReader.onload = () => {
          const imgExif = new Image();
          imgExif.src = exifReader.result
          let exif = EXIF.readFromBinaryFile(exifReader.result)

          const reader = new FileReader();
          reader.readAsDataURL(file)

            reader.onload = () => {

              // cteate Image
              var img = new Image()
              img.src = reader.result

                img.onload = () => {
                  // create an off-screen canvas
                  var canvas = document.createElement('canvas')
                  var canvasCtx = canvas.getContext('2d')
                  // set its dimension to rotated size
                  canvas.height = img.width;
                  canvas.width = img.height;
                  // rotate and draw source image into the off-screen canvas:

                  if (exif.Orientation < 4) {
                    canvas.width  = img.width;
                    canvas.height = img.height;
                  }

                  switch(exif.Orientation){
                    case 2:
                        // horizontal flip
                        canvasCtx.translate(canvas.width, 0);
                        canvasCtx.scale(-1, 1);
                        break;
                    case 3:
                        // 180° rotate left
                        canvasCtx.translate(canvas.width, canvas.height);
                        canvasCtx.rotate(Math.PI);
                        break;
                    case 4:
                        // vertical flip
                        canvasCtx.translate(0, canvas.height);
                        canvasCtx.scale(1, -1);
                        break;
                    case 5:
                        // vertical flip + 90 rotate right
                        canvasCtx.rotate(0.5 * Math.PI);
                        canvasCtx.scale(1, -1);
                        break;
                    case 6:
                        // 90° rotate right
                        canvasCtx.rotate(90*Math.PI/180);
                        canvasCtx.translate(0, -canvas.width)
                        break;
                    case 7:
                        // horizontal flip + 90 rotate right
                        canvasCtx.rotate(0.5 * Math.PI);
                        canvasCtx.translate(canvas.width, -canvas.height);
                        canvasCtx.scale(-1, 1);
                        break;
                    case 8:
                        // 90° rotate left
                        canvasCtx.rotate(-0.5 * Math.PI);
                        canvasCtx.translate(-canvas.width, 0);
                        break;
                    default:

                  }

                  canvasCtx.drawImage(img, 0, 0)

                  const dataURL = canvas.toDataURL("image/jpeg", 1);
                  const clarifaiBase64 = dataURL.split(`data:image/jpeg;base64,`)[1]

                  this.setState({
                    clarifaiBase64: clarifaiBase64,
                    imgPath: dataURL,
                    noMatchFound: null,
                    imgUrl: null,
                    rotate: false
                  })
              }
            }
      }

      } else {
        this.setState({
          rotate: false
        })
      }
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
          foundActor: null,
          imgUrl: null,
        })
      }
    }
  }

  rotate = () => {
      // create an off-screen canvas
      var canvas = document.createElement('canvas');
      var canvasCtx = canvas.getContext('2d');
      // cteate Image
      var img = new Image();
      img.src = this.state.imgPath;
      // set its dimension to rotated size
      canvas.height = img.width;
      canvas.width = img.height;
      // rotate and draw source image into the off-screen canvas:
      canvasCtx.rotate(Math.PI / 2);
      canvasCtx.translate(0, -canvas.width);
      canvasCtx.drawImage(img, 0, 0);

      const dataURL = canvas.toDataURL("image/jpeg", 1);
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
      if(actor[0] === "no actor found"){
        this.setState({
          noMatchFound: "Dang. No likely matches found.",
          loading: false
        })
      } else {
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
      }
    })

  }

  fileInputRef = React.createRef();
  fileInputRefMobile = React.createRef();

  render(){
    return(
      <>
      <div className="searchPageDiv">

      { this.state.loading ? <Loading/> : null }

      <div className="searchForm">

        <h1 className="h1HeaderText">Find a New Face</h1>

        <div className="mobileShow">
          <Button color="black" id="mobileCamera" content="Capture an Image" icon="camera" onClick={() => this.fileInputRefMobile.current.click()} />
          <input hidden type="file" accept="image/*" capture ref={this.fileInputRefMobile} onChange={this.mobileAutoRotate} className="mobileCamera" />
          <Divider horizontal>Or</Divider>
          <Input size="mini" className="imgInput" name="imgUrl" placeholder="Enter an Image URL" onChange={this.handleURLChange}/>
          <Button className="imgInput" size="mini" content="Upload a File" icon="file" onClick={() => this.fileInputRef.current.click()}/>
          <input hidden type="file" ref={this.fileInputRef} onChange={this.fileUpload}/>
        </div>

        <div className="mobileHide">
            <Input
              className="searchFormButton"
              name="imgUrl"
              placeholder="Enter an image url"
              onChange={this.handleURLChange}/>
            <Divider className="mobileHide" horizontal>Or</Divider>
            <Button
              color="black"
              className="searchFormButton"
              content="Upload an Image"
              icon="file"
              onClick={() => this.fileInputRef.current.click()}
            />
            <input
              ref={this.fileInputRef}
              type="file"
              hidden
              onChange={this.fileUpload}
              className="searchFormButton"
            />
          </div>
          { this.state.rotate ? <div className="rotateSpinner"><br/><Icon size="huge" loading name='spinner'/></div> : null }
        {
          this.state.imgPath.length ?
            <>
              <div className="imgPrevContainer">
                <Icon size="large" link inverted name='redo alternate' className="imgRotate" onClick={this.rotate} />
                <img src={this.state.imgPath} alt="img preview" className="imgPrev" id="imgPrev" />
              </div>
              <Button content="Find That Face" color="teal" className="searchFormButton" type='submit' onClick={this.fetchActorFromClarifai} />
            </>
          :
          null
        }
        {
          this.state.noMatchFound ?
          <div className="customMessageNegative">
            <p>{this.state.noMatchFound}</p>
          </div>
          :
          null
        }
        </div>
      {
        this.state.foundActor
        ?
        <div>
          <div className="customMessage">
            Found a likely match! {Math.round(topMatchValue * 100)}% match
          </div>
          <ActorCard actor={this.state.foundActor}/>
        </div>
        :
        <div className="mobileHide"><About/></div>
      }
    </div>
    </>
    )
  }
}

// <div className="stats">{!this.state.noMatchFound && !this.state.imgPath.length && !this.state.foundActor ? <Stats/> : null }</div>

function mapDispatchToProps(dispatch) {
  return {
    setUser: (currentUser) => {
      dispatch({type: "SET_USER", payload: currentUser})
    },
    setStats: (stats) => {
      dispatch({type: "SET_STATS", payload: stats})
    }
  }
}

export default connect(null, mapDispatchToProps)(FaceCapture);
