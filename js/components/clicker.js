import { DOM } from 'react';
const { div, button } = DOM;

import component from '../component';
import smartComponent from '../omniscient-redux';
import Actions from '../actions/actions';

// the component accesses the state of our reducer/store by
// providing a function that denotes what it wants to be passed
const Clicker = smartComponent(
  (state) => ({ counterState: state.counter }),
  component('Clicker', ({ counterState, dispatch }) =>
    div({},
      button({ onClick: () => dispatch(Actions.counterAdd()) },
             `clicks: ${counterState}`)
    )));

export default Clicker;
