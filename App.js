/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LocationPreferences from './components/LocationPreferences';
import Navigation from './components/Navigation';
import NativeTest from './components/NativeTest';

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
		// call Android native module, response will be "testing native module"
		NativeTest.test((response)=>{
			console.log(response);
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
