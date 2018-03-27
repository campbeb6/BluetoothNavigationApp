/*
 * wrap Accessibility and RoomSearch components into one cohesive
 * component. Get user input from each and pass back to App.js for navigation
 */

import React, { Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
	Button
} from 'react-native';

import Accessibility from './Accessibility';
import RoomSearch from './RoomSearch';

export default class LocationPreferences extends React.Component {
	constructor() {
		super();
		this.state = {
			roomChoice: ''
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

				<Accessibility />
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
		console.log('got user destination and stairs/elevator prefs');
	}
	getRoomChoice = (room) => {
		this.setState({
			roomChoice: room
		},()=>{
			console.log('got room '+room+' from RoomSearch');
		});
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
	}
});
