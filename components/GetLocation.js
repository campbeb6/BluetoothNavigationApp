import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AndroidBeacon from './Beacon';

export default class GetLocation extends React.Component {
	constructor() {
		super();
		console.log('GetLocation constructor');
		// call Android native module
		AndroidBeacon.startAndroidBeaconActivity();
	}
	render() {
		return(
			<View>
				<Text>Getting bluetooth sensor data...</Text>
			</View>
		);
	}
}
