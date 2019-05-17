import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
const url = "http://bfa47feb.ngrok.io"

function withAuth(MyComponent){

    class WithAuth extends React.Component{

      renderPage = () => {
        const token = localStorage.getItem("token")

    		if (!this.props.currentUser && token){
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
          return null
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
