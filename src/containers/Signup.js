import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react'

class Signup extends React.Component {

  state = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
  }

  handleChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
  signup = (e) => this.props.signup(e, this.state)

  render(){
    return(
      <>
      <h1 className="h1HeaderText">Sign Up</h1>
        <Form onSubmit={this.signup}>
          {this.props.signupErrors && <Message negative><Message.Header>{this.props.signupErrors}</Message.Header></Message>}
          <Form.Group widths='equal'>
            <Form.Field>
              <label>First Name</label>
              <input name="firstName" onChange={this.handleChange} placeholder='First Name' />
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

export default Signup
