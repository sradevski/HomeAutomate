import React from 'react';
import { AppRegistry, StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';

export default function NavBar({ isLoading, refreshClickHandler }) {
	return (
		<View style={[styles.section, styles.container]}>
      <ActivityIndicator animating={isLoading} color='white' style={[{height: 20, margin: 5, padding: 5}]} size='small'/>
      <Text style={{alignSelf: 'center', color: 'beige', fontSize: 26}}> Steve's Home </Text>
      <Button containerStyle = {styles.button} onPress= {refreshClickHandler}>
        <Icon name='md-refresh' color = 'beige' style={{textAlign: 'center'}} size={30}></Icon>
      </Button>
    </View>
	);
}


const styles = StyleSheet.create({
	container: {
		paddingTop: Platform.OS === 'ios' ? 15 : 20,
		flex: 2,
		flexDirection: 'row',
		backgroundColor: 'steelblue',
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	section: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: 'gray',
	},
	button: {
		padding: 4,
		margin: 3,
		width: 60,
		height: 30,
		overflow: 'hidden',
		borderRadius: 3,
		backgroundColor: 'steelblue',
		justifyContent: 'center'
	}
});
