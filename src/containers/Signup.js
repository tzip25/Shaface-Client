import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import adapter from '../adapter'

class Signup extends React.Component {

  state = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    errors: null
  }

  handleChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }

  createUser = (e) => {
    e.preventDefault()
    if (this.state.password === this.state.passwordConfirm) {
      adapter.createUser(this.state)
      .then((res) => {
        if (res.errors){
          this.setState({
            errors: res.errors
          })
        } else {
          localStorage.setItem("token", res.token)
          this.props.setUser(res.user)
          this.props.history.push("/profile")
        }
      })
    } else {
      this.setState({
        errors: "Passwords don't match"
      })
    }
  }

  render(){
    return(
      <>
      <h1 className="h1HeaderText">Sign Up</h1>
        <Form onSubmit={this.createUser}>
          {this.state.errors && <Message negative><Message.Header>{this.state.errors}</Message.Header></Message>}
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Firs Name</label>
              <input name="firstName" onChange={this.handleChange} placeholder='Firs Name' />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input name="lastName" onChange={this.handleChange} placeholder='Last Name' />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Username</label>
              <input name="username" onChange={this.handleChange} placeholder='Username' />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input name="email" onChange={this.handleChange} placeholder='Email' />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Password</label>
              <input name="password" type="password" onChange={this.handleChange} placeholder='Password' />
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <input name="passwordConfirm" type="password" onChange={this.handleChange} placeholder='Confirm Password' />
            </Form.Field>
          </Form.Group>
        <Button color="yellow" type='submit'>Submit</Button>
      </Form>
    </>
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
export default connect(null, mapDispatchToProps)(withRouter(Signup));
