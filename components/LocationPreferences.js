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

export default class LocationPreferences extends React.Component {
	constructor() {
		super();
		this.state = {
			roomChoice: '',
			stairsElevator: 'Stairs'
		};
	}
    render() {
        return (
			<View style={styles.container} >
				<RoomSearch
					getChoice={this.getRoomChoice}
				/>
				<ImportantLocations
					getChoice={this.getRoomChoice}
				/>
				<Accessibility
					getStairsOrElevator={this.getStairsOrElevator}
				/>
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
	go = () => {
		///STUB start navigation
		console.log('got user destination and stairs/elevator prefs');
		this.props.startNavigation({
			destination: this.state.roomChoice,
			stairs: this.state.stairsElevator==='Stairs'
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
		// backgroundColor: '#F5FCFF',
		// alignItems: 'flex-end',
		// justifyContent: 'flex-end',
	},
	fullWidthButton: {
		width: '100%',
		height: '12%',
		// align button at bottom of screen
		position: 'absolute',
		bottom: 0
	}
});
