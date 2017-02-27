import _ from 'lodash';

export default function parseServerFormatMiddleware(state, componentName){
  //TODO: remove this once fixed on server-side.
  if (state.steve){
    state.location = state.steve;
  }

	return new Promise((resolve, reject) => {
    if (componentName){
      resolve(parsersContainer[componentName](state));
    }

    const parsedState = {};

    _.keys(state).forEach((key) => {
      const parser = parsersContainer[key];
      if (parser){
        parsedState[key] = parser(state[key]);
      }
    });

    resolve(parsedState);
	});
}

//Container of the parsers for each component in the JSON data coming from the server.
const parsersContainer = {};

parsersContainer.alarm = (state) => ({
  isOn: state.is_on,
  timeData: {
   hour: state.hour.toString(),
   minute: state.minute.toString(),
  }
});

parsersContainer.aircon = (state) => ({
  isOn: state.is_on,
  mode: state.mode,
  temperature: state.temperature
});

parsersContainer.location = (state) => ({
  isHome: state.am_home
});

parsersContainer.player = (state) => ({
  volume: state.volume,
  isOn: state.is_on,
  isPlaying: state.is_playing,
});

parsersContainer.lights = (state) => ({
  'EN': state.door_light.is_on,
  'DK': state.desk_light.is_on,
  'SF': state.shelf_light.is_on,
});
