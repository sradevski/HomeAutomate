import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';
import Player from './app/player';
import Aircon from './app/aircon';
import Lights from './app/lights';
import Alarm from './app/alarm';
import Hotkeys from './app/hotkeys';

class HomeAutomate extends Component {
	constructor(props) {
    super(props);
		this.state = {
		}
	}

	render() {
			return (
			<View style={styles.container}>

				<View style={[styles.section, {flex: 2, backgroundColor: 'steelblue', alignSelf: 'stretch', alignItems: 'center', justifyContent:'center'}]}>
          <Text style={{alignSelf: 'center', color: 'beige', fontSize: 30}}> Steve's Home </Text>
        </View>

				<Hotkeys style={[styles.section, {flex: 6, flexDirection:'row', backgroundColor: 'white', zIndex: 100}]}></Hotkeys>

				<Alarm style={[styles.section, {flex: 3, backgroundColor: 'skyblue', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', zIndex: 50}]}></Alarm>

					{/* ***** THIRD ROW ***** */}
        <View style={[styles.section, {flex: 6, flexDirection: 'row', zIndex: 75}]}>
					<Lights style={{flex: 6, backgroundColor: 'palegoldenrod', borderRightWidth: 1, borderColor: 'gray', alignItems: 'center'}}></Lights>
					<Aircon style={{flex: 6, backgroundColor: 'lightsalmon', borderLeftWidth:1, borderColor: 'gray', alignItems: 'center'}}></Aircon>
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

AppRegistry.registerComponent('HomeAutomate', () => HomeAutomate);
