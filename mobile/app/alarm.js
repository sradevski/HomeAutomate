import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';
import SliderWithLabel from './sliderWithLabel';
import ClickableLabel from './sectionClickableLabel';

const Item = Picker.Item;

const serverUrl = 'http://192.168.11.101:8080/alarm';
//const serverUrl = 'http://10.0.2.2:8080/alarm';

let requestOptions = {
	method: 'POST',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
};

export default class Alarm extends Component {

	state = {
		isOn: false,
		timeData: {
			hour: '8',
			minute: '0',
			mode: 'AM'
		}
	};

	updateState(newState) {
		let mode = 'AM',
			hour = parseInt(newState.hour);
		if (hour > 12) {
			mode = 'PM'
			hour = hour - 12;
		}

		this.setState({
			isOn: newState.is_on,
			timeData: {
				hour: hour.toString(),
				minute: newState.minute.toString(),
				mode: mode,
			}
		});
	}

	makeServerCall(requestOptions) {
		fetch(serverUrl, requestOptions)
			.then(response => response.json())
			.then((data) => this.updateState(data));
	}

	componentWillMount() {
		requestOptions['body'] = JSON.stringify([{
			name: 'getConfig',
			args: []
		}]);

		this.makeServerCall(requestOptions);
	}

	componentWillReceiveProps(newProps) {
		this.componentWillMount();
	}

	alarmToggle() {
		const nextState = !this.state.isOn
		this.setState({ isOn: nextState });

		let args = ['r'];
		if (nextState) {
			args = [this._calculateHourFromMode(this.state.timeData.hour, this.state.timeData.mode), this.state.timeData.minute];
		}

		requestOptions['body'] = JSON.stringify([{
			name: 'alarmToggle',
			args: args
		}]);

		this.makeServerCall(requestOptions);
	}

	pickerChanged(key, value) {
		let newTimeData = Object.assign({}, this.state.timeData);
		newTimeData[key] = value;

		this.setState({ timeData: newTimeData });

		if (this.state.isOn) {
			requestOptions['body'] = JSON.stringify([{
				name: 'alarmToggle',
				args: [this._calculateHourFromMode(newTimeData.hour, newTimeData.mode), newTimeData.minute]
			}]);

			this.makeServerCall(requestOptions);
		}
	}

	_calculateHourFromMode(hour, mode){
		let newHour = parseInt(hour);
		if (mode === 'PM') {
			newHour += 12;
		}

		return newHour;
	}

	render() {
		let labelColor = this.state.isOn ? 'green' : 'red';

		return (
			<View {...this.props}>
        <ClickableLabel containerStyle = {{}} iconName= 'md-alarm' iconSize= {32} color = {labelColor} backgroundColor = 'skyblue' onPress = {() => this.alarmToggle()}>
          Alarm
        </ClickableLabel>

        {Object.keys(this.state.timeData).map((key, index) =>
          <Picker key = {key} style={[styles.picker, pickerColor]} itemStyle = {pickerItemColor} selectedValue = {this.state.timeData[key]} onValueChange={(val, index) => {this.pickerChanged(key, val)}} mode='dropdown'>
            {alarmData[key].map((val, index) =>
              <Item key={val} label={val} value={val} />
            )}
          </Picker>
        )}
    </View>
		);
	}
}

const alarmData = {
	hour: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
	minute: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'],
	mode: ['AM', 'PM'],
}

const pickerColor = Platform.OS === 'android' ? { color: 'white' } : {},
	pickerItemColor = Platform.OS === 'android' ? {} : { color: 'white' };

const styles = StyleSheet.create({
	picker: {
		width: 100
	},
});
