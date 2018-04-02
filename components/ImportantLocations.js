import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, Alert } from 'react-native';
import { Constants } from 'expo';
import { Button } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PickerValue:''
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Select a popular location!
        </Text>
        
		<Picker
          style={{width: '80%'}}
          selectedValue={this.state.PickerValue}
          onValueChange={(itemValue, itemIndex) => this.setState({PickerValue:itemValue})}>
          <Picker.Item label="Taylor Auditorium" value="[Xcoord, YCoord]" />
          <Picker.Item label="Advising Offices" value="[Xcoord, YCoord]" />
		  <Picker.Item label="Bathrooms" value="[Xcoord, YCoord]" />
          <Picker.Item label="Dividends" value="[Xcoord, YCoord]" />
        </Picker>
		
		<Button	
		onPress={() => {
			Alert.alert(this.state.PickerValue);
		}}
		title="Navigate"
		color="#FF0000"/>
      </View>
    );
  }
}

//TODO communicate with back end

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
