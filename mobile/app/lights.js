import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';
import ClickableLabel from './sectionClickableLabel';

const serverUrl = 'http://192.168.11.101:8080/lights';
//const serverUrl = 'http://10.0.2.2:8080/lights';

let requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
};

export default class Lights extends Component {

  state = {
    lights: {
      'EN': false,
      'DK':false,
      'SF':false,
      'MN':false
    }
  };

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

  updateState(newState){
    this.setState({
      lights: {
        'EN': newState.door_light.is_on,
        'DK': newState.desk_light.is_on,
        'SF': newState.shelf_light.is_on,
        'MN': newState.main_light.is_on,
      }
    });
  }

  makeServerCall(requestOptions){
    fetch(serverUrl, requestOptions)
      .then(response => response.json())
      .then((data) => this.updateState(data));
  }

  toggleYellowLights(){
    const goalState = !this._isAnyOn(true);
    let newLightsState = Object.assign({}, this.state.lights);

    Object.keys(this.state.lights).forEach( light => {
      if(light !== 'MN'){
        newLightsState[light] = goalState;
      }
    });

    this.setState({lights: newLightsState});

    let args = goalState ? ['rn'] : ['rf'];
    requestOptions['body'] = JSON.stringify([
      {
        name: 'toggleYellowLights',
        args: args
      }
    ]);

    this.makeServerCall(requestOptions);
  }

  toggleAllLights(){
    const goalState = !this._isAnyOn(false);
    let newLightsState = {};

    Object.keys(this.state.lights).forEach( light => {
      newLightsState[light] = goalState;
    });

    this.setState({lights: newLightsState});

    let args = goalState ? ['an'] : ['af'];
    requestOptions['body'] = JSON.stringify([
      {
        name: 'toggleAllLights',
        args: args
      }
    ]);

    this.makeServerCall(requestOptions);
  }

  toggleSingleLight(lightToModify){
    let newLightsState = Object.assign({}, this.state.lights);
    let currentLightNextState = !this.state.lights[lightToModify];
    newLightsState[lightToModify] = currentLightNextState;

    this.setState({lights: newLightsState});

    let lightId = this._getLightId(lightToModify);
    let lightToggle = currentLightNextState ? 'n' : 'f';

    requestOptions['body'] = JSON.stringify([
      {
        name: 'toggleAllLights',
        args: [lightId + lightToggle]
      }
    ]);

    this.makeServerCall(requestOptions);
  }

  _getLightId(light){
    switch(light){
      case 'EN':
        return '1';
      case 'DK':
        return '2';
      case 'SF':
        return '3';
      case 'MN':
        return '4';
    }
  }

  _isAnyOn(ignoreWhiteLight){
    const lightKeys = Object.keys(this.state.lights);

    for(let i = 0; i < lightKeys.length; i += 1){
      if(this.state.lights[lightKeys[i]]){
        if(!(ignoreWhiteLight && lightKeys[i] === 'MN')){
          return true;
        }
      }
    }
    return false;
  }

  render(){
    return (
      <View {...this.props}>
        <ClickableLabel containerStyle={{flex:6, justifyContent: 'center'}} iconName= 'md-bulb'
          iconSize= {32} color = '#66473b' backgroundColor = 'palegoldenrod' onPress = {() => this.toggleYellowLights()} onLongPress={() => this.toggleAllLights()}>
          Lights
        </ClickableLabel>

        <View style={{flex:6, flexDirection: 'row', alignItems: 'center'}}>
          {Object.keys(this.state.lights).map((val, index) =>
          <Button key ={val} containerStyle ={[styles.lightButtonContainer, { backgroundColor: this.state.lights[val] ? 'lightgreen' : 'red'}]} style={styles.lightButtonText} onPress={() => this.toggleSingleLight(val)}>
            {val}
          </Button>
          )}
        </View>
      </View>
    )
  }
}

const monospaceFontFamily = Platform.OS === 'android' ? 'monospace': 'Courier New'

const styles = StyleSheet.create({
  lightButtonContainer:{
    padding:4,
    margin: 5,
    width: 30,
    height: 30,
    overflow:'hidden',
    borderRadius:3,
  },
  lightButtonText: {
    fontSize:16,
    color:'#66473b',
    padding: 3,
    fontFamily: monospaceFontFamily
  },
});
