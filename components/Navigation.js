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

	xcoord = (x,w) => {
		return String(Math.floor(x/FLOORPLAN_WIDTH*w));
	}
	ycoord = (y,h) => {
		return String(Math.floor(y/FLOORPLAN_HEIGHT*h))
	}

	render() {
		let IMG_HEIGHT = Dimensions.get('window').width*(FLOORPLAN_HEIGHT/FLOORPLAN_WIDTH);
		let IMG_WIDTH = Dimensions.get('window').width;
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
			{x:52,y:260},
			{x:52,y:285},
			{x:80,y:285},
			{x:80,y:142},
			{x:122,y:142},
			{x:122,y:105}
		];

		let loadRoute = sampleRoute.map((pair,i)=>{
			if(i<sampleRoute.length-1) return (
				<Line
					x1={this.xcoord(pair.x,IMG_WIDTH)}
					y1={this.ycoord(pair.y,IMG_HEIGHT)}
					x2={this.xcoord(sampleRoute[i+1].x,IMG_WIDTH)}
					y2={this.ycoord(sampleRoute[i+1].y,IMG_HEIGHT)}
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
						<Circle
							cx={this.xcoord(sampleRoute[0].x,IMG_WIDTH)}
							cy={this.ycoord(sampleRoute[0].y,IMG_HEIGHT)}
							r="3"
							fill="blue"
						/>
						<Circle
							cx={this.xcoord(sampleRoute[0].x,IMG_WIDTH)}
							cy={this.ycoord(sampleRoute[0].y,IMG_HEIGHT)}
							r="2"
							fill="lightblue"
						/>
						{loadRoute}
						<Circle
							cx={this.xcoord(sampleRoute[5].x,IMG_WIDTH)}
							cy={this.ycoord(sampleRoute[5].y,IMG_HEIGHT)}
							r="5"
							fill="red"
						/>
						<Circle
							cx={this.xcoord(sampleRoute[5].x,IMG_WIDTH)}
							cy={this.ycoord(sampleRoute[5].y,IMG_HEIGHT)}
							r="2"
							fill="#000000"
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
