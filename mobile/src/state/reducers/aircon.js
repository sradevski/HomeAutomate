function aircon(state = {}, action) {
	switch (action.type) {
		case 'TOGGLE_AIRCON':
			return {
        ...state,
				isOn: !state.isOn
      };
		case 'TOGGLE_AIRCON_MODE':
			return {
        ...state,
				mode: state.mode === 'cooling' ? 'heating' : 'cooling'
      };
		case 'SET_TEMPERATURE':
			return {
        ...state,
				temperature: action.temp
      };
		case 'UPDATE_AIRCON_STATE':
			return action.newState;
		default:
			return state;
	}
}

export default aircon;
