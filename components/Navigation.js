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
			route: [],
			imgWidth: Number,
			imgHeight: Number
		}
	}
	componentDidMount() {
		this.setState({
			imgWidth: Dimensions.get('window').width,
			imgHeight: Dimensions.get('window').width*(FLOORPLAN_HEIGHT/FLOORPLAN_WIDTH)
		});
	}

	xcoord = (x,scaleFactor) => {
		let xConversion = 0.51262626;
		let cellWidth = 21 * xConversion;
		let cellMiddle = cellWidth/2.0;
		let xOffset = 10.0 * xConversion;

		// convert grid x to floorplan pixel x
		let xpx = Math.floor(scaleFactor*(cellWidth*x + cellMiddle - xOffset)); //subtract 1 for line width
		console.log('x: '+x+', xpx: '+xpx);
		return String(xpx);
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

		let sampleRoute = [
			{x:4,y:26},
			{x:7,y:26}
		];
		let startOuterBubble = sampleRoute.length<1?null:
			<Circle
				cx={this.xcoord(sampleRoute[0].x,scale)}
				cy={this.ycoord(sampleRoute[0].y,scale)}
				r="3"
				fill="blue"
			/>;
		let startInnerBubble = sampleRoute.length<1?null:
			<Circle
				cx={this.xcoord(sampleRoute[0].x,scale)}
				cy={this.ycoord(sampleRoute[0].y,scale)}
				r="2"
				fill="lightblue"
			/>;
		let endOuterBubble = sampleRoute.length<1?null:
			<Circle
				cx={this.xcoord(sampleRoute[sampleRoute.length-1].x,scale)}
				cy={this.ycoord(sampleRoute[sampleRoute.length-1].y,scale)}
				r="5"
				fill="red"
			/>;
		let endInnerBubble = sampleRoute.length<1?null:
			<Circle
				cx={this.xcoord(sampleRoute[sampleRoute.length-1].x,scale)}
				cy={this.ycoord(sampleRoute[sampleRoute.length-1].y,scale)}
				r="2"
				fill="#000000"
			/>;
		let loadRoute = sampleRoute.map((pair,i)=>{
			if(i<sampleRoute.length-1) return (
				<Line
					x1={this.xcoord(pair.x,scale)}
					y1={this.ycoord(pair.y,scale)}
					x2={this.xcoord(sampleRoute[i+1].x,scale)}
					y2={this.ycoord(sampleRoute[i+1].y,scale)}
					strokeWidth="2"
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
