import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

const url = "http://localhost:3000"

class Login extends React.Component {

  state = {
    username: '',
    password: '',
    errors: null,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  login = (e) => {
    e.preventDefault()
    fetch(`${url}/login`, {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((response) => {
      if (response.errors){
        this.setState({
          errors: response.errors
        })
      } else {
        localStorage.setItem("token", response.token)
        this.props.setUser(response)
        // this.props.history.push('/home')
      }
    })
  }

  render(){
    return(
      <div className="loginForm">
        <h1 className="h1HeaderText">Login</h1>
        <Form onSubmit={this.login}>
          {this.state.errors && <Message negative><Message.Header>{this.state.errors}</Message.Header></Message> }
          <Form.Group widths='equal'>
          <Form.Field>
            <label>Username</label>
            <input name="username" placeholder='Username' onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input name="password" type="password" onChange={this.handleChange} placeholder="Password"/>
          </Form.Field>
          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    setUser: (currentUser) => {
      // dispatch is our new setState and it takes an object with a type and a payload
      dispatch({type: "SET_USER", payload: currentUser})
    }
  }
}
export default connect(null, mapDispatchToProps)(Login);
