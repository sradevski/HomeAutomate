import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import Button from 'react-native-button';
import Player from './player';
import Aircon from './aircon';
import Lights from './lights';
import Alarm from './alarm';
import Hotkeys from './hotkeys';
import NavBar from './navbar';
import Status from './status';

import {updateAlarmState} from '../state/actions/alarm';
import {updateLightsState} from '../state/actions/lights';
import {updatePlayerState} from '../state/actions/player';
import {updateAirconState} from '../state/actions/aircon';

import {makeServerCall, generateRequestBody} from '../shared/utils';
import {showNotification, changeConnectionStatus, changeUseState} from '../state/actions/appState';
import {setEntireState} from '../state/rootActions';


const mapDispatchToProps = (dispatch) => ({
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

class Main extends Component {
	constructor(props){
		super(props);

		this.state = {
			rerenderComponents: true,
			isLoading: false,
		};
	}

	sendToServer(requestBody){
		this.props.showNetworkStatus('Fetching...');
		makeServerCall('state', requestBody)
		.then((data) => { this.props.setEntireState(data);	this.props.showNetworkStatus('Fetched entire data'); })
		.catch((err) => { this.props.showNotification('Oops, it didn\'t work.'); 	this.props.showNetworkStatus('Fetching failed.'); });
	}


	refreshState(){
		this.setState({isLoading: true});
		this.sendToServer(generateRequestBody('getState', []));
		this.setState({isLoading: false});
	}

	render() {
			return (
			<View style={styles.container}>
				<NavBar refreshClickHandler = {() => this.refreshState()} isLoading = {this.state.isLoading}/>

				<View style={[styles.section, {flex: 6, flexDirection: 'row', zIndex: 100, backgroundColor: '#FFFCDD'}]}>
					<Hotkeys style={{flex: 6, flexDirection: 'column', margin: 4}}></Hotkeys>
					<Status style={{flex: 6, flexDirection: 'column'}}/>
				</View>

				<Alarm style={[styles.section, {flex: 3, backgroundColor: 'skyblue', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', zIndex: 50}]}></Alarm>

					{/* ***** THIRD ROW ***** */}
				<View style={[styles.section, {flex: 6, flexDirection: 'row', zIndex: 75}]}>
					<Lights style={{flex: 6, backgroundColor: 'palegoldenrod', borderRightWidth: 1, borderColor: 'gray', alignItems: 'center'}}></Lights>
					<Aircon style={{flex: 6, backgroundColor: 'lightsalmon', borderLeftWidth: 1, borderColor: 'gray', alignItems: 'center'}}></Aircon>
				</View>

				<Player style={[styles.section, {flex: 7, backgroundColor: '#FFFCDD', padding: 10, alignItems: 'center'}]}></Player>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	section: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: 'gray',
	},
});

export default connect(null, mapDispatchToProps)(Main);
