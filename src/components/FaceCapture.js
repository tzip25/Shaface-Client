import React from 'react';


const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '9bd2155eae344e3799387f96f70ac318'
});

  //
  // app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
  //   .then(generalModel => {
  //   return generalModel.predict("https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1440,w_2560,x_0,y_0/dpr_1.5/c_limit,w_1044/fl_lossy,q_auto/v1524616078/180424-fallon-alexis-bledel-tease_lscj7g");
  // })
  //   .then(response => {
  //   var concepts = response['outputs'][0]['data']['concepts']
  //   console.log(concepts);
  // })

class FaceCapture extends React.Component {

  state = {
    imgUrl: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value]
    })
  }

  fetchActor = () => {
    const imgUrl = this.state.imgUrl
    app.models.predict("e466caa0619f444ab97497640cefc4dc", imgUrl)
      .then(
      function(response) {
        const actorName = response['outputs'][0]['data']['regions'][0]['data']['face']['identity']['concepts'][0]['name']
        console.log(actorName);
      },
      function(err) {
        alert("There was an error reading your photo. Please try again")
      }
    );
  }

  render(){
    return(
      <div>
      <input name="imgUrl" placeholder="img url" onChange={this.handleChange}/>
      <button onClick={this.fetchActor}>Search</button>
      </div>
    )
  }
}

export default FaceCapture
