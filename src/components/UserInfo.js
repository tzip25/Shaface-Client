import React from 'react';
import { Button, Input, Form, Segment, Modal, Header, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import adapter from '../adapter'


class UserInfo extends React.Component {

  state = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    edit: false,
    open: false
  }

  closeModal = () => this.setState({ open: false })
  openModal = () => this.setState({ open: true })
  editProfile = () => this.setState({edit: true})

  componentDidMount(){
    this.setState({
      first_name: this.props.currentUser.first_name,
      last_name: this.props.currentUser.last_name,
      username: this.props.currentUser.username,
      email: this.props.currentUser.email,
      edit: false
    })
  }

  deleteProfile = () => {
    const token = localStorage.getItem("token")
    adapter.deleteProfile(token)
    .then(res => {
      localStorage.removeItem("token")
      this.props.setUser(null)
      this.props.history.push("/home")
    })
  }

  handleChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }

  updateUserInfo = () => {
    const token = localStorage.getItem("token")
    adapter.updateUser(this.state, token)
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
          <>
            <span className="profileName profileDetails">
              {this.props.currentUser.first_name} {this.props.currentUser.last_name}
            </span>
            <span className="profileDetails">
              <b>Username:</b> {this.props.currentUser.username}
            </span>
            <span className="profileDetails">
              <b>Email:</b> {this.props.currentUser.email}
            </span>
            <span>
            <div className="floatR" >
              <Icon name="edit" link color="yellow" onClick={this.editProfile} />
              <Icon name="delete" link onClick={this.openModal} />
            </div>
              <Modal open={this.state.open} size="tiny">
                  <Modal.Content>
                    <Header><p>Are you sure you want to delete your account?</p></Header>
                  </Modal.Content>
                <Modal.Actions>
                <Button color="black" onClick={this.closeModal} >Go Back</Button>
                <Button negative onClick={this.deleteProfile} >Delete Account</Button>
                </Modal.Actions>
              </Modal>
            </span>
          </>
        )
    } else if(this.state.edit) {
        return (
          <Segment className="profileDetailsSegment">
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
            <Button color="black" >Save</Button>
            </span>
            </Form>
            </Segment>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserInfo));
