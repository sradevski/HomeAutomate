import { combineReducers } from 'redux';

import aircon from './reducers/aircon';
import alarm from './reducers/alarm';
import player from './reducers/player';
import lights from './reducers/lights';

const reducersSet = combineReducers({
	aircon,
	alarm,
	player,
	lights,
});

export default reducersSet;
