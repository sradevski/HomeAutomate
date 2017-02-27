export const toggleAircon = () => ({
	type: 'TOGGLE_AIRCON',
});

export const toggleAirconMode = () => ({
	type: 'TOGGLE_AIRCON_MODE',
});

export const setTemperature = (temp) => ({
	type: 'SET_TEMPERATURE',
  temp
});

export const updateAirconState = (newState) => ({
	type: 'UPDATE_AIRCON_STATE',
	newState
});
