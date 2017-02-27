import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import HotkeyButton from './hotkeyButton';
import {makeServerCall, generateRequestBody} from '../shared/utils';

export default class Hotkeys extends Component {
	cameHome() {
    this.sendToServer(generateRequestBody('comeHome', []));
	}

	goSleep() {
    this.sendToServer(generateRequestBody('goSleep', []));
	}

	offAll(inMin) {
    this.sendToServer(generateRequestBody('offAll', [inMin]));
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
