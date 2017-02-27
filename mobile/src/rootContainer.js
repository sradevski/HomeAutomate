import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarAlert from 'react-native-statusbar-alert';

import Button from 'react-native-button';
import Player from './components/player';
import Aircon from './components/aircon';
import Lights from './components/lights';
import Alarm from './components/alarm';
import Hotkeys from './components/hotkeys';
import NavBar from './components/navbar';

import {updateAlarmState} from './state/actions/alarm';
import {updateLightsState} from './state/actions/lights';
import {updatePlayerState} from './state/actions/player';
import {updateAirconState} from './state/actions/aircon';
import {addNotification, removeNotification} from './state/actions/notifications';

import {generateNotificationFunction} from './shared/utils';

const mapStateToProps = (state) => ({
	notifications: state.notifications,
});

const mapDispatchToProps = (dispatch) => ({
	updateAlarmState: (newState) => {
		dispatch(updateAlarmState(newState));
	},
	updateLightsState: (newState) => {
		dispatch(updateLightsState(newState));
	},
	updatePlayerState: (newState) => {
		dispatch(updatePlayerState(newState));
	},
	updateAirconState: (newState) => {
		dispatch(updateAirconState(newState));
	},
	addNotification: (message, id) => {
		dispatch(addNotification(message, id));
	},
	removeNotification: (id) => {
		dispatch(removeNotification(id));
	}
});

class HomeAutomate extends Component {
	constructor(props){
		super(props);

		this.state = {
			rerenderComponents: true,
			isLoading: false,
		};
	}

	componentWillMount(){
		generateNotificationFunction(this.props.addNotification, this.props.removeNotification);
	}

	reflectChangeToComponents(){
		this.setState({rerenderComponents: !this.state.rerenderComponents});
	}

	refreshState(){
		this.setState({isLoading: true});
		this.reflectChangeToComponents();
		this.setState({isLoading: false});
	}

	render() {
			const {notifications} = this.props;
			return (
			<View style={styles.container}>
				<StatusBarAlert visible={notifications.length > 0} message={notifications[0] && (notifications[0].message || ' ')} backgroundColor='#3CC29E' color='white'/>
				<NavBar refreshClickHandler = {() => this.refreshState()} isLoading = {this.state.isLoading}/>

				<Hotkeys reflectChangeToComponents = {() => this.reflectChangeToComponents()} style={[styles.section, {flex: 6, flexDirection: 'row', backgroundColor: 'white', zIndex: 100}]}></Hotkeys>

				<Alarm reflectChangeToComponents = {() => this.reflectChangeToComponents()} style={[styles.section, {flex: 3, backgroundColor: 'skyblue', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', zIndex: 50}]}></Alarm>

					{/* ***** THIRD ROW ***** */}
				<View style={[styles.section, {flex: 6, flexDirection: 'row', zIndex: 75}]}>
					<Lights reflectChangeToComponents = {() => this.reflectChangeToComponents()} style={{flex: 6, backgroundColor: 'palegoldenrod', borderRightWidth: 1, borderColor: 'gray', alignItems: 'center'}}></Lights>
					<Aircon reflectChangeToComponents = {() => this.reflectChangeToComponents()} style={{flex: 6, backgroundColor: 'lightsalmon', borderLeftWidth: 1, borderColor: 'gray', alignItems: 'center'}}></Aircon>
				</View>

				<Player reflectChangeToComponents = {() => this.reflectChangeToComponents()} style={[styles.section, {flex: 7, backgroundColor: '#FFFCDD', padding: 10, alignItems: 'center'}]}></Player>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeAutomate);
