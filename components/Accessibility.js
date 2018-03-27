import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker, Button } from 'react-native';

export default class Accessibility extends Component {
  constructor(){
    super();
	this.state={
		pickerValue: '',
		clickme: () => {
			var data = this.state.pickerValue;
			if(data ==""){
			  alert("Please pick an option");
			} else {
			  alert(data)
			}
		}
	}
	console.log('Accessibility constructor');
  }

  render() {
    return(
      <View style = {styles.container}>
        <View>
          <Text>Stairs or Elevator?</Text>
          <Picker
	          style = {styles.picker}
	          selectedValue = {this.state.pickerValue}
	          onValueChange = {(itemValue, itemIndex) => this.setState({pickerValue:itemValue})}>
	          <Picker.Item label = "Select" value = "" />
	          <Picker.Item label = "Elevator" value ="elevator" />
	          <Picker.Item label = "Stairs" value = "stairs" />
          </Picker>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex : 1,
    // // backgroundColor: '#F5FCFF',
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end',
  },
  picker: {
    // width: '30%',
  },
  fullWidthButton: {
    width: '100%',
    height: '12%',
  }
})
