function player(state = {}, action) {
	switch (action.type) {
		case 'TOGGLE_PLAYER':
			return {
        ...state,
				isOn: !state.isOn
      };
		case 'TOGGLE_PLAY':
			return {
        ...state,
				isPlaying: !state.isPlaying
      };
		case 'SET_VOLUME':
			return {
        ...state,
				volume: action.volume
      };
		case 'UPDATE_PLAYER_STATE':
			return action.newState;
		default:
			return state;
	}
}

export default player;
