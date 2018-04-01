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
				{/*
					don't include toom search yet, get Accessibility working first
				<RoomSearch />
				*/}
				<RoomSearch
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
		// for now, give an alert of destination and stairs/elevator
		// Alert.alert(
		// 	'BEGIN NAVIGATION',
		// 	'Destination: '+this.state.roomChoice+'\n'+
		// 	'Using: '+this.state.stairsElevator,
		// 	[],
		// 	{
		// 		cancelable:true,
		// 		onDismiss: ()=>{}
		// 	}
		// );
	}
	getRoomChoice = (room) => {
		this.setState({
			roomChoice: room
		},()=>{
			console.log('got room '+room+' from RoomSearch');
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
