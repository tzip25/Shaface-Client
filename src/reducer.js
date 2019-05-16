const initialState = {
  currentUser: null,
  selectedActor: null,
}

function reducer(state = initialState, action){
  // console.log("IN THE REDUCER", action)
  switch(action.type){
    case "SET_USER":
      return {...state, currentUser: action.payload}
    case "SET_ACTOR":
      return {...state, currentActor: action.payload}
    default:
      return state
  }
}

export default reducer
