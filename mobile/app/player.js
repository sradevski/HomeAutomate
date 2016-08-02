import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';
import SliderWithLabel from './sliderWithLabel';
import ClickableLabel from './sectionClickableLabel';

const serverUrl = 'http://192.168.11.101:8080/player';
//const serverUrl = 'http://10.0.2.2:8080/player';

let requestOptions = {
	method: 'POST',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
};

export default class Player extends Component {

	state = {
		volume: 3,
		isOn: true,
		isPlaying: true,
	};

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

	updateState(newState) {
		this.setState({
			volume: newState.volume,
			isOn: newState.is_on,
			isPlaying: newState.is_playing,
		});
	}

	makeServerCall(requestOptions) {
		fetch(serverUrl, requestOptions)
			.then(response => response.json())
			.then((data) => this.updateState(data));
	}

	changeSong(direction) {
		requestOptions['body'] = JSON.stringify([{
			name: 'changeSong',
			args: [direction]
		}]);

		this.makeServerCall(requestOptions);
	}

	playToggle() {
		let nextState = !this.state.isPlaying;
		this.setState({ isPlaying: nextState });

		let args = nextState ? [this.state.volume] : [0];
		requestOptions['body'] = JSON.stringify([{
			name: 'playToggle',
			args: args
		}]);

		this.makeServerCall(requestOptions);
	}

	playerToggle() {
		const nextState = !this.state.isOn
		this.setState({ isOn: nextState });

		let args = nextState ? ['ton'] : ['toff'];
		requestOptions['body'] = JSON.stringify([{
			name: 'playerToggle',
			args: args
		}]);

		this.makeServerCall(requestOptions);
	}

	volumeChanged(vol) {
		this.setState({ volume: vol });

		requestOptions['body'] = JSON.stringify([{
			name: 'volumeChanged',
			args: [vol]
		}]);

		this.makeServerCall(requestOptions);
	}

	render() {
		let playIcon = this.state.isPlaying ? 'md-pause' : 'md-play';
		let labelColor = this.state.isOn ? 'green' : 'red';

		return (
			<View {...this.props} >
        <ClickableLabel containerStyle={{flex:3, justifyContent: 'center'}} iconName= 'md-musical-notes'
          iconSize= {32} color = {labelColor} backgroundColor = '#FFFCDD' onPress = {() => this.playerToggle()}>
          Player
        </ClickableLabel>
        <View style={{flex:5, flexDirection:'row', alignItems: 'center'}}>
          <Button containerStyle ={styles.changeSongButton} disabled = {!this.state.isOn} onPress= { () => this.changeSong('prev')}>
            <Icon name='md-skip-backward' color = 'black' size={textSizes.iconSize}></Icon>
          </Button>
          <Button containerStyle ={styles.playButton} disabled = {!this.state.isOn} onPress= {() => this.playToggle()}>
            <Icon name={playIcon} color = 'black' size={textSizes.iconSize}></Icon>
          </Button>
          <Button containerStyle = {styles.changeSongButton} disabled = {!this.state.isOn} onPress= {() => this.changeSong('next')}>
            <Icon name='md-skip-forward' color = 'black' size={textSizes.iconSize}></Icon>
          </Button>
        </View>
        <View style={{flex:4, alignItems: 'center'}}>
          <SliderWithLabel minimumValue={1} maximumValue={9} step={1} disabled = {!this.state.isOn} value = {this.state.volume} onSlidingComplete={(val) => this.volumeChanged(val)}></SliderWithLabel>
        </View>
      </View>
		);
	}
}

const styles = StyleSheet.create({
	changeSongButton: {
		padding: 4,
		margin: 5,
		overflow: 'hidden',
		borderRadius: 3,
		backgroundColor: '#FFFCDD'
	},
	playButton: {
		padding: 6,
		margin: 5,
		marginLeft: 10,
		marginRight: 10,
		overflow: 'hidden',
		borderRadius: 3,
		backgroundColor: '#FFFCDD'
	},
});

const textSizes = {
	iconSize: 36,
}
