import React, { Component } from 'react';
import { Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './state/rootReducer';
import RootContainer from './rootContainer';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

function configApp() {
		//This can be from persistent storage for example.
		const initialState = {
			aircon: {isOn: true, mode: 'cooling', temperature: 23},
			lights: { 'EN': false, 'BD': false, 'DK': false},
			alarm: {isOn: false, timeData: {hour: '8', minute: '15'}},
			player: {volume: 3, isOn: true, isPlaying: true, },
			appState: {useState: 'active', connectionStatus: 'Idle', notification: ''},
			location: {isHome: true},
		};

		const store = createStore(rootReducer, initialState);
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
