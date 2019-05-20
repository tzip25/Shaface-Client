import React from 'react';
import './App.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import FaceCapture from './containers/FaceCapture'
import Nav from './components/Nav'
import LoginContainer from './components/LoginContainer'
import Profile from './components/Profile'
import SplashPage from './components/SplashPage'
import { connect } from 'react-redux'

const APP_URL = "http://localhost:3000"

class App extends React.Component {

  renderPage = () => {
    return (
      <Switch>
        <Route exact path='/' render={(routeProps) => <SplashPage {...routeProps}/> } />
        <Route path='/home' render={() => <FaceCapture/> } />
        <Route path='/login' render={(routeProps) => <LoginContainer {...routeProps}/> } />
        <Route path='/profile' render={() => <Profile/> } />
        <Redirect to="/home" />
      </Switch>
    )
  }

  logOut = () => {
		localStorage.removeItem("token")
    this.props.setUser(null)
    this.props.history.push("/home")
	}

  componentDidMount(){
		const token = localStorage.getItem("token")

		if (token){
			fetch(`${APP_URL}/auto_login`, {
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

    return (
      <div className="App">
        <div className="AppBody">
          <Nav logOut={this.logOut}/>
          { this.renderPage() }
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

export default connect(null, mapDispatchToProps)(withRouter(App));
