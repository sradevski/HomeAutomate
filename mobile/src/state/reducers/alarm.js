function alarm(state = {}, action) {
	switch (action.type) {
		case 'TOGGLE_ALARM':
			return {
        ...state,
				isOn: !state.isOn
      };
		case 'SET_ALARM_TIME':
			return {
        ...state,
				timeData: action.time
      };
		case 'UPDATE_ALARM_STATE':
			return action.newState;
		default:
			return state;
	}
}

export default alarm;
