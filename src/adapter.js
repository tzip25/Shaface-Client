const APP_URL = "http://635bec58.ngrok.io"
// const APP_URL = "http://localhost:3000"

const adapter = {

  searchActor: (actorName, token) => {
    return fetch(`${APP_URL}/actors`, {
      method: 'POST',
      body: JSON.stringify(actorName),
      headers:{'Content-Type': 'application/json', "Authorization": token}
    }).then(res => res.json())
  },

  createUser: (state) => {
    return fetch(`${APP_URL}/signup`, {
      method: 'POST',
      body: JSON.stringify(state),
      headers:{'Content-Type': 'application/json'}
    }).then(res => res.json())
  },

  autoLogin: (token) => {
    return fetch(`${APP_URL}/auto_login`, {
      headers: { "Authorization": token }
    }).then(res => res.json())
  },

  login: (state) => {
    return fetch(`${APP_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(state),
      headers:{ 'Content-Type': 'application/json' }
    }).then(res => res.json())
  },

  deleteProfile: (token) => {
    return fetch(`${APP_URL}/users`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', "Authorization": token }
    })
  },

  updateUser: (state, token) => {
    return fetch(`${APP_URL}/edituser`, {
      method: 'POST',
      body: JSON.stringify(state),
      headers:{'Content-Type': 'application/json', "Authorization": token}
    }).then(res => res.json())
  },

  deleteActor: (actorId, token) => {
    return fetch(`${APP_URL}/useractor/${actorId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', "Authorization": token }
    }).then(res => res.json())
  },

  getShabaconized: (token) => {
    return fetch(`${APP_URL}/movies`, {
      headers: { "Authorization": token }
    }).then(res => res.json())
  },

}

export default adapter