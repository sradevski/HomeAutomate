import React, { Component } from 'react';
import {AppState, NetInfo, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Main from './components/main';
import {makeServerCall, generateRequestBody} from './shared/utils';
import {showNotification, changeConnectionStatus, changeUseState} from './state/actions/appState';
import {setEntireState} from './state/rootActions';

const mapStateToProps = (state) => ({
	appState: state.appState
});

const mapDispatchToProps = (dispatch) => ({
	changeUseState: (nextUseState) => {
		dispatch(changeUseState(nextUseState));
	},
	setEntireState: (newState) => {
		dispatch(setEntireState(newState));
	},
	showNetworkStatus: (message) => {
		dispatch(changeConnectionStatus(message));
	},
	showNotification: (message) => {
		dispatch(showNotification(message));
	}
});

class HomeAutomate extends Component {
	componentWillMount(){
		this.appBecameActive();
		AppState.addEventListener('change', this.handleAppStateChange);
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this.handleAppStateChange);
	}

	handleAppStateChange = (nextAppState) => {
		const {appState, changeUseState} = this.props;
		if (appState.useState.match(/inactive|background/) && nextAppState === 'active') {
			this.appBecameActive();
		}

		changeUseState(nextAppState);
	}

	appBecameActive(){
		NetInfo.isConnected.fetch().then((isConnected) => {
			if (!isConnected){
				this.props.showNotification('Not connected to internet.');
			}
		});

		this.sendToServer(generateRequestBody('getState', []));
		//retrieve entire app state from server
		//check geolocation, and show notification if I am still noted as being home but I am not.
	}


	sendToServer(requestBody){
		this.props.showNetworkStatus('Fetching...');
		makeServerCall('state', requestBody)
		.then((data) => { this.props.setEntireState(data);	this.props.showNetworkStatus('Fetched entire data'); })
		.catch((err) => { this.props.showNotification('Oops, it didn\'t work.'); 	this.props.showNetworkStatus('Fetching failed.'); });
	}


	render() {
		return <Main />;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeAutomate);
