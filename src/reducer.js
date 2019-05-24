const initialState = {
  currentUser: null,
  userActors: []
}

function reducer(state = initialState, action){
  switch(action.type){
    case "SET_USER":
      return {...state, currentUser: action.payload}
    case "SET_USER_ACTORS":
      return {...state, userActors: action.userActors}
    default:
      return state
  }
}

export default reducer
