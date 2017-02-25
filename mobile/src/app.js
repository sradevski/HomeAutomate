import React, { Component } from 'react';
import { Provider} from 'react-redux';
import {createStore} from 'redux';
import reducersSet from './state/reducersSet';
import RootContainer from './rootContainer';

function configApp() {
		//This can be from persistent storage for example.
		const initialState = {};

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
