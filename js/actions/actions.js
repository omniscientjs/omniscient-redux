import { updatePath } from 'redux-simple-router';

import { COUNTER_ADD } from './action-types';

const Actions = {

  updatePath,

  counterAdd: function () {
    return { type: COUNTER_ADD };
  }

};

export default Actions;
