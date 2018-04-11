import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image,Dimensions } from 'react-native';
import PinchZoomView from 'react-native-pinch-zoom-view';
import Svg, {Rect} from 'react-native-svg';

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
		let overlap = {
			position: 'absolute',
			top: 0,
			left: 0
		};

		// image width: 609, height: 539
		const FLOORPLAN_WIDTH = 609;
		const FLOORPLAN_HEIGHT = 539;
		return(
			<View style={{flex:1}} >
				<View style={{flex:0.1}}>
					<Text>{'Starting location:  '+this.props.startingLocation}</Text>
					<Text>{'Destination:  '+this.props.destination}</Text>
					<Text>{'Use stairs:  '+this.props.stairs}</Text>
				</View>
				<PinchZoomView style={{flex:0.8}}>
					<Image
						source={floorplans.floor1}
						style={overlap}
						width={Dimensions.get('window').width}
						height={Dimensions.get('window').width*(FLOORPLAN_HEIGHT/FLOORPLAN_WIDTH)}
					/>
					<Svg
						width={Dimensions.get('window').width}
	                	height={Dimensions.get('window').height*0.8}
						style={overlap}
	            	>
						<Rect
							x="0"
							y="0"
							width="70"
							height="70"
							stroke="red"
							strokeWidth="2"
							fill="none"
						/>
					</Svg>
				</PinchZoomView>
				<View style={{flex:0.1}}>
					<TouchableOpacity onPress={this.props.goBack}>
						<Text>{'BACK'}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
const floorplans = {
	floor1: require('../img/fsb_floor1.png'),
	floor2: require('../img/fsb_floor2.png')
}
