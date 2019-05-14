const initialState = {
  currentUser: null
}

function reducer(state = initialState, action){
  console.log("IN THE REDUCER", action)
  switch(action.type){
    case "SET_USER":
      return {...state, currentUser: action.payload}
    case "LOG_OUT":
      return {...state, currentUser: null}
    default:
      return state
  }
}

export default reducer
