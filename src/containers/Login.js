import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react'


class Login extends React.Component {

  state = {
    username: '',
    password: '',
  }

  handleChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
  login = (e) => this.props.login(e, this.state)

  render(){
    return(
      <>
        <h1 className="h1HeaderText">Login</h1>
        <Form onSubmit={this.login}>
          {this.props.loginErrors && <Message negative><Message.Header>{this.props.loginErrors}</Message.Header></Message> }
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
          <Button color="yellow" type='submit'>Submit</Button>
        </Form>
      </>
    )
  }
}

export default Login
