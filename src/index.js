import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

const Root = () => (
  <Router>
    <Switch>
      <Route path='/' exact component={App}/>
      <Route path='/register' component={Register}/>
      <Route path='/login' component={Login}/>
    </Switch>
  </Router>
)

ReactDOM.render(
  <>
    <Root />
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
