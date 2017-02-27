import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';

export default function HotkeyButton (props){
  const {backgroundColor, onPress, onLongPress, iconName, children} = props;

    return (
      <Button containerStyle ={[styles.hotkeyContainer, {backgroundColor}]} onPress= {onPress} onLongPress = {onLongPress}>
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Icon name={iconName} color = 'white' size={64}></Icon>
        <Text style={{fontSize: 24, textAlign: 'center', color: 'white', marginTop: 8}}>{children}</Text>
        </View>
      </Button>
    );
}

const styles = StyleSheet.create({
  hotkeyContainer: {
		flex: 4,
		padding: 4,
		margin: 5,
		overflow: 'hidden',
		borderRadius: 3,
		backgroundColor: 'red',
	}
});
