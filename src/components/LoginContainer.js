import React from 'react';
import Login from '../containers/Login'
import Signup from '../containers/Signup'
import adapter from '../adapter'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LoadingMini from '../components/LoadingMini'

class LoginContainer extends React.Component {

  state = {
    loading: false,
    loginErrors: null,
    signupErrors: null
  }

  login = (e, state) => {
    e.preventDefault()
    this.setState({
      loading: true
    }, () => {
      adapter.login(state)
      .then((res) => {
        if (res.errors){
          this.setState({ loginErrors: res.errors, loading: false })
        } else {
          localStorage.setItem("token", res.token)
          this.props.setUser(res.user)
          this.props.history.push('/profile')
        }
      })
    })
  }

  signup = (e, state) => {
    e.preventDefault()
    if (state.password === state.passwordConfirm) {
      this.setState({
        loading: true
      }, () => {
        adapter.createUser(state)
        .then((res) => {
          if (res.errors){
            this.setState({ signupErrors: res.errors, loading: false })
          } else {
            localStorage.setItem("token", res.token)
            this.props.setUser(res.user)
            this.props.history.push("/profile")
          }
        })
      })
    } else {
      this.setState({
        signupErrors: "Passwords don't match"
      })
    }
  }


  render(){
    if(this.state.loading){
      return <LoadingMini/>
    }
      return(
        <div className="mainBody">
          <Login login={this.login} loginErrors={this.state.loginErrors}/>
            <br/>
          <Signup signup={this.signup} signupErrors={this.state.signupErrors}/>
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
export default connect(null, mapDispatchToProps)(withRouter(LoginContainer));
