import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';

export default class ClickableLabel extends Component {

	//TODO: Add PropTypes validation and initialization;

	render() {
		return (
			<View style={this.props.containerStyle}>
        <Icon.Button name={this.props.iconName} size={this.props.iconSize} color= {this.props.color} backgroundColor= {this.props.backgroundColor} onPress={ this.props.onPress } onLongPress = { this.props.onLongPress}>
          <Text style={[styles.labelText, {color: this.props.color}]}>{this.props.children}</Text>
        </Icon.Button>
      </View>
		);
	}
}

const styles = StyleSheet.create({
	labelText: {
		fontSize: 26,
		color: 'black',
		textAlign: 'center'
	}
});
