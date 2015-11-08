import { updatePath } from 'redux-simple-router';

import { COUNTER_ADD, COUNTER_ADD_ASYNC } from './action-types';

const Actions = {

  updatePath,

  counterAdd: function () {
    return { type: COUNTER_ADD };
  },

  counterAddAsync: function () {
    return (dispatch) => {
      dispatch({ type: COUNTER_ADD_ASYNC, status: 'started' });
      setTimeout(() => dispatch({ type: COUNTER_ADD_ASYNC, status: 'completed' }),
                 1500);
    };
  }

};

export default Actions;
