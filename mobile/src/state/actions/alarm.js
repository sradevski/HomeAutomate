export const toggleAlarm = () => ({
	type: 'TOGGLE_ALARM',
});

export const setAlarmTime = (time) => ({
	type: 'SET_ALARM_TIME',
  time
});

export const updateAlarmState = (newState) => ({
	type: 'UPDATE_ALARM_STATE',
  newState
});
