export const changeUseState = (nextUseState) => ({
	type: 'CHANGE_USE_STATE',
  nextUseState
});

export const changeConnectionStatus = (connectionStatus) => ({
	type: 'CHANGE_CONNECTION_STATUS',
  connectionStatus: `${connectionStatus} \n${new Date().toLocaleTimeString()}`
});

export const showNotification = (message) => ({
	type: 'SHOW_NOTIFICATION',
	message,
});
