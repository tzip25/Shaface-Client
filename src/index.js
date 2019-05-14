import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css';
import App from './App';
import SplashPage from './components/SplashPage'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer'


const store = createStore(reducer)

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Route exact path='/' render={(props) => <SplashPage {...props}/> } />
      < App />
    </Provider>
  </Router>,
  document.getElementById('root'));
