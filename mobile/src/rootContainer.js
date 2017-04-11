import React, { Component } from 'react';
import {AppState, NetInfo, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarAlert from 'react-native-statusbar-alert';
import Main from './components/main';

import {addNotification, removeNotification} from './state/actions/notifications';
import {changeUseState} from './state/actions/appState';
import {setEntireState} from './state/rootActions';
import {initializeNotificationFunction, showNotification} from './shared/utils';

const mapStateToProps = (state) => ({
	appState: state.appState
});

const mapDispatchToProps = (dispatch) => ({
	addNotification: (message, id) => {
		dispatch(addNotification(message, id));
	},
	removeNotification: (id) => {
		dispatch(removeNotification(id));
	},
	changeUseState: (nextUseState) => {
		dispatch(changeUseState(nextUseState));
	},
	setEntireState: (newState) => {
		dispatch(setEntireState(newState));
	}
});

class HomeAutomate extends Component {
	componentWillMount(){
		initializeNotificationFunction(this.props.addNotification, this.props.removeNotification);
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
				showNotification('Please turn on the internet.');
			}
		});

		//retrieve entire app state from server
		//check geolocation, and show notification if I am still noted as being home but I am not.
	}

	render() {
		return <Main />;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeAutomate);
