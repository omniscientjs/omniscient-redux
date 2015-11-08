import { COUNTER_ADD, COUNTER_ADD_ASYNC} from '../actions/action-types';

const initialState = { value: 0 };

// a reducer/store to operate on actions
function counter (state = initialState, action) {
  switch (action.type) {

    case COUNTER_ADD:
        return { value: state.value + 1 };

    case COUNTER_ADD_ASYNC:
      if (action.status == 'started') {
        return { adding: true, value: state.value };
      }
      else if (action.status == 'completed') {
        return { adding: false, value: state.value + 1 };
      }

    default:
      return state;
  }
}

export default counter;
