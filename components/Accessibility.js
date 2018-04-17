import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker, Button } from 'react-native';
import RadioForm, {SegmentedControls} from 'react-native-radio-buttons';


export default class Accessibility extends Component {
  constructor(){
    super();
	this.state={
		selectedOption: 'Stairs'
	}
  }

  render() {
    const options = ["Stairs", "Elevator"]
    function setSelectedOption(selectedOption){
      this.setState({
        selectedOption
      });
    }

    return(
      <SegmentedControls
        options={ options }
        tint = {"#C3142D"}
        onSelection={ (itemValue) => {
          this.props.getStairsOrElevator(itemValue);
          this.setState({selectedOption:itemValue});
        }
      }
        selectedOption={ this.state.selectedOption }
      />
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
})
