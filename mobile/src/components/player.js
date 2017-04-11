import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import SliderWithLabel from './sliderWithLabel';
import ClickableLabel from './sectionClickableLabel';

import {makeServerCall, generateRequestBody, showNotification} from '../shared/utils';
import {togglePlayer, togglePlay, setVolume, updatePlayerState} from '../state/actions/player';

const mapStateToProps = (state) => ({
	player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
	togglePlayer: () => {
		dispatch(togglePlayer());
	},
	togglePlay: () => {
		dispatch(togglePlay());
	},
	setVolume: (volume) => {
		dispatch(setVolume(volume));
	},
	updatePlayerState: (newState) => {
		dispatch(updatePlayerState(newState));
	}
});

class Player extends Component {
	componentDidMount(){
		this.sendToServer(generateRequestBody('getState', []));
	}

	sendToServer(requestBody){
		makeServerCall('player', requestBody)
		.then((data) => this.props.updatePlayerState(data))
		.catch((err) => showNotification('Oops, it didn\'t work.'));
	}

	changeSong(direction) {
		this.sendToServer(generateRequestBody('changeSong', [direction]));
	}

	playToggle() {
		const {player} = this.props;
		const nextState = !player.isPlaying;

		this.props.togglePlay();
		this.sendToServer(generateRequestBody('playToggle', nextState ? [player.volume] : [0]));
	}

	playerToggle() {
		const {player} = this.props;
		const nextState = !player.isOn;

		this.props.togglePlayer();
		this.sendToServer(generateRequestBody('playerToggle', nextState ? ['ton'] : ['toff']));
	}

	volumeChanged(vol) {
		this.props.setVolume(vol);
		this.sendToServer(generateRequestBody('volumeChanged', [vol]));
	}

	render() {
		const {player} = this.props;

		const playIcon = player.isPlaying ? 'md-pause' : 'md-play';
		const labelColor = player.isOn ? 'green' : 'red';

		return (
			<View {...this.props} >
        <ClickableLabel containerStyle={{flex: 3, justifyContent: 'center'}} iconName= 'md-musical-notes'
          iconSize= {32} color = {labelColor} backgroundColor = '#FFFCDD' onPress = {() => this.playerToggle()}>
          Player
        </ClickableLabel>
        <View style={{flex: 5, flexDirection: 'row', alignItems: 'center'}}>
          <Button containerStyle ={styles.changeSongButton} disabled = {!player.isOn} onPress= { () => this.changeSong('prev')}>
            <Icon name='md-skip-backward' color = 'black' size={textSizes.iconSize}></Icon>
          </Button>
          <Button containerStyle ={styles.playButton} disabled = {!player.isOn} onPress= {() => this.playToggle()}>
            <Icon name={playIcon} color = 'black' size={textSizes.iconSize}></Icon>
          </Button>
          <Button containerStyle = {styles.changeSongButton} disabled = {!player.isOn} onPress= {() => this.changeSong('next')}>
            <Icon name='md-skip-forward' color = 'black' size={textSizes.iconSize}></Icon>
          </Button>
        </View>
        <View style={{flex: 4, alignItems: 'center'}}>
          <SliderWithLabel minimumValue={1} maximumValue={9} step={1} disabled = {!player.isOn} value = {player.volume} onSlidingComplete={(val) => this.volumeChanged(val)}></SliderWithLabel>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
