import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import adapter from '../adapter'
import LoadingMini from '../components/LoadingMini'

function withAuth(MyComponent){

    class WithAuth extends React.Component{

      renderPage = () => {
        const token = localStorage.getItem("token")

    		if (!this.props.currentUser && token){
    			adapter.autoLogin(token)
    			.then((res) => {
    				if (res.errors) {
    					return null
    				} else {
    					this.props.setUser(res)
    				}
    			})
          return <LoadingMini/> 
    		} else if (this.props.currentUser) {
          return <MyComponent {...this.props}/>
        } else {
          return <Redirect to="/login" />
        }
      }

      render() {
        return (
          this.renderPage()
        )
      }
    }

    function mapStateToProps(state) {
      return {
        currentUser: state.currentUser,
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

    return connect(mapStateToProps, mapDispatchToProps)(WithAuth)
}


export default withAuth
