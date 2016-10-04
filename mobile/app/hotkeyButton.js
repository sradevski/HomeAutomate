import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';

export default class HotkeyButton extends Component {

  render(){
    return(
      <Button containerStyle ={[styles.hotkeyContainer, {backgroundColor: this.props.backgroundColor}]} onPress= {this.props.onPress} onLongPress = {this.props.onLongPress}>
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Icon name={this.props.iconName} color = 'white' size={64}></Icon>
        <Text style={{fontSize: 24, textAlign: 'center', color: 'white', marginTop:8}}>{this.props.children}</Text>
        </View>
      </Button>
    );
  }
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
})
