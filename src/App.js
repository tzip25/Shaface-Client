import React from 'react';
import './App.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import FaceCapture from './containers/FaceCapture'
import Nav from './components/Nav'
import LoginContainer from './components/LoginContainer'
import Profile from './components/Profile'
import Baconize from './containers/Baconize'
import SplashPage from './components/SplashPage'
import { connect } from 'react-redux'
import adapter from './adapter'


class App extends React.Component {

  renderPage = () => {
    return (
      <Switch>
        <Route exact path='/' render={(routeProps) => <SplashPage {...routeProps}/> } />
        <Route path='/home' render={() => <FaceCapture/> } />
        <Route path='/login' render={(routeProps) => <LoginContainer /> } />
        <Route path='/profile' render={() => <Profile/> } />
        <Route path='/baconize' render={() => <Baconize />} />
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
			adapter.autoLogin(token)
			.then((res) => {
				if (res.errors) {
					return null
				} else {
					this.props.setUser(res)
				}
			})
		}
    adapter.getStats()
    .then(res => {
      this.props.setStats(res)
    })
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
    },
    setStats: (stats) => {
      dispatch({type: "SET_STATS", payload: stats})
    }
  }
}

export default connect(null, mapDispatchToProps)(withRouter(App));
