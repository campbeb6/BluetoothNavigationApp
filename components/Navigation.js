import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image,Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
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
		let overlappingViews = {
			position: 'absolute',
			top: Dimensions.get('window').height*0.2,
			bottom: Dimensions.get('window').height*0.8
		};
		return(
			<View style={{flex:1}} >
				<View style={{flex:0.1}}>
					<Text>{'Starting location:  '+this.props.startingLocation}</Text>
					<Text>{'Destination:  '+this.props.destination}</Text>
					<Text>{'Use stairs:  '+this.props.stairs}</Text>
				</View>
				<View style={overlappingViews}>
					<ImageZoom
						cropWidth={Dimensions.get('window').width}
						cropHeight={Dimensions.get('window').height}
						imageWidth={Dimensions.get('window').width}
						imageHeight={Dimensions.get('window').height}
						style={{
							position: 'absolute',
							top: 0,
						}}
					>
						<Image
							resizeMode = "contain"
							resizeMethod = "scale"
							source={floorplans.floor1}
							style={{
								position: 'absolute',
								top: 0,
							}}
							width={Dimensions.get('window').width}
							height={Dimensions.get('window').height*0.8}
						/>
					</ImageZoom>
				</View>
				<View style={overlappingViews}>
					<Svg
	                	height="100"
	                	width="100"
	            	>
						<Rect
							x="0"
							y="0"
							width="70"
							height="70"
							stroke="red"
							strokeWidth="2"
							fill="yellow"
						/>
					</Svg>
				</View>
				<View>
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
