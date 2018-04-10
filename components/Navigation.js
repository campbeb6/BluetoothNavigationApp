import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PhotoView from 'react-native-photo-view';

export default class Navigation extends React.Component {
	constructor() {
		super();
		this.state = {

		}
	}
	render() {
		// PROPS:
		// startingLocation
		// destination
		// stairs
		return(
			<View style={{flex:1}} >
				<View style={{flex:0.1}}>
					<Text>{'Starting location:  '+this.props.startingLocation}</Text>
					<Text>{'Destination:  '+this.props.destination}</Text>
					<Text>{'Use stairs:  '+this.props.stairs}</Text>
				</View>
				<View>
				<PhotoView
					source={require('../img/fsb_floor1.png')}
					minimumZoomScale={0.5}
					maximumZoomScale={3}
					onLoad={() => console.log("Image loaded!")}
					style={{width: 300, height: 300}}
				/>
				</View>
				<View style={{flex:0.1}}>
					<TouchableOpacity onPress={this.props.goBack}>
						<Text>{'BACK'}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const floorplans = [
	{source: require('../img/fsb_floor1.png')},
	{source: require('../img/fsb_floor2.png')}
]
