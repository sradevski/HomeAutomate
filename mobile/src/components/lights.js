import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';
import _ from 'lodash';

import ClickableLabel from './sectionClickableLabel';
import {makeServerCall, generateRequestBody, showNotification} from '../shared/utils';
import {toggleLight, updateLightsState} from '../state/actions/lights';

const mapStateToProps = (state) => ({
	lights: state.lights,
});

const mapDispatchToProps = (dispatch) => ({
	toggleLight: (lightId) => {
		dispatch(toggleLight(lightId));
	},
	updateLightsState: (newState) => {
		dispatch(updateLightsState(newState));
	}
});

class Lights extends Component {
	componentDidMount(){
		this.sendToServer(generateRequestBody('getConfig', []));
	}

	sendToServer(requestBody){
		makeServerCall('lights', requestBody)
		.then((data) => this.props.updateLightsState(data))
		.catch((err) => showNotification(err));
	}

	toggleAllLights(shouldSetAllOn = false){
		const nextLightsState = Object.assign({}, this.props.lights);
		const shouldTurnOn = shouldSetAllOn || !this.isAnyOn();

		_.keys(nextLightsState).forEach((key) => {
			nextLightsState[key] = shouldTurnOn;
		});

		this.updateLightsState(nextLightsState);
		this.sendToServer(generateRequestBody('toggleAllLights', shouldTurnOn ? ['an'] : ['af']));
	}

	toggleSingleLight(lightToModify){
		const lightNextState = !this.props.lights[lightToModify];
		const lightId = lightIdMap[lightToModify];
		const lightToggle = lightNextState ? 'n' : 'f';

		this.props.toggleLight(lightToModify);
		//TODO: Rename toggleAllLights to toggleLight on server first, then here.
		this.sendToServer(generateRequestBody('toggleAllLights', [lightId + lightToggle]));
	}

	isAnyOn(){
		for (const isOn of _.values(this.props.lights)){
			if (isOn){
				return true;
			}
		}
		return false;
	}

	render(){
		const {lights} = this.props;

		return (
			<View {...this.props}>
				<ClickableLabel containerStyle={{flex: 6, justifyContent: 'center'}} iconName= 'md-bulb'
					iconSize= {32} color = '#66473b' backgroundColor = 'palegoldenrod' onPress = {() => this.toggleAllLights()} onLongPress={() => this.toggleAllLights(true)}>
					Lights
				</ClickableLabel>

				<View style={{flex: 6, flexDirection: 'row', alignItems: 'center'}}>
					{_.keys(lights).map((val, index) =>
					<Button key ={val} containerStyle ={[styles.lightButtonContainer, { backgroundColor: lights[val] ? 'lightgreen' : 'red'}]} style={styles.lightButtonText} onPress={() => this.toggleSingleLight(val)}>
						{val}
					</Button>
					)}
				</View>
			</View>
		);
	}
}

const lightIdMap = {'EN': '1', 'DK': '2', 'SF': 3};
const monospaceFontFamily = Platform.OS === 'android' ? 'monospace': 'Courier New';

const styles = StyleSheet.create({
	lightButtonContainer: {
		padding: 4,
		margin: 5,
		width: 40,
		height: 30,
		overflow: 'hidden',
		borderRadius: 3,
	},
	lightButtonText: {
		fontSize: 16,
		color: '#66473b',
		padding: 3,
		fontFamily: monospaceFontFamily
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Lights);
