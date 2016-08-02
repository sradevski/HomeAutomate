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
	state = {
		rerenderComponents: true
  };

	reflectChangeToComponents(){
		this.setState({rerenderComponents: !this.state.rerenderComponents});
	}

	render() {
			return (
			<View style={styles.container}>

				<View style={[styles.section, {flex: 2, flexDirection: 'row', backgroundColor: 'steelblue', alignSelf: 'stretch', alignItems: 'center', justifyContent:'space-between'}]}>
          	<Text style={{alignSelf: 'center', color: 'beige', fontSize: 26}}> Steve's Home </Text>
						<Button containerStyle = {{padding:4, margin: 3, width: 30, height: 30, overflow:'hidden', borderRadius:3, backgroundColor: 'steelblue', justifyContent: 'center'}} onPress= {() => this.reflectChangeToComponents()}>
							<Icon name='md-refresh' color = 'beige' style={{textAlign: 'center'}} size={30}></Icon>
						</Button>
        </View>

				<Hotkeys reflectChangeToComponents = {() => this.reflectChangeToComponents()} style={[styles.section, {flex: 6, flexDirection:'row', backgroundColor: 'white', zIndex: 100}]}></Hotkeys>

				<Alarm reflectChangeToComponents = {() => this.reflectChangeToComponents()} style={[styles.section, {flex: 3, backgroundColor: 'skyblue', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', zIndex: 50}]}></Alarm>

					{/* ***** THIRD ROW ***** */}
        <View style={[styles.section, {flex: 6, flexDirection: 'row', zIndex: 75}]}>
					<Lights reflectChangeToComponents = {() => this.reflectChangeToComponents()} style={{flex: 6, backgroundColor: 'palegoldenrod', borderRightWidth: 1, borderColor: 'gray', alignItems: 'center'}}></Lights>
					<Aircon reflectChangeToComponents = {() => this.reflectChangeToComponents()} style={{flex: 6, backgroundColor: 'lightsalmon', borderLeftWidth:1, borderColor: 'gray', alignItems: 'center'}}></Aircon>
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

AppRegistry.registerComponent('HomeAutomate', () => HomeAutomate);
