/*
 * wrap Accessibility and RoomSearch components into one cohesive
 * component. Get user input from each and pass back to App.js for navigation
 */

import React, { Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

// import Accessibility from './Accessibility';
// import RoomSearch from './RoomSearch';

export default class LocationPreferences extends React.Component {
	constructor() {
		super();
		console.log('LocationPreferences constructor');
	}
    render() {
        return (
			<View>

			</View>
        );
    }

}
