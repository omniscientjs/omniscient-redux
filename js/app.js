import omniscient from 'omniscient';
const component = omniscient.withDefaults({ isIgnorable: (_, key) => key == 'dispatch' });
component.debug();

import { DOM } from 'react';
const { div, span, button } = DOM;

import React from 'react';
import { createStore, combineReducers } from 'redux';
import * as ReactRedux from 'react-redux';
const { connect } = ReactRedux;

// just because we're not using jsx
const Provider = React.createFactory(ReactRedux.Provider);

// a type of action we can dispatch and a function that
// returns an action to pass to dispatch(..)
const ActionTypes = { COUNTER_ADD: 'COUNTER_ADD' };
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

// combine multiple reducers to create the store
const store = createStore(combineReducers({ counter }));

// function that creates a decorated component that is rendered
// with the selected reducer state and dispatch function applied
const smartComponent = (select, Component) => component.withDecorator(connect(select), Component);

// the component accesses the state of our reducer/store by
// providing a function that denotes what it wants to be passed
const Counter =
  smartComponent(
    (state) => ({ counterState: state.counter }),
    component('Counter', ({ counterState, dispatch }) =>
      div({},
        button({ onClick: () => dispatch(Actions.counterAdd()) },
          `clicks: ${counterState}`))));

const SomeOuterComponent =
  component('SomeOuterComponent', () =>
    div({},
      span({}, "OuterComponent:"),
        Counter()));

export default component('App', () =>
  Provider({ store }, SomeOuterComponent()));
