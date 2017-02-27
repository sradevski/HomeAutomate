import React, { Component } from 'react';
import { StyleSheet, Text, View, Slider } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SliderWithLabel extends Component {
	constructor(props){
		super(props);
		this.state = {
			value: this.props.value
		};
	}

	componentWillReceiveProps(newProps){
		if (this.state.value !== newProps.value){
			this.setState({value: newProps.value});
		}
	}

	render() {
		return (
			<View style={{flexDirection: 'row', alignItems: 'center', margin: 6}}>
        <Slider {...this.props} style= {styles.sliderElem} onValueChange={(value) => this.setState({value})} />
					<Text style={[styles.sliderText, {opacity: this.props.disabled ? 0.4 : 1}]} >
						{this.state.value}
					</Text>
      </View>
		);
	}
}

const styles = StyleSheet.create({
	sliderElem: {
		height: 25,
		width: 180
	},
	sliderText: {
		fontSize: 20,
		color: 'black',
		textAlign: 'center',
		fontWeight: '500',
		margin: 10,
	},
});
