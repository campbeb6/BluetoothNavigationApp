import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker, Button } from 'react-native';

export default class Accessibility extends Component {
  constructor(){
    super();
	this.state={
		PickerValue: '',
		clickme: () => {
			var data = this.state.PickerValue;
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
      <View style = {{flex : 1}}>
        <View style = {styles.container}>
          <Text>Stairs or Elevator?</Text>
          <Picker
          style = {styles.picker}
          selectedValue = {this.state.PickerValue}
          onValueChange = {(itemValue, itemIndex) => this.setState({PickerValue:itemValue})}>
          <Picker.Item label = "Select" value = "" />
          <Picker.Item label = "Elevator" value ="elevator" />
          <Picker.Item label = "Stairs" value = "stairs" />
          </Picker>
          <View style = {styles.fullWidthButton}>
            <Button
              title = "Go"
              color = "#C3142D"
              containerViewStyle={{width: '100%', marginLeft: 0}}
              onPress = {this.state.clickme}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  picker: {
    width: '30%',
  },
  fullWidthButton: {
    width: '100%',
    height: '12%',
  }
})
