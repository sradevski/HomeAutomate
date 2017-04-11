import _ from 'lodash';
import reducersSet from './reducersSet';

const rootReducer = (state, action) => {
  if (action.type === 'SET_ENTIRE_STATE') {
    _.keys(action.newState).forEach((key) => {
      state[key] = action.newState[key];
    });
  }

  return reducersSet(state, action);
};

export default rootReducer;
