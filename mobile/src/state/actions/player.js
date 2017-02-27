export const togglePlayer = () => ({
	type: 'TOGGLE_PLAYER',
});

export const togglePlay = () => ({
	type: 'TOGGLE_PLAY',
});

export const setVolume = (volume) => ({
	type: 'SET_VOLUME',
  volume
});

export const updatePlayerState = (newState) => ({
	type: 'UPDATE_PLAYER_STATE',
  newState
});
