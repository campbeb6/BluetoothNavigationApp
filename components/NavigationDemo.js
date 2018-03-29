import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class NavigationDemo extends React.Component {
	render() {
		return (
			<View style={{flex:1}} >
				<Button
					title="Go back"
					color="#D3D3D3"
					onPress={this.props.goBack}
				/>
				<Text>navigation demo</Text>
				<Text>{'Destination: '+this.props.destination}</Text>
				<Text>{'Stairs or elevator: '}{this.props.stairs?'stairs':'elevator'}</Text>
				<Text></Text>
			</View>
		);
	}
}
