import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';
import ClickableLabel from './sectionClickableLabel';

const serverUrl = 'http://192.168.11.101:8080/aircon';
//const serverUrl = 'http://10.0.2.2:8080/aircon';

let requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
};

export default class Aircon extends Component {

  state = {
    isOn: true,
    mode: 'cooling',
    temperature: 23,
  }

  updateState(serverData){
    this.setState({isOn: serverData.is_on,
      mode: serverData.mode,
      temperature: serverData.temperature
    });
  }

  makeServerCall(requestOptions){
    fetch(serverUrl, requestOptions)
      .then(response => response.json())
      .then((data) => this.updateState(data));
  }

  componentWillMount(){
    requestOptions['body'] = JSON.stringify([
      {
        name: 'getConfig',
        args: []
      }
    ]);

    this.makeServerCall(requestOptions);
  }

  componentWillReceiveProps(newProps){
    this.componentWillMount();
  }

  toggleAircon(){
    const nextState = !this.state.isOn
    this.setState({isOn: nextState});

    let args = [0];
    if(nextState){
      args = [this.state.temperature, this.state.mode];
    }

    requestOptions['body'] = JSON.stringify([
      {
        name: 'toggleAircon',
        args: args
      }
    ]);

    this.makeServerCall(requestOptions);
  }

  toggleAirconMode(){
    let nextState =  this.state.mode === 'cooling' ? 'heating' : 'cooling';
    this.setState({mode: nextState});

    requestOptions['body'] = JSON.stringify([
      {
        name: 'toggleAirconMode',
        args: [this.state.temperature, nextState]
      }
    ]);

    this.makeServerCall(requestOptions);
  }

  temperatureChanged(degrees){
    this.setState({temperature: this.state.temperature += degrees});

    requestOptions['body'] = JSON.stringify([
      {
        name: 'temperatureChanged',
        args: [this.state.temperature]
      }
    ]);

    this.makeServerCall(requestOptions);
  }

  render(){
    let modeIcon = this.state.mode === 'cooling' ? 'md-snow' : 'md-flame';
    let modeColor = this.state.mode === 'cooling' ? {backgroundColor: 'lightblue'} : {backgroundColor:'red'};
    let modeText = this.state.mode === 'cooling' ? 'C' : 'H';;
    let labelColor = this.state.isOn ? 'green' : 'red';

    return (
      <View {...this.props}>
        <ClickableLabel containerStyle={{flex:6, justifyContent: 'center'}} iconName= 'md-thermometer'
          iconSize= {32} color = {labelColor} backgroundColor = 'lightsalmon' onPress = {() => this.toggleAircon()}>
          Aircon
        </ClickableLabel>

        <View style={{flex:6, flexDirection:'row', alignItems: 'center', justifyContent:'center'}}>
          <View style={{flex:4, alignItems: 'center'}}>
            <Button containerStyle = {[styles.modeButton, modeColor]} disabled= {!this.state.isOn} onPress= {() => this.toggleAirconMode()}>
              <Icon name={modeIcon} color = 'white' style={{textAlign: 'center'}} size={36}></Icon>
            </Button>
          </View>

          <View style={{flex:8, flexDirection: 'row', alignItems: 'center'}}>
            <Button containerStyle ={styles.temperatureButton} disabled= {!this.state.isOn} onPress= {() => this.temperatureChanged(-1)}>
              <Icon name='ios-arrow-dropleft' color = 'white' size={36}>
              </Icon>
            </Button>

            <Text style={{color: 'white', fontSize: 26, textAlign: 'center'}}>{this.state.temperature}</Text>

            <Button containerStyle ={styles.temperatureButton} disabled= {!this.state.isOn} onPress= {() => this.temperatureChanged(1)}>
              <Icon name='ios-arrow-dropright' color = 'white' size={36}>
              </Icon>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modeButton: {
    padding:4,
    margin: 3,
    width: 40,
    height: 40,
    overflow:'hidden',
    borderRadius:3,
    backgroundColor:
    'lightblue',
    justifyContent: 'center'
  },

  temperatureButton: {
    padding:4,
    margin: 5,
    overflow:'hidden',
    borderRadius:3,
    backgroundColor: 'lightsalmon'
  }
});
