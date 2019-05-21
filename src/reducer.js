const initialState = {
  currentUser: null,
  shabaconize: []
}

function reducer(state = initialState, action){
  switch(action.type){
    case "SET_USER":
      return {...state, currentUser: action.payload}
    case "SET_SHABACONIZE":
      return {...state, shabaconize: action.payload}
    default:
      return state
  }
}

export default reducer
