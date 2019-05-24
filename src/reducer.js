const initialState = {
  currentUser: null,
  siteStats: [],
}

function reducer(state = initialState, action){
  switch(action.type){
    case "SET_USER":
      return {...state, currentUser: action.payload}
    case "SET_STATS":
      return {...state, siteStats: action.payload}
    default:
      return state
  }
}

export default reducer
