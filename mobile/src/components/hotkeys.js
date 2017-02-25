import React, { Component } from 'react';
import { Text, View } from 'react-native';
import HotkeyButton from './hotkeyButton';

const serverUrl = 'http://192.168.11.101:8080/hotkeys';
//const serverUrl = 'http://10.0.2.2:8080/hotkeys';

let requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
};

export default class Hotkeys extends Component {

	state = {
		isHome: true,
	}

	updateState(serverData){
		this.setState({
			isHome: serverData.am_home
		});

		this.props.reflectChangeToComponents();
	}

	makeServerCall(requestOptions){
		fetch(serverUrl, requestOptions)
			.then(response => response.json())
			.then((data) => this.updateState(data));
	}

	componentWillMount(){
		requestOptions['body'] = JSON.stringify([
			{
				name: 'getConfig',
				args: []
			}
		]);

		this.makeServerCall(requestOptions);
	}

	cameHome() {
		requestOptions['body'] = JSON.stringify([
			{
				name: 'comeHome',
				args: []
			}
		]);

		this.makeServerCall(requestOptions);
	}

	goSleep() {
		requestOptions['body'] = JSON.stringify([
			{
				name: 'goSleep',
				args: []
			}
		]);

		this.makeServerCall(requestOptions);
	}

	offAll(inMin) {
		requestOptions['body'] = JSON.stringify([
			{
				name: 'offAll',
				args: [inMin]
			}
		]);

		this.makeServerCall(requestOptions);
	}

	render() {
		return (
			<View {...this.props}>
      <HotkeyButton backgroundColor = 'red' iconName = 'md-power' onPress = {() => this.offAll(3)} onLongPress={() => this.offAll(0)}>
        Off All
      </HotkeyButton>

      <HotkeyButton backgroundColor = '#1b0b58' iconName = 'md-moon' onPress = {() => this.goSleep()}>
        Sleeping
      </HotkeyButton>

      <HotkeyButton backgroundColor = '#003300' iconName = 'md-home' onPress = {() => this.cameHome()}>
        Home
      </HotkeyButton>
    </View>
		);
	}
}
