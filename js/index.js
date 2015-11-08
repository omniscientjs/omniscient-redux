import '../less/index.less';

import React from 'react';
import ReactDOM from 'react-dom';

// redux stuff
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// routing stuff
import { Router, Route } from 'react-router';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';
import { createHistory } from 'history';

// our reducer
import counterReducer from './reducers/counter';

// combine reducers to a store,
// adds routing to state
const store = createStore(combineReducers({
  counter: counterReducer,
  routing: routeReducer
}));

// syncs redux state <=> history
const history = createHistory();
syncReduxAndRouter(history, store);

const el = document.querySelector('#app');

import Menu from './components/menu';
import Counter from './components/counter';
import AnotherCounter from './components/another-counter';
import App from './components/app';

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history }>
      <Route component={ App }>
        <Route path="/" component={ Counter }/>
        <Route path="/another" component={ AnotherCounter }/>
      </Route>
    </Router>
  </Provider>, el);
