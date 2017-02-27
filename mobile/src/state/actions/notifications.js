export const addNotification = (message, id) => ({
	type: 'ADD_NOTIFICATION',
  message,
	id,
});

export const removeNotification = (id) => ({
  type: 'REMOVE_NOTIFICATION',
  id
});
