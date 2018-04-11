import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image,Dimensions } from 'react-native';
import PinchZoomView from 'react-native-pinch-zoom-view';
import Svg, {Rect,Line,Circle} from 'react-native-svg';

// png dimensions (floor 1)
const FLOORPLAN_WIDTH = 609;
const FLOORPLAN_HEIGHT = 539;

export default class Navigation extends React.Component {
	constructor() {
		super();
		this.state = {
			route: []
		}
	}
	componentDidMount() {
		if(routes[String(this.props.destination)]) {
			this.setState({
				route: routes[String(this.props.destination)]
			});
		}
	}

	xcoord = (x,scaleFactor) => {
		let xConversion = 0.51262626;
		let cellWidth = 21 * xConversion;
		let cellMiddle = cellWidth/2.0;
		let xOffset = 10.0 * xConversion;

		// convert grid x to floorplan pixel x
		let xpx = Math.floor(scaleFactor*(cellWidth*x + cellMiddle - xOffset)); //subtract 1 for line width
		console.log('x: '+x+', xpx: '+xpx);
		return String(xpx+1);
	}
	ycoord = (y,scaleFactor) => {
		// adjust for 21px width of cell, 3px y-offset, and 10.5 for center
		let yConversion = 0.50849057;
		let cellHeight = 21 * yConversion;
		let cellMiddle = cellHeight/2.0;
		let yOffset = 3.0 * yConversion;

		let ypx = Math.floor(scaleFactor*(cellHeight*y +cellMiddle - yOffset));
		console.log('y: '+y+', ypx: '+ypx);
		return String(ypx);
	}

	render() {
		let IMG_HEIGHT = Dimensions.get('window').width*(FLOORPLAN_HEIGHT/FLOORPLAN_WIDTH);
		let IMG_WIDTH = Dimensions.get('window').width;
		let scale = IMG_HEIGHT / (FLOORPLAN_HEIGHT*1.0);
		// PROPS:
		// startingLocation
		// destination
		// stairs
		let overlap = {
			position: 'absolute',
			top: 0,
			left: 0
		};
		let startOuterBubble = this.state.route.length<1?null:
			<Circle
				cx={this.xcoord(this.state.route[0].x,scale)}
				cy={this.ycoord(this.state.route[0].y,scale)}
				r="3"
				fill="blue"
			/>;
		let startInnerBubble = this.state.route.length<1?null:
			<Circle
				cx={this.xcoord(this.state.route[0].x,scale)}
				cy={this.ycoord(this.state.route[0].y,scale)}
				r="2"
				fill="lightblue"
			/>;
		let endOuterBubble = this.state.route.length<1?null:
			<Circle
				cx={this.xcoord(this.state.route[this.state.route.length-1].x,scale)}
				cy={this.ycoord(this.state.route[this.state.route.length-1].y,scale)}
				r="5"
				fill="red"
			/>;
		let endInnerBubble = this.state.route.length<1?null:
			<Circle
				cx={this.xcoord(this.state.route[this.state.route.length-1].x,scale)}
				cy={this.ycoord(this.state.route[this.state.route.length-1].y,scale)}
				r="2"
				fill="#000000"
			/>;
		let loadRoute = this.state.route.map((pair,i)=>{
			if(i<this.state.route.length-1) return (
				<Line
					x1={this.xcoord(pair.x,scale)}
					y1={this.ycoord(pair.y,scale)}
					x2={this.xcoord(this.state.route[i+1].x,scale)}
					y2={this.ycoord(this.state.route[i+1].y,scale)}
					strokeWidth="1.5"
					stroke="blue"
				/>
			)
		});

		return(
			<View style={{flex:1}} >
				<View style={{
					flex:0.1
				}}>
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
						{loadRoute}
						{startOuterBubble}
						{startInnerBubble}
						{endOuterBubble}
						{endInnerBubble}
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

const routes = {
	'1026': [
		{x:4,y:26},
		{x:7,y:26},
		{x:7,y:20},
		{x:7,y:16},
		{x:7,y:13},
		{x:11,y:13}
	],
	'1000': [
		{x:4,y:26},
		{x:7,y:26},
		{x:7,y:20},
		{x:7,y:16},
		{x:7,y:13},
		{x:11,y:13},
		{x:21,y:13},
		{x:21,y:15},
		{x:30,y:15},
		{x:30,y:13},
		{x:44,y:13},
		{x:44,y:41}
	],
	'1022': [
		{x:4,y:26},
		{x:7,y:26},
		{x:7,y:20},
		{x:7,y:16},
		{x:7,y:13},
		{x:11,y:13},
		{x:21,y:13},
		{x:21,y:11},
		{x:25,y:11},
		{x:25,y:10},
	]
}
