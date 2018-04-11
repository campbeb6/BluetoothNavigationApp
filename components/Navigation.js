import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image,Dimensions } from 'react-native';
import PinchZoomView from 'react-native-pinch-zoom-view';
import Svg, {Rect,Line} from 'react-native-svg';

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

		// image dimensions (floor 1)
		const FLOORPLAN_WIDTH = 609;
		const FLOORPLAN_HEIGHT = 539;
		const IMG_WIDTH = Dimensions.get('window').width;
		const IMG_HEIGHT = Dimensions.get('window').width*(FLOORPLAN_HEIGHT/FLOORPLAN_WIDTH);

		// example route
		const route = [{
				x: String(Math.floor(50/FLOORPLAN_WIDTH*IMG_WIDTH)),
				y: String(Math.floor(260/FLOORPLAN_HEIGHT*IMG_HEIGHT))
			},{
				x: String(Math.floor(50/FLOORPLAN_WIDTH*IMG_WIDTH)),
				y: String(Math.floor(285/FLOORPLAN_HEIGHT*IMG_HEIGHT))
			},{
				x: String(Math.floor(78/FLOORPLAN_WIDTH*IMG_WIDTH)),
				y: String(Math.floor(285/FLOORPLAN_HEIGHT*IMG_HEIGHT))
			},{
				x: String(Math.floor(78/FLOORPLAN_WIDTH*IMG_WIDTH)),
				y: String(Math.floor(142/FLOORPLAN_HEIGHT*IMG_HEIGHT))
			},{
				x: String(Math.floor(120/FLOORPLAN_WIDTH*IMG_WIDTH)),
				y: String(Math.floor(142/FLOORPLAN_HEIGHT*IMG_HEIGHT))
			},
			{
				x: String(Math.floor(120/FLOORPLAN_WIDTH*IMG_WIDTH)),
				y: String(Math.floor(105/FLOORPLAN_HEIGHT*IMG_HEIGHT))
			}
		];
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
							width={Dimensions.get('window').width}
							height={Dimensions.get('window').width*(FLOORPLAN_HEIGHT/FLOORPLAN_WIDTH)}
							stroke="red"
							strokeWidth="2"
							fill="none"
						/>
						<Line
							x1={route[0].x}
							y1={route[0].y}
							x2={route[1].x}
							y2={route[1].y}
							stroke="red"
							strokeWidth="2"
						/>
						<Line
							x1={route[1].x}
							y1={route[1].y}
							x2={route[2].x}
							y2={route[2].y}
							stroke="red"
							strokeWidth="2"
						/>
						<Line
							x1={route[2].x}
							y1={route[2].y}
							x2={route[3].x}
							y2={route[3].y}
							stroke="red"
							strokeWidth="2"
						/>
						<Line
							x1={route[3].x}
							y1={route[3].y}
							x2={route[4].x}
							y2={route[4].y}
							stroke="red"
							strokeWidth="2"
						/>
						<Line
							x1={route[4].x}
							y1={route[4].y}
							x2={route[5].x}
							y2={route[5].y}
							stroke="red"
							strokeWidth="2"
						/>
					</Svg>
				</PinchZoomView>
				<View style={{
					flex:0.1,
					backgroundColor: '#000000',
					alignItems: 'center'
				}}>
					<TouchableOpacity onPress={this.props.goBack}>
						<Text style={{
							color:'#FFFFFF',
							fontSize: 20,
							fontWeight: 'bold'
						}}>{'BACK'}</Text>
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
