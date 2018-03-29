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
			defaultLocationPreferences: <LocationPreferences startNavigation={this.startNavigation} />,
			activePage: null
		}
	}
	componentDidMount() {
		this.setState({
			activePage: this.state.defaultLocationPreferences
		});
	}

	render() {
		return(
			<View style={{flex:1}} >
				{this.state.activePage}
			</View>
		);
	}

	startNavigation = (prefs) => {
		this.setState({
			activePage: <NavigationDemo
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
