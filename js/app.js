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

// function that creates a component wrapped in a connector
// that is rendered with the selected reducer state applied
// (Actions could be probably be a param to `smartComponent` as well)
const smartComponent =
        (stateSelectorFn, ComponentToConnect) => component('ComponentWithState', () =>
                                                           Connector({ select: stateSelectorFn },
                                                                     (stateAndDispatch) => {
                                                                       // helper to create the actions object
                                                                       // so `actions.counterAdd()` is enough
                                                                       // instead of needing to do `dispatch(Actions.counterAdd())`
                                                                       const actions = bindActionCreators(Actions, stateAndDispatch.dispatch);
                                                                       return ComponentToConnect(stateAndDispatch, { actions });
                                                                     }));

// the counter component that accesses the state of our reducer
// by providing a function that denotes what it wants to be passed
const Counter = smartComponent((state) => ({ counterState: state.counter }),
                               component('Counter', ({ counterState }, { actions }) =>
                                         div({},
                                             button({ onClick: actions.counterAdd },
                                                    `clicks: ${counterState}`))));

const SomeOuterComponent = component('SomeOuterComponent', () =>
                                     div({},
                                         span({}, "OuterComponent:"),
                                         Counter()));

// a provider component to expose redux on the context
export default component('App', () => {
  return Provider({ redux: redux }, () => SomeOuterComponent())
});
