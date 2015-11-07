import component from './component';
import smartComponent from './omniscient-redux';

import { DOM } from 'react';
const { div, span, button, a, ul, li } = DOM;

import Actions from './actions';

const Menu = smartComponent(
  (state) => ({}),
  component('Menu', ({ dispatch }) =>
    div({},
      ul({},
        li({}, a({ href: "#", onClick: () => dispatch(Actions.updatePath("/")) }, "Index route")),
        li({}, a({ href: "#", onClick: () => dispatch(Actions.updatePath("/another")) }, "Another route"))))));

// the component accesses the state of our reducer/store by
// providing a function that denotes what it wants to be passed
const Counter = smartComponent(
  (state) => ({ counterState: state.counter }),
  component('Counter', ({ counterState, dispatch }) =>
    div({},
      button({ onClick: () => dispatch(Actions.counterAdd()) }, `clicks: ${counterState}`),
    )));

export const CounterComponent =
  component('CounterComponent', () =>
    div({},
      span({}, "Counter:"),
      Counter()));

export const AnotherCounterComponent =
  component('AnotherCounterComponent', () =>
    div({},
      span({}, "Same counter, another component:"),
      Counter()));

export const App = component('App', ({ children }) =>
  div({},
    div({}, "App"),
    Menu(),
    children));
