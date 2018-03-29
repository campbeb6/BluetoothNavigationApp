import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class NavigationDemo extends React.Component {
	render() {
		return (
			<View style={{flex:1}} >
				<Button
					title="Go back"
					color="#D3D3D3"
					onPress={this.props.goBack}
				/>
				<Text>{'Destination: '+this.props.destination}</Text>
				<Text>{'Stairs or elevator: '}{this.props.stairs?'stairs':'elevator'}</Text>
				<Image
					style = {styles.img}
					source = {require('../img/fsb_example.jpg')}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	img: {
		justifyContent:'center',
		alignItems:'center',
		height: 360,
		width: 360
	}
});
