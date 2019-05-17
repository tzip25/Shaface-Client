import React from 'react';
import { Button, Input, Form, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
const APP_URL = "http://bfa47feb.ngrok.io"


class UserInfo extends React.Component {

  state = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    edit: false
  }

  componentDidMount(){
    this.setState({
      first_name: this.props.currentUser.first_name,
      last_name: this.props.currentUser.last_name,
      username: this.props.currentUser.username,
      email: this.props.currentUser.email,
      edit: false
    })
  }

  editProfile = () => {
    this.setState({
      edit: true
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  updateUserInfo = () => {
    const token = localStorage.getItem("token")

    fetch(`${APP_URL}/edituser`, {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers:{'Content-Type': 'application/json', "Authorization": token}
    })
    .then(res => res.json())
    .then(user => {
      this.props.setUser(user)
      this.setState({
        edit: false
      })
    })
  }

  render(){
      if(this.state.edit === false){
        return(
          <Segment className="profileDetailsSegment">
            <span className="profileDetails">
              <h1 className="actorNameCaps">{this.props.currentUser.first_name} {this.props.currentUser.last_name}</h1>
            </span>
            <span className="profileDetails">
              <b>Username:</b> {this.props.currentUser.username}
            </span>
            <span className="profileDetails">
              <b>Email:</b> {this.props.currentUser.email}
            </span>
            <span className="profileDetails">
            <Button onClick={this.editProfile} compact >Edit Profile</Button>
            </span>
          </Segment>
      )
    } else if(this.state.edit) {
        return (
            <Form onSubmit={this.updateUserInfo} >
              <span className="profileDetails">
              <b>First Name:</b><br/>
              <Input
                value={this.state.first_name}
                name="first_name"
                onChange={this.handleChange}
              />
              </span>
              <span className="profileDetails">
              <b>Last Name:</b><br/>
              <Input
                value={this.state.last_name}
                name="last_name"
                onChange={this.handleChange}
              />
              </span>
              <span className="profileDetails">
              <b>Username:</b><br/>
              <Input
                value={this.state.username}
                name="username"
                onChange={this.handleChange}
              />
              </span>
              <span className="profileDetails">
              <b>Email:</b><br/>
              <Input
                value={this.state.email}
                name="email"
                onChange={this.handleChange}
              />
            </span>
            <span className="profileDetails">
            <br/>
            <Button compact >Save</Button>
            </span>
            </Form>
        )
      } else {
        return null
      }

  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (currentUser) => {
      dispatch({type: "SET_USER", payload: currentUser})
    }
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
