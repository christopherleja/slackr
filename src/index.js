import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'

import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  useHistory 
} from 'react-router-dom'
import { 
  Provider, 
  useDispatch, 
  useSelector 
} from 'react-redux'

import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import firebase from './firebase';
import store from './store'
import Spinner from './components/Spinner'
import { SET_USER, CLEAR_USER } from './store/actions';

const Root = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.isLoading)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        history.push('/')
        dispatch({ type: SET_USER, payload: user })
      } else {
        history.push('/login')
        dispatch({ type: CLEAR_USER })
      }
    })
  }, [])

  return (
    <>
      {isLoading ? 
        <Spinner /> : <Switch>
        <Route path='/' exact component={App}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login}/>
      </Switch>}
    </>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
