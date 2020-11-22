import * as actionTypes from './actions'

const initialUserState = {
  currentUser: null,
  isLoading: true
}

const user_reducer = (state = initialUserState, action) => {
  switch (action.type){
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload,
        isLoading: false,
      }
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        isLoading: false
      }
    default:
      return state;
  }
}

export default user_reducer;