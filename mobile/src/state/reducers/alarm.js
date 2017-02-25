function alarm(state = {}, action) {
	switch (action) {
		case 'TURN_ON':
			return {
        ...state,
      };
		default:
			return state;
	}
}

export default alarm;
