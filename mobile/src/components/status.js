import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import {makeServerCall, generateRequestBody} from '../shared/utils';

const mapStateToProps = (state) => ({
	appState: state.appState,
	location: state.location,
});

class Status extends Component {

	render() {
		const {appState, location, style} = this.props;
		return (
			<View style={[style, {justifyContent: 'center', alignItems: 'center'}]}>
				<Text style={styles.textTitle}>Status:</Text>
				<Text style={styles.textValue}>{appState.connectionStatus}</Text>
				<Text style={styles.textTitle}>Location:</Text>
				<Text style={styles.textValue}>{location.isHome ? 'Home' : 'Away'} </Text>
				<Text style={styles.textTitle}>Notification:</Text>
				<Text style={styles.textValue}>{appState.notification || 'None'} </Text>
      </View>
		);
	}
}


const styles = StyleSheet.create({
    textTitle: {
		fontSize: 14,
		textDecorationLine: 'underline',
		fontWeight: 'bold',
		marginTop: 5,
	},
	textValue: {
		textAlign: 'center',
	}
});

export default connect(mapStateToProps, null)(Status);
