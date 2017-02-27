function location(state = {}, action) {
	switch (action.type) {
		case 'TOGGLE_LIGHT':
			return {
        ...state,
				[action.lightId]: !state[action.lightId]
      };
		case 'UPDATE_LIGHTS_STATE':
			return action.newState;
		default:
			return state;
	}
}

export default location;
