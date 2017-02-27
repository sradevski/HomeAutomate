export const toggleLight = (lightId) => ({
	type: 'TOGGLE_LIGHT',
  lightId
});

export const updateLightsState = (newState) => ({
	type: 'UPDATE_LIGHTS_STATE',
  newState
});
