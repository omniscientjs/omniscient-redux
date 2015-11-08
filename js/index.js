import '../less/index.less';

import React from 'react';
import ReactDOM from 'react-dom';

// redux stuff
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// redux debug
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

// routing stuff
import { Router, Route } from 'react-router';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';
import { createHistory } from 'history';

// our reducer
import counterReducer from './reducers/counter';

// combine reducers to a store,
// adds routing to state
const debugStore = compose(
  applyMiddleware(thunk),
  DEBUG
    ? devTools()
    : (_) => _);
const store = debugStore(createStore)(combineReducers({
  counter: counterReducer,
  routing: routeReducer
}));

// syncs redux state <=> history
const history = createHistory();
syncReduxAndRouter(history, store);

import Counter from './components/counter';
import AnotherCounter from './components/another-counter';
import App from './components/app';

const el = document.querySelector('#app');
ReactDOM.render(
  <div>
    <Provider store={ store }>
      <Router history={ history }>
        <Route component={ App }>
          <Route path="/" component={ Counter }/>
          <Route path="/another" component={ AnotherCounter }/>
        </Route>
      </Router>
    </Provider>
    { DEBUG
        ? <DebugPanel top right bottom>
            <DevTools store={ store } monitor={ LogMonitor } />
          </DebugPanel>
        : null }
  </div>, el);
