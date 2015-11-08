import { DOM } from 'react';
const { span, div, button } = DOM;

import component from '../component';
import smartComponent from '../omniscient-redux';
import Actions from '../actions/actions';

const style = { display: 'block' };

// the component accesses the state of our reducer/store by
// providing a function that denotes what it wants to be passed
const Clicker = smartComponent(
  (state) => ({ counterState: state.counter }),
  component('Clicker', ({ counterState, dispatch }) =>
    span({},

         " ",

         counterState.adding ? 'adding async..' : counterState.value,

         button({ style, onClick: () => dispatch(Actions.counterAddAsync()) },
                'async +1'),

         button({ style, onClick: () => dispatch(Actions.counterAdd()) },
                'sync +1')
    )));

export default Clicker;
