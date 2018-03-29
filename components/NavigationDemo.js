import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class NavigationDemo extends React.Component {
	render() {
		return(
			<View style={{flex:1}} >
				<Text>navigation demo</Text>
				<Text>{'Destination: '+this.props.destination}</Text>
				<Text>{'Stairs or elevator: '}{this.props.stairs?'stairs':'elevator'}</Text>
				<Text></Text>
			</View>
		);
	}
}
