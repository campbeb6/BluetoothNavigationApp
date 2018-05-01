/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LocationPreferences from './components/LocationPreferences';
import Navigation from './components/Navigation';
import GetLocation from './components/GetLocation';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			defaultLocationPreferences: <LocationPreferences startNavigation={this.startNavigation} />,
			activePage: <GetLocation />
		}
	}
	// componentDidMount() {
	// 	this.setState({
	// 		activePage: this.state.defaultLocationPreferences
	// 	});
	// }

	render() {
		return(
			<View style={{flex:1}} >
				{this.state.activePage}
			</View>
		);
	}

	startNavigation = (prefs) => {
		this.setState({
			activePage: <Navigation
				startingLocation = {'1036'}
				destination = {prefs.destination}
				stairs = {prefs.stairs}
				goBack = {()=>{
					this.setState({
						activePage: this.state.defaultLocationPreferences
					});
				}}
			/>
		});
	}
}
