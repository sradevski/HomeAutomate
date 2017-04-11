function appState(state = {}, action) {
	switch (action.type) {
		case 'CHANGE_USE_STATE':
			return {
				...state,
				useState: action.nextUseState
			};
		default:
			return state;
	}
}

export default appState;
