/*
 * wrap Accessibility and RoomSearch components into one cohesive
 * component. Get user input from each and pass back to App.js for navigation
 */

import React, { Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
	Button,
	Alert
} from 'react-native';

import Accessibility from './Accessibility';
import RoomSearch from './RoomSearch';
import ImportantLocations from './ImportantLocations';
import Enrollments from './Enrollments';
import RCTBeaconManager from './RCTBeaconManager';

export default class LocationPreferences extends React.Component {
	constructor() {
		super();
		this.state = {
			roomChoice: '',
			stairsElevator: 'Stairs',
			nearestBeaconMinorID: ''
		};
	}
    render() {
        return (
			<View style={styles.container} >
				<RCTBeaconManager
					nearestBeacon = {this.getNearestBeaconMinorID}
				/>
				<View style={{flex:0.5, zIndex:1, flexDirection:'column'}}>
					<Text>Enter a room number:</Text>
					<RoomSearch
						getChoice={this.getRoomChoice}
					/>
				</View>
				<View style={{flex:0.2, zIndex:0, flexDirection:'column'}}>
					<ImportantLocations
						getChoice={this.getRoomChoice}
					/>
				</View>
				<View style={{flex:.2}}>
					<Enrollments
						getChoice = {this.getRoomChoice}
						classes = {this.props.classes}
					/>
				</View>
				<View style={{flex:0.2}}>
					<Text style = {{color: '#000000'}}>Elevator or Stairs?</Text>
					<Accessibility
						getStairsOrElevator={this.getStairsOrElevator}
					/>
				</View>
				<View style = {styles.fullWidthButton}>
					<Button
						title = "Go"
						color = "#C3142D"
						containerViewStyle={{width: '100%', marginLeft: 0}}
						onPress = {this.go}
					/>
	            </View>
			</View>
        );
    }
	getNearestBeaconMinorID = (id) => {
		this.setState({
			nearestBeaconMinorID: id
		},()=>{
			console.log('LocPrefs: nearest beacon:  '+this.state.nearestBeaconMinorID);
		})
	}
	go = () => {
		///STUB start navigation
		console.log('got user destination and stairs/elevator prefs');
		console.log('the room choice is', this.state.roomChoice);
		this.props.startNavigation({
			destination: '1000',
			stairs: this.state.stairsElevator==='Stairs',
			nearestBeaconMinorID: this.state.nearestBeaconMinorID
		});
	}
	getRoomChoice = (room) => {
		this.setState({
			roomChoice: room
		},()=>{
			console.log('got room '+room+' from RoomSearch/ImportantLocations');
		});
	}
	getStairsOrElevator = (choice) => {
		this.setState({
			stairsElevator: choice
		},()=>{
			console.log('got accessibility choice: '+choice);
		})
	}
}

const styles = StyleSheet.create({
	container: {
		flex : 1,
		backgroundColor: '#FFFFFF',
		// alignItems: 'flex-end',
		// justifyContent: 'flex-end',
	},
	fullWidthButton: {
		width: '100%',
		flex: .1,
		// height: '12%',
		// // align button at bottom of screen
		position: 'absolute',
		bottom: 0
	}
});
