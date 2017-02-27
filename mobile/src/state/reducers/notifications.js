function notifications(state = [], action) {
	switch (action.type) {
		case 'ADD_NOTIFICATION':
			return [
        ...state,
				{
          message: action.message,
          id: action.id
        }
      ];
		case 'REMOVE_NOTIFICATION':
		{
      const elemIndex = state.findIndex((elem) => elem.id === action.id);
			return [
        ...state.slice(0, elemIndex),
        ...state.slice(elemIndex + 1)
      ];
    }
		default:
			return state;
	}
}

export default notifications;
