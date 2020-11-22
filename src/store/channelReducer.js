import * as actionTypes from './actions'

const initialUserState = {
  currentChannel: null,
}

const channel_reducer = (state = initialUserState, action) => {
  switch (action.type){
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload,
      }
    default:
      return state;
  }
}

export default channel_reducer;