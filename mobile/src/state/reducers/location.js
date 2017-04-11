function location(state = {}, action) {
	switch (action.type) {
		case 'UPDATE_GEOLOCATION':
			return {
        ...state,
				[action.lightId]: !state[action.lightId]
      };
		case 'UPDATE_LOCATION_STATE':
			return action.newState;
		default:
			return state;
	}
}

export default location;
