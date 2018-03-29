/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LocationPreferences from './components/LocationPreferences';
import NavigationDemo from './components/NavigationDemo';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			activePage: <LocationPreferences startNavigation={this.startNavigation} />
		}
	}

	render() {
		return(
			<View style={{flex:1}} >
				{this.state.activePage}
			</View>
		);
	}

	startNavigation = (prefs) => {
		console.log('App: starting nav to:');
		console.log(prefs);
		this.setState({
			activePage: <NavigationDemo
				destination = {prefs.destination}
				stairs = {prefs.stairs}
			/>
		});
	}
}
