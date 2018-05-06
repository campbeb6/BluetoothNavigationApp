import React, { Component } from 'react';
import { StyleSheet, Text, View, DeviceEventEmitter } from 'react-native';
import Beacons from 'react-native-beacons-manager';

// https://github.com/MacKentoch/react-native-beacons-manager/tree/master/examples/samples#detailed-documentation--sample-code

export default class RCTBeaconManager extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			regionUUID: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
			regionID: 'id',
			beaconsDidRangeEvent: null,
			beaconsInRange: [],
			nearestBeaconMinorID: ''
		}
	}
	componentWillMount() {
		if(Platform.OS === 'ios') {
			Beacons.requestWhenInUseAuthorization();
		}
		Beacons.detectIBeacons();
		Beacons.startRangingBeaconsInRegion(this.state.regionID,this.state.regionUUID) // or like  < v1.0.7: .startRangingBeaconsInRegion(identifier, uuid)
			.then(() => console.log('Beacons ranging started succesfully'))
			.catch(error => console.log(`Beacons ranging not started, error: ${error}`));
	}
	componentDidMount() {
		DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
			this.setState({
				beaconsInRange: data.beacons.length>0
					? data.beacons : this.state.beaconsInRange
			},()=>{
				console.log(this.state.beaconsInRange);
			});
		});
	}
	getNearestBeaconMinorID() {
		let maxRSSI = Number.MIN_SAFE_INTEGER; // starts as a very low number
		// closest beacon will have highest RSSI value (least negative)
		for(let i=0;i<this.state.beaconsInRange.length;i++) {
			let b = this.state.beaconsInRange[i];
			if(b.rssi > maxRSSI) {
				this.setState({
					nearestBeaconMinorID: b.minor
				},()=>{
					maxRSSI = b.rssi;
				});				
			}
		}
	}
	render() {
		return (
			<View>
				<Text>rct native beacons mgr</Text>
				<Text>{JSON.stringify(this.state.beaconsInRange)}</Text>
			</View>
		);
	}
}
