import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import channel_reducer from "./channelReducer";
import user_reducer from "./userReducer";

const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer
});

const store = createStore(rootReducer, composeWithDevTools())

export default store;