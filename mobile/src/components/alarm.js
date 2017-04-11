import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Picker } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';
import _ from 'lodash';
import SliderWithLabel from './sliderWithLabel';
import ClickableLabel from './sectionClickableLabel';

import {makeServerCall, generateRequestBody, showNotification} from '../shared/utils';
import {toggleAlarm, setAlarmTime, updateAlarmState} from '../state/actions/alarm';

const Item = Picker.Item;

const mapStateToProps = (state) => ({
	alarm: state.alarm,
});

const mapDispatchToProps = (dispatch) => ({
	toggleAlarm: () => {
		dispatch(toggleAlarm());
	},
	setAlarmTime: (time) => {
		dispatch(setAlarmTime(time));
	},
	updateAlarmState: (newState) => {
		dispatch(updateAlarmState(newState));
	}
});

class Alarm extends Component {
	componentDidMount() {
		this.sendToServer(generateRequestBody('getState', []));
	}

	sendToServer(requestBody){
		makeServerCall('alarm', requestBody)
		.then((data) => this.props.updateAlarmState(data))
		.catch((err) => showNotification('Oops, it didn\'t work.'));
	}

	toggleAlarm() {
		const {isOn, timeData} = this.props.alarm;
		let args = [timeData.hour, timeData.minute];
		if (isOn) {
			args = ['r'];
		}

		this.props.toggleAlarm();
		this.sendToServer(generateRequestBody('alarmToggle', args));
	}

	pickerChanged(key, value) {
		const {isOn, timeData} = this.props.alarm;
		const newTimeData = Object.assign({}, timeData);
		newTimeData[key] = value;

		this.props.setAlarmTime(newTimeData);
		if (isOn){
			this.sendToServer(generateRequestBody('alarmToggle', [newTimeData.hour, newTimeData.minute]));
		}
	}

	render() {
		const {isOn, timeData} = this.props.alarm;
		const labelColor = isOn ? 'green' : 'red';

		return (
			<View {...this.props}>
        <ClickableLabel containerStyle = {{paddingRight: 30}} iconName= 'md-alarm' iconSize= {32} color = {labelColor} backgroundColor = 'skyblue' onPress = {() => this.toggleAlarm()}>
          Alarm
        </ClickableLabel>

        {_.keys(timeData).map((key, index) =>
          <Picker key = {key} style={[styles.picker, pickerColor]} itemStyle = {pickerItemColor} selectedValue = {timeData[key]} onValueChange={(val, index) => { this.pickerChanged(key, val); }} mode='dropdown'>
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
	hour: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '0'],
	minute: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'],
};

const pickerColor = Platform.OS === 'android' ? { color: 'white' } : {},
	pickerItemColor = Platform.OS === 'android' ? {} : { color: 'white' };

const styles = StyleSheet.create({
	picker: {
		width: 90
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Alarm);
