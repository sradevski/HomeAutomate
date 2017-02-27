import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';


export default function ClickableLabel(props){
	const {iconName, containerStyle, iconSize, color, backgroundColor, onPress, onLongPress, children} = props;

	return (
		<View style={containerStyle}>
      <Icon.Button name={iconName} size={iconSize} color= {color} backgroundColor= {backgroundColor} onPress={ onPress } onLongPress = {onLongPress}>
        <Text style={[styles.labelText, {color}]}>{children}</Text>
      </Icon.Button>
    </View>
	);
}

const styles = StyleSheet.create({
	labelText: {
		fontSize: 26,
		color: 'black',
		textAlign: 'center'
	}
});
