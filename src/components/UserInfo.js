import React from 'react';
import { Button, Input, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
const APP_URL = "http://localhost:3000"


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
          <div >
            <h1 className="actorNameCaps">{this.props.currentUser.first_name} {this.props.currentUser.last_name}</h1>
            <p><b>Username:</b> {this.props.currentUser.username}</p>
            <p><b>Email:</b> {this.props.currentUser.email}</p>
            <Button onClick={this.editProfile} compact >Edit Profile</Button>
          </div>
      )
    } else if(this.state.edit) {
        return (
            <Form onSubmit={this.updateUserInfo} >
              <b>First Name:</b>
              <br/>
              <Input
                value={this.state.first_name}
                name="first_name"
                onChange={this.handleChange}
              />
              <br/>
              <b>Last Name:</b>
              <br/>
              <Input
                value={this.state.last_name}
                name="last_name"
                onChange={this.handleChange}
              />
              <br/>
              <b>Username:</b>
              <br/>
              <Input
                value={this.state.username}
                name="username"
                onChange={this.handleChange}
              />
              <br/>
              <b>Email:</b>
              <br/>
              <Input
                value={this.state.email}
                name="email"
                onChange={this.handleChange}
              />
            <br/><br/>
            <Button compact >Save</Button>
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
