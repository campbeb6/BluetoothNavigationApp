import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Beacons from 'react-native-beacons-manager';

// https://github.com/MacKentoch/react-native-beacons-manager/tree/master/examples/samples#detailed-documentation--sample-code

export default class RCTBeaconManager extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			regionUUID: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
			regionID: 'id'
		}
	}
	render() {
		return (
			<View>
				<Text>rct native beacons mgr</Text>
			</View>
		);
	}
}
