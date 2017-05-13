import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import HotkeyButton from './hotkeyButton';
import {makeServerCall, generateRequestBody} from '../shared/utils';
import {showNotification, changeConnectionStatus} from '../state/actions/appState';
import {setEntireState} from '../state/rootActions';

const mapDispatchToProps = (dispatch) => ({
	showNetworkStatus: (message) => {
		dispatch(changeConnectionStatus(message));
	},
	showNotification: (message) => {
		dispatch(showNotification(message));
	},
	setEntireState: (state) => {
		dispatch(setEntireState(state));
	}
});

class Hotkeys extends Component {
	cameHome() {
    this.sendToServer(generateRequestBody('comeHome', []));
	}

	goSleep() {
    this.sendToServer(generateRequestBody('goSleep', []));
	}

	offAll(inMin) {
    this.sendToServer(generateRequestBody('offAll', [inMin]));
	}

	sendToServer(requestBody){
		this.props.showNetworkStatus('Fetching...');
		makeServerCall('hotkeys', requestBody)
		.then((data) => { this.props.setEntireState(data);	this.props.showNetworkStatus('Fetched entire data'); })
		.catch((err) => { this.props.showNotification('Oops, it didn\'t work.'); 	this.props.showNetworkStatus('Fetching failed.'); });
	}

	render() {
		return (
			<View {...this.props}>
      <HotkeyButton backgroundColor = 'red' iconName = 'md-power' onPress = {() => this.offAll(0)} onLongPress={() => this.offAll(3)}>
        Off All
      </HotkeyButton>

      <HotkeyButton backgroundColor = '#003300' iconName = 'md-home' onPress = {() => this.cameHome()}>
        Home
      </HotkeyButton>

      <HotkeyButton backgroundColor = '#1b0b58' iconName = 'md-moon' onPress = {() => this.goSleep()}>
        Sleeping
      </HotkeyButton>

    </View>
		);
	}
}

export default connect(null, mapDispatchToProps)(Hotkeys);
