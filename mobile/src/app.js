import React, { Component } from 'react';
import { Provider} from 'react-redux';
import {createStore} from 'redux';
import reducersSet from './state/reducersSet';
import RootContainer from './rootContainer';

function configApp() {
		//This can be from persistent storage for example.
		const initialState = {
			aircon: {isOn: true, mode: 'cooling', temperature: 23},
			lights: { 'EN': false, 'DK': false, 'SF': false},
			alarm: {isOn: false, timeData: {hour: '8', minute: '15'}},
			player: {volume: 3, isOn: true, isPlaying: true, },
			connection: {isFetching: false, isError: false, errorMessage: ''},
			location: {isHome: true},
		};

		const store = createStore(reducersSet, initialState);
		return store;
}

const store = configApp(); //Returns the redux store;

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<RootContainer/>
		</Provider>
		);
	}
}
