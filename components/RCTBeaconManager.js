import React, { Component } from 'react';
import { StyleSheet, Text, View, DeviceEventEmitter, Platform } from 'react-native';
import Beacons from 'react-native-beacons-manager';

// https://github.com/MacKentoch/react-native-beacons-manager/tree/master/examples/samples#detailed-documentation--sample-code

export default class RCTBeaconManager extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			regionUUID: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
			regionID: 'id',
			beaconsDidRangeEvent: null,
			beaconsInRange: sampleBeacons,
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
				// console.log(JSON.stringify(this.state.beaconsInRange));
				this.getNearestBeaconMinorID();
				this.props.nearestBeacon(this.state.nearestBeaconMinorID);
			});
		});
	}
	getNearestBeaconMinorID() {
		let maxRSSI = Number.MIN_SAFE_INTEGER; // starts as a very low number
		// closest beacon will have highest RSSI value (least negative)
		for(let i=0;i<this.state.beaconsInRange.length;i++) {
			let b = this.state.beaconsInRange[i];
			// ignore beacon 1000 and 2000 since they are not mounted
			if(b.rssi > maxRSSI && b.minor!==1000 && b.minor!==2000) {
				this.setState({
					nearestBeaconMinorID: String(b.minor)
				},()=>{
					maxRSSI = b.rssi;
				});
			}
		}
	}
	// mandatory render(), this component does not display anything
	render() {
		return (null);
	}
}

// actual output from android test
const sampleBeacons = [{
		proximity: 'immediate',
		distance: 0.24225736553310676,
		rssi: -59,
		minor: 1000,
		major: 1,
		uuid: 'b9407f30-f5f8-466e-aff9-25556b57fe6d'
	},{
		proximity: 'immediate',
		distance: 0.5879588872684474,
		rssi: -52,
		minor: 2000,
		major: 1,
		uuid: 'b9407f30-f5f8-466e-aff9-25556b57fe6d'
	},
	{ /* dummy beacon, not actual data */
		rssi: -30,
		minor: 1035
	}
];
