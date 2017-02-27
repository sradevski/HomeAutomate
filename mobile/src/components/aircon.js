import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';
import ClickableLabel from './sectionClickableLabel';

import {makeServerCall, generateRequestBody, showNotification} from '../shared/utils';
import {toggleAircon, toggleAirconMode, setTemperature, updateAirconState} from '../state/actions/aircon';

const mapStateToProps = (state) => ({
	aircon: state.aircon,
});

const mapDispatchToProps = (dispatch) => ({
	toggleAircon: () => {
		dispatch(toggleAircon());
	},
	toggleAirconMode: () => {
		dispatch(toggleAirconMode());
	},
	setTemperature: (temp) => {
		dispatch(setTemperature(temp));
	},
	updateAirconState: (newState) => {
		dispatch(updateAirconState(newState));
	}
});

class Aircon extends Component {
	componentDidMount(){
		this.sendToServer(generateRequestBody('getConfig', []));
	}

	sendToServer(requestBody){
		makeServerCall('aircon', requestBody)
		.then((data) => this.props.updateAirconState(data))
		.catch((err) => showNotification(err));
	}

	toggleAircon(){
		const {temperature, mode, isOn} = this.props.aircon;

		//The arguments used as command line parameters on the server side.
		let args = [temperature, mode];
		if (isOn){
			args = [0];
		}

		this.props.toggleAircon();
		this.sendToServer(generateRequestBody('toggleAircon', args));
	}

	toggleAirconMode(){
		const {temperature, mode} = this.props.aircon;
		const args = [temperature, mode === 'cooling' ? 'heating' : 'cooling'];

		this.props.toggleAirconMode();
		this.sendToServer(generateRequestBody('toggleAirconMode', args));
	}

	temperatureChanged(degrees){
		const {temperature} = this.props.aircon;

		this.props.setTemperature(temperature + degrees);
		this.sendToServer(generateRequestBody('temperatureChanged', [temperature + degrees]));
	}

	render(){
		const {mode, isOn, temperature} = this.props.aircon;

		const modeIcon = mode === 'cooling' ? 'md-snow' : 'md-flame';
		const modeColor = mode === 'cooling' ? {backgroundColor: 'lightblue'} : {backgroundColor: 'red'};
		const modeText = mode === 'cooling' ? 'C' : 'H';
		const labelColor = isOn ? 'green' : 'red';

		return (
			<View {...this.props}>
				<ClickableLabel containerStyle={{flex: 6, justifyContent: 'center'}} iconName= 'md-thermometer'
					iconSize= {32} color = {labelColor} backgroundColor = 'lightsalmon' onPress = {() => this.toggleAircon()}>
					Aircon
				</ClickableLabel>

				<View style={{flex: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
					<View style={{flex: 4, alignItems: 'center'}}>
						<Button containerStyle = {[styles.modeButton, modeColor]} disabled= {!isOn} onPress= {() => this.toggleAirconMode()}>
							<Icon name={modeIcon} color = 'white' style={{textAlign: 'center'}} size={36}></Icon>
						</Button>
					</View>

					<View style={{flex: 8, flexDirection: 'row', alignItems: 'center'}}>
						<Button containerStyle ={styles.temperatureButton} disabled= {!isOn} onPress= {() => this.temperatureChanged(-1)}>
							<Icon name='ios-arrow-dropleft' color = 'white' size={36}>
							</Icon>
						</Button>

						<Text style={{color: 'white', fontSize: 26, textAlign: 'center'}}>{temperature}</Text>

						<Button containerStyle ={styles.temperatureButton} disabled= {!isOn} onPress= {() => this.temperatureChanged(1)}>
							<Icon name='ios-arrow-dropright' color = 'white' size={36}>
							</Icon>
						</Button>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	modeButton: {
		padding: 4,
		margin: 3,
		width: 40,
		height: 40,
		overflow: 'hidden',
		borderRadius: 3,
		backgroundColor:
		'lightblue',
		justifyContent: 'center'
	},

	temperatureButton: {
		padding: 4,
		margin: 5,
		overflow: 'hidden',
		borderRadius: 3,
		backgroundColor: 'lightsalmon'
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Aircon);
