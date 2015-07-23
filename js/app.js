import component from 'omniscient';
component.debug();

import {DOM} from 'react/addons';
let { div, span, button } = DOM;

import React from 'react';
import { createRedux, bindActionCreators } from 'redux';
import * as ReduxReact from 'redux/react';

// just because we're not using jsx
const Connector = React.createFactory(ReduxReact.Connector),
      Provider = React.createFactory(ReduxReact.Provider);

// a type of action we can dispatch
const ActionTypes = { COUNTER_ADD: 'COUNTER_ADD' };

// a function that returns an action with a type to pass to dispatch(..)
const Actions = { counterAdd: () => ({ type: ActionTypes.COUNTER_ADD }) };

// a reducer/store to operate on actions
function counter (state = 0, action) {
  switch (action.type) {
  case ActionTypes.COUNTER_ADD:
    return state + 1;
  default:
    return state;
  }
}

// init redux
const redux = createRedux({ counter });

const Counter = component('Counter', ({ counterState, dispatch }) => {
  // helper to create the actions object, so `actions.counterAdd()` is enough,
  // instead of needing to do `dispatch(Actions.counterAdd())`
  const actions = bindActionCreators(Actions, dispatch);
  
  return button({ onClick: actions.counterAdd },
                `clicks: ${counterState}`)
});

// function to pick the state the counter component is interested in,
// it will be passed the `state` from the `counter` reducer, as `counterState`
const counterStateSelector = state => ({ counterState: state.counter });

// a provider component to expose redux on the context
//
// a function (?) as a child to the provider, returning a connector that selects the state for the counter
//
// another function as the child of connector that receives the state chosen by counterStateSelector and renders the counter
export default component('App', () => {
  return Provider({ redux: redux },
                  () => Connector({ select: counterStateSelector },
                                  (stateAndDispatch) => div({},
                                                            Counter(stateAndDispatch))))});
