export const updateLocationState = (newState) => ({
	type: 'UPDATE_LOCATION_STATE',
  newState
});

export const updateGeolocation = (longitude, latitude) => ({
	type: 'UPDATE_GEOLOCATION',
  longitude,
	latitude
});
