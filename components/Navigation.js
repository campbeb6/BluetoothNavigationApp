import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Navigation extends React.Component {
	constructor() {
		super();
		this.state = {

		}
	}
	render() {
		// startingLocation
		// destination
		// stairs
		return(
			<View style={{flex:1}} >
				<Text>{'Starting location:  '+this.props.startingLocation}</Text>
				<Text>{'Destination:  '+this.props.destination}</Text>
				<Text>{'Use stairs:  '+this.props.stairs}</Text>
			</View>
		);
	}
}
