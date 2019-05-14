import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import FaceCapture from './containers/FaceCapture'
import Nav from './components/Nav'
import LoginContainer from './components/LoginContainer'
import Profile from './components/Profile'
import { connect } from 'react-redux'

const url = "http://localhost:3000"

class App extends React.Component {

  renderPage = () => {
    return (
      <Switch>
        <Route path='/home' render={() => <FaceCapture/> } />
        <Route path='/login' render={() => <LoginContainer/> } />
        <Route path='/profile' render={() => <Profile/> } />
      </Switch>
    )
  }

  setCurrentUser = (response) => {
    this.setState({
      currentUser: response.user
    }, () => {
      localStorage.setItem("token", response.token)
      this.props.history.push('/home')
    })
  }

  logOut = () => {
		localStorage.removeItem("token")
		this.setState({
			currentUser: null
		}, () => {
			this.props.history.push("/login")
		})
	}

  componentDidMount(){
		const token = localStorage.getItem("token")

		if (token){
			fetch(`${url}/auto_login`, {
				headers: {
					"Authorization": token
				}
			})
			.then(res => res.json())
			.then((response) => {
				if (response.errors) {
					return null
				} else {
					this.props.setUser(response)
				}
			})
		}
	}

  render(){
    // console.log(this.props.match.path);
    return (
      <div className="App">
        <div className="AppBody">
          <Nav/>
          {this.renderPage()}
        </div>
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
export default connect(null, mapDispatchToProps)(App);
