import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Header extends React.Component {
	constructor() {
		super();
		console.log('Header constructor');
	}
	render() {
		return(
			<View>
				<Text>Bluetooth Navigation</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    centeredHeader: {
      flex : 1,
      backgroundColor: '#F5FCFF',
      alignItems: 'center',
      justifyContent: 'center',
    }
  })
