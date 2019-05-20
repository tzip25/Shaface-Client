const initialState = {
  currentUser: null,
  loading: null,
}

function reducer(state = initialState, action){
  switch(action.type){
    case "SET_USER":
      return {...state, currentUser: action.payload}
    case "CHANGE_LOADING":
      return {...state, loading: action.payload}
    default:
      return state
  }
}

export default reducer
