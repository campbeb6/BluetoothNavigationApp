import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, Alert } from 'react-native';
// import { Constants } from 'expo';
import { Button } from 'react-native';

export default class ImportantLocations extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			choice: ''
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{flex: .8}}>
					<Text style = {{color: '#000000'}}>OR choose a popular location</Text>
				</View>
				<View style={{flex: 1, alignItems: 'flex-end'}}>
					<Picker
						style={{width: '100%'}}
						selectedValue = {this.state.choice}
						onValueChange={(choice) => {
							this.setState({
								choice: choice
							},()=>{
								this.props.getChoice(choice)
							});
						}}>
							<Picker.Item label="" value="" />
							<Picker.Item label="Taylor Auditorium" value="1000" />
							<Picker.Item label="Advising Offices" value="1022" />
							<Picker.Item label="Dividends" value="1026" />
					</Picker>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: .4,
		alignItems: 'center',
		flexDirection: 'row',
		// paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ffffff'
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#34495e'
	}
});
