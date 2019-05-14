import React from 'react'
import { Redirect } from 'react-router-dom'

function withAuth(MyComponent){

  return (
    class extends React.Component{

      renderPage = () => {
        const token = localStorage.getItem("token")
        if (token) {
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
  )
}

export default withAuth
