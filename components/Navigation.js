import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image,Dimensions } from 'react-native';
import PinchZoomView from 'react-native-pinch-zoom-view';
import Svg, {Rect,Line,Circle} from 'react-native-svg';

// png dimensions (floor 1)
const FLOOR_1_WIDTH = 613;
const FLOOR_1_HEIGHT = 541;
const FLOOR_2_WIDTH = 0;
const FLOOR_2_HEIGHT = 0;

export default class Navigation extends React.Component {
	constructor() {
		super();
		this.state = {
			route: [],
			floor: 'floor1'
		}
	}
	componentDidMount() {
		if(routes[String(this.props.destination)]) {
			this.setState({
				route: routes[String(this.props.destination)]
			});
		}
	}

	/* x: the x coordinate of a cell returned by /route call
	 * scaleFactor: the amount by which the floorplan image was resized to fit phone screen
	 */
	xcoord = (x,scaleFactor) => {
		// add 0.5 to x to get the center of the cell (cell indices start at 0)
		// multiply by 1/57 because the grid is 57 cells wide
		return String(Math.round(scaleFactor*(x+0.5)*(1/57)*FLOOR_1_WIDTH));
	}
	ycoord = (y,scaleFactor) => {
		// add 0.5 to y to get the center of the cell (cell indices start at 0)
		// multiply by 1/51 because the grid is 57 cells wide
		return String(Math.round(scaleFactor*(y+0.5)*(1/51)*FLOOR_1_HEIGHT));
	}

	render() {
		let floorplan = {};
		if(this.state.floor==='floor1') {
			floorplan.height = FLOOR_1_HEIGHT,
			floorplan.width = FLOOR_1_WIDTH
		}
		else if(this.state.floor==='floor2') {
			floorplan.height = FLOOR_2_HEIGHT,
			floorplan.width = FLOOR_2_WIDTH
		}
		let IMG_HEIGHT = Dimensions.get('window').width*(floorplan.height/floorplan.width);
		let IMG_WIDTH = Dimensions.get('window').width;
		let scale = IMG_HEIGHT / (floorplan.height*1.0);
		// PROPS:
		// startingLocation
		// destination
		// stairs
		let overlap = {
			position: 'absolute',
			top: 0,
			left: 0
		};
		let halfWidthButton = {
			width: Dimensions.get('window').width/2,
			alignItems: 'center',
			backgroundColor: '#C3142D'
		};

		// only load for floor1 for demo, don't forget to adjust this after the demo!
		let startOuterBubble = this.state.floor==='floor1'?this.state.route.length<1?null:
			<Circle
				cx={this.xcoord(this.state.route[0].x,scale)}
				cy={this.ycoord(this.state.route[0].y,scale)}
				r="3"
				fill="blue"
			/>:null;
		// only load for floor1 for demo, don't forget to adjust this after the demo!
		let startInnerBubble = this.state.floor==='floor1'?this.state.route.length<1?null:
			<Circle
				cx={this.xcoord(this.state.route[0].x,scale)}
				cy={this.ycoord(this.state.route[0].y,scale)}
				r="2"
				fill="lightblue"
			/>:null;
		// only load for floor1 for demo, don't forget to adjust this after the demo!
		let endOuterBubble = this.state.floor==='floor1'?this.state.route.length<1?null:
			<Circle
				cx={this.xcoord(this.state.route[this.state.route.length-1].x,scale)}
				cy={this.ycoord(this.state.route[this.state.route.length-1].y,scale)}
				r="5"
				fill="red"
			/>:null;
		// only load for floor1 for demo, don't forget to adjust this after the demo!
		let endInnerBubble = this.state.floor==='floor1'?this.state.route.length<1?null:
			<Circle
				cx={this.xcoord(this.state.route[this.state.route.length-1].x,scale)}
				cy={this.ycoord(this.state.route[this.state.route.length-1].y,scale)}
				r="2"
				fill="#000000"
			/>:null;
		// only load for floor1 for demo, don't forget to adjust this after the demo!
		// for routes that go to second floor, check if the current floor matches the
		// coordinates' floor -- only load if it matches (otherwise first and second
		// floor portions of route will show on top of each other)
		let loadRoute = this.state.floor==='floor1'?this.state.route.map((pair,i)=>{
			if(i<this.state.route.length-1) return (
				<Line
					x1={this.xcoord(pair.x,scale)}
					y1={this.ycoord(pair.y,scale)}
					x2={this.xcoord(this.state.route[i+1].x,scale)}
					y2={this.ycoord(this.state.route[i+1].y,scale)}
					strokeWidth="1.5"
					stroke={this.props.stairs?'blue':'green'}
				/>
			)
		}):null;
		let svgOutline = <Rect
			x="0"
			y="0"
			width={Dimensions.get('window').width}
			height={Dimensions.get('window').width*(FLOOR_1_HEIGHT/FLOOR_1_WIDTH)}
			stroke="red"
			strokeWidth="2"
			fill="none"
		/>;

		return(
			<View style={{flex:1}} >
				<View style={{
					flex:0.1,
					alignItems:'center'
				}}>
					<Text style={{
						fontSize: 18,
						fontWeight: 'bold'
					}}>{'Navigating to room '+this.props.destination+'...'}</Text>
				</View>
				<PinchZoomView style={{flex:0.7}}>
					<Image
						source={floorplans[this.state.floor]}
						style={overlap}
						width={Dimensions.get('window').width}
						height={Dimensions.get('window').width*(FLOOR_1_HEIGHT/FLOOR_1_WIDTH)}
					/>
					<Svg
						width={Dimensions.get('window').width}
	                	height={Dimensions.get('window').height*0.8}
						style={overlap}
	            	>
						{svgOutline}
						{loadRoute}
						{startOuterBubble}
						{startInnerBubble}
						{endOuterBubble}
						{endInnerBubble}
					</Svg>
				</PinchZoomView>
				<View style={{
					flex:0.1,
					backgroundColor: '#C3142D',
					alignItems: 'center',
					flexDirection: 'row'
				}}>
					<TouchableOpacity style={halfWidthButton}
						onPress={()=>this.setState({floor:'floor1'})}>
						<Text style={{
							color:'#ffffff',
							fontSize: 19
						}}>{'Floor 1'}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={halfWidthButton}
						onPress={()=>this.setState({floor:'floor2'})}>
						<Text style={{
							color:'#ffffff',
							fontSize: 19
						}}>{'Floor 2'}</Text>
					</TouchableOpacity>
				</View>
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
	toggleFloor = () => {
		this.setState({
			floor: this.state.floor==='floor1'?'floor2':'floor1'
		},()=>{
			console.log('changed to floor '+this.state.floor);
		})
	}
}
const floorplans = {
	floor1: require('../img/fsb_floor1_trimmed.png'),
	floor2: require('../img/fsb_floor2_trimmed.png')
}

const routes = {
	'1026': [
		{floor:1,x:4,y:26},
		{floor:1,x:7,y:26},
		{floor:1,x:7,y:20},
		{floor:1,x:7,y:16},
		{floor:1,x:7,y:13},
		{floor:1,x:11,y:13},
		{floor:2,x:14,y:13}
	],
	'1000': [
		{floor:1,x:4,y:26},
		{floor:1,x:7,y:26},
		{floor:1,x:7,y:20},
		{floor:1,x:7,y:16},
		{floor:1,x:7,y:13},
		{floor:1,x:11,y:13},
		{floor:1,x:21,y:13},
		{floor:1,x:21,y:15},
		{floor:1,x:30,y:15},
		{floor:1,x:30,y:13},
		{floor:1,x:44,y:13},
		{floor:1,x:44,y:41}
	],
	'1022': [
		{floor:1,x:4,y:26},
		{floor:1,x:7,y:26},
		{floor:1,x:7,y:20},
		{floor:1,x:7,y:16},
		{floor:1,x:7,y:13},
		{floor:1,x:11,y:13},
		{floor:1,x:21,y:13},
		{floor:1,x:21,y:11},
		{floor:1,x:25,y:11},
		{floor:1,x:25,y:10}
	]
}
