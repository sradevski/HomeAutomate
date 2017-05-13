function appState(state = {}, action) {
	switch (action.type) {
		case 'CHANGE_USE_STATE':
			return {
				...state,
				useState: action.nextUseState
			};
		case 'CHANGE_CONNECTION_STATUS':
			return {
				...state,
				connectionStatus: action.connectionStatus,
			};
		case 'SHOW_NOTIFICATION':
			return {
				...state,
				notification: action.message,
			};
		default:
			return state;
	}
}

export default appState;
