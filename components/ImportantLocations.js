import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, Alert } from 'react-native';
import { Constants } from 'expo';
import { Button } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: 'fun'
    }
  }
  
  function getRooms() {
  return fetch('http://10.36.0.144:3000/rooms')
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.rooms;
    })
    .catch((error) => {
      console.error("Data could not be retrieved");
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Select a popular location!
        </Text>
        
		<Picker
          style={{width: 100}}
          selectedValue={this.state.language}
          onValueChange={(lang) => this.setState({language: lang})}>
          <Picker.Item label="Taylor Auditorium" value="fsb1001" />
          <Picker.Item label="Advising Offices" value="fsb1001" />
		  <Picker.Item label="Bathrooms" value="fsb1002" />
          <Picker.Item label="Dividends" value="fsb1003" />
        </Picker>
		
		<Button	
		onPress={() => {
			Alert.alert(this.lang);
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
