import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Beacons from 'react-native-beacons-manager';

// https://github.com/MacKentoch/react-native-beacons-manager/tree/master/examples/samples#detailed-documentation--sample-code

export default class RCTBeaconManager extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			regionUUID: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
			regionID: 'id',
			beaconsDidRangeEvent: null,
			dataBeacons: null
		}
	}
	componentWillMount() {
		Beacons.detectIBeacons();
		Beacons.startRangingBeaconsInRegion(this.state.regionID,this.state.regionUUID) // or like  < v1.0.7: .startRangingBeaconsInRegion(identifier, uuid)
			.then(() => console.log('Beacons ranging started succesfully'))
			.catch(error => console.log(`Beacons ranging not started, error: ${error}`));
	}
	componentDidMount() {
		// Beacons.BeaconsEventEmitter.addListener('beaconsDidRange',()=>{console.log('did range');});
	}
	render() {
		return (
			<View>
				<Text>rct native beacons mgr</Text>
			</View>
		);
	}
}
