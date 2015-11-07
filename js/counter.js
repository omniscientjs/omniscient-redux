import { COUNTER_ADD } from './action-types';

// a reducer/store to operate on actions
function counter (state = 0, action) {
  switch (action.type) {
    case COUNTER_ADD:
      return state + 1;
    default:
      return state;
  }
}

export default counter;
