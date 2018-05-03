/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LocationPreferences from './components/LocationPreferences';
import Navigation from './components/Navigation';
import Login from './components/Login';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			defaultLocationPreferences: <LocationPreferences startNavigation={this.startNavigation} />,
			activePage: null,
			classes: []
		}
	}
	componentDidMount() {
		this.setState({
			activePage: <Login showEnrollments = {this.showEnrollments}/>
		});
	}

	render() {
		return(
			<View style={{flex:1}} >
				{this.state.activePage}
			</View>
		);
	}
	showEnrollments = (prefs) => {
		this.state.classes = prefs.classes;
		this.setState({
			activePage: <LocationPreferences
				classes = {prefs.classes}
				startNavigation = {this.startNavigation}
			/>
		});
	}
	startNavigation = (prefs) => {
		this.setState({
			activePage: <Navigation
				startingLocation = {'1036'}
				destination = {prefs.destination}
				stairs = {prefs.stairs}
				goBack = {()=>{
					this.setState({
						activePage: <LocationPreferences
							classes = {this.state.classes}
							startNavigation = {this.startNavigation}
						/>
					});
				}}
			/>
		});
	}
}
