import React, { Component } from 'react';
import { StyleSheet, Text, View, Slider } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SliderWithLabel extends Component {

	state = {
		value: this.props.value
	}

	componentWillReceiveProps(newProps) {
		this.setState({ value: newProps.value });
	}

	render() {
		return (
			<View style={{flexDirection: 'row', alignItems: 'center', margin: 6}}>
        <Slider {...this.props} style= {styles.sliderElem} onValueChange={(value) => this.setState({value: value})} />
					<Text style={[styles.sliderText, {opacity: this.props.disabled ? 0.2 : 1}]} >
	          {this.state.value && +this.state.value.toFixed(3)}
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
		textAlign: 'center',
		fontWeight: '500',
		margin: 4,
	},
});
