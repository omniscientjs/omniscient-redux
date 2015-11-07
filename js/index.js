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
import counter from './counter';

// combine reducers to a store,
// adds routing to state
const store = createStore(combineReducers({
  counter,
  routing: routeReducer
}));

// syncs redux state <=> history
const history = createHistory();
syncReduxAndRouter(history, store);

import { App, CounterComponent, AnotherCounterComponent } from './app';

const el = document.querySelector('#app');

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history }>
      <Route component={ App }>
        <Route path="/" component={ CounterComponent }/>
        <Route path="/another" component={ AnotherCounterComponent }/>
      </Route>
    </Router>
  </Provider>, el);
