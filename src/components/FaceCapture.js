import React from 'react';

const Clarifai = require('clarifai');
const app = new Clarifai.App({apiKey: '9bd2155eae344e3799387f96f70ac318'});

class FaceCapture extends React.Component {

  state = {
    clarifaiBase64: "",
    imgPath: "",
    imgUrl: null
  }

  handleURLChange = (e) => {
    this.setState({
      imgPath: [e.target.value],
      imgUrl: [e.target.value]
    })
  }

  fetchActor = () => {
    app.models.predict("e466caa0619f444ab97497640cefc4dc", this.state.imgUrl ? this.state.imgUrl : {base64: this.state.clarifaiBase64})
      .then(response => {
        const actorName = response['outputs'][0]['data']['regions'][0]['data']['face']['identity']['concepts'][0]['name']
        console.log(actorName);
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


  render(){
    return(
      <div>
        <div>
          <input name="imgUrl" placeholder="img url" onChange={this.handleURLChange}/>
        </div>
        or
        <br/>
        <label htmlFor="file-upload" className="custom-file-upload">Upload an Image</label>
        <input id="file-upload" type="file" onChange={this.fileUpload}/><br/>
        {this.state.imgPath.length ? <img src={this.state.imgPath} alt="img preview" className="imgPrev"/> : null}
        <br/>
        <button onClick={this.fetchActor}>Search</button>
      </div>
    )
  }
}

export default FaceCapture
