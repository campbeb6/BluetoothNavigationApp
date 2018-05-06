import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image,Dimensions } from 'react-native';
import PinchZoomView from 'react-native-pinch-zoom-view';
import Svg, {Rect,Line,Circle} from 'react-native-svg';

// png dimensions (floor 1)
const FLOOR_1_WIDTH = 613;
const FLOOR_1_HEIGHT = 541;
const FLOOR_2_WIDTH = 617;
const FLOOR_2_HEIGHT = 528;

export default class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			route: [],
			floor: 1
		}
		console.log('nav b-id:  '+this.props.nearestBeaconMinorID);
	}
	componentDidMount() {
		// use hard-coded sample routes
		console.log('dest: '+String(this.props.destination));
		this.getRoute();
	}

	// get the route from the server
	getRoute = () => {
		console.log('nav: getRoute()');
		let url = 'http://10.36.0.144:3000/route';
		let request = new Request(url,{
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
		  },
		  // per API documentation: https://docs.google.com/document/d/1MNGOfIhePx12GOXEsAanPD59TBxbys2WZfliT9gk-Aw/edit
		  body: JSON.stringify({
			  method: 'bluetooth',
			  sensors: [{
				  minor: this.props.nearestBeaconMinorID
			  }],
			  destination: String(this.props.destination),
			  stairs: String(this.props.stairs)
		  })
		});
		fetch(request)
		.then(res => {
			console.log('nav: fetch response');
			console.log(JSON.stringify(res));
			return res.json();
		})
		.then(resj => {
			this.setState({
				route: resj
			},()=>{
				console.log('nav: set route: '+JSON.stringify(this.state.route));
			});
		})
		.catch(err => console.log('error:  '+err));
	}

	/* x: the x coordinate of a cell returned by /route call
	 * scaleFactor: the amount by which the floorplan image was resized to fit phone screen
	 */
	xcoord = (x,width,scaleFactor) => {
		// add 0.5 to x to get the center of the cell (cell indices start at 0)
		// multiply by 1/57 because the grid is 57 cells wide
		// both floorplan grids are 57x51, so it is safe to use this for both floors
		return String(Math.round(scaleFactor*(x+0.5)*(1/57)*width));
	}
	ycoord = (y,height,scaleFactor) => {
		// add 0.5 to y to get the center of the cell (cell indices start at 0)
		// multiply by 1/51 because the grid is 51 cells wide
		// both floorplan grids are 57x51, so it is safe to use this for both floors
		return String(Math.round(scaleFactor*(y+0.5)*(1/51)*height));
	}

	render() {
		let floorplan = {};
		if(this.state.floor===1) {
			floorplan.height = FLOOR_1_HEIGHT,
			floorplan.width = FLOOR_1_WIDTH
		}
		else if(this.state.floor===2) {
			floorplan.height = FLOOR_2_HEIGHT,
			floorplan.width = FLOOR_2_WIDTH
		}
		let IMG_HEIGHT = Dimensions.get('window').width*(floorplan.height/floorplan.width);
		let IMG_WIDTH = Dimensions.get('window').width;
		let scale = IMG_HEIGHT / (floorplan.height*1.0);

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

		// start and end point conditionally loaded if the floor matches
		let startOuterBubble=null, startInnerBubble=null;
		let endOuterBubble=null, endInnerBubble=null;

		// dark blue outer circle marking starting location
		if(this.state.route.length>0 && this.state.route[0].floorID===this.state.floor)  {
			startOuterBubble = <Circle
				cx={this.xcoord(this.state.route[0].x,floorplan.width,scale)}
				cy={this.ycoord(this.state.route[0].y,floorplan.height,scale)}
				r="3"
				fill="blue"
			/>;
		}
		// light blue inner circle marking starting location
		if(this.state.route.length>0 && this.state.route[0].floorID===this.state.floor) {
			startInnerBubble = <Circle
				cx={this.xcoord(this.state.route[0].x,floorplan.width,scale)}
				cy={this.ycoord(this.state.route[0].y,floorplan.height,scale)}
				r="2"
				fill="lightblue"
			/>;
		}
		// red circle with black circle inside that marks end of route
		if(	this.state.route.length>0 &&
			this.state.route[this.state.route.length-1].floorID===this.state.floor) {
			endOuterBubble = <Circle
				cx={this.xcoord(this.state.route[this.state.route.length-1].x,floorplan.width,scale)}
				cy={this.ycoord(this.state.route[this.state.route.length-1].y,floorplan.height,scale)}
				r="5"
				fill="red"
			/>;
		}
		// black circle inside of red circle marking end of route
		if(	this.state.route.length>0 &&
			this.state.route[this.state.route.length-1].floorID===this.state.floor) {
			endInnerBubble = <Circle
				cx={this.xcoord(this.state.route[this.state.route.length-1].x,floorplan.width,scale)}
				cy={this.ycoord(this.state.route[this.state.route.length-1].y,floorplan.height,scale)}
				r="2"
				fill="#000000"
			/>;
		}
		// only load for floor1 for demo, don't forget to adjust this after the demo!
		// for routes that go to second floor, check if the current floor matches the
		// coordinates' floor -- only load if it matches (otherwise first and second
		// floor portions of route will show on top of each other)
		let loadRoute = this.state.route.map((pair,i)=>{
			if(	i<this.state.route.length-1 &&
				this.state.floor===pair.floorID &&
				pair.floorID===this.state.route[i+1].floorID // don't connect between floors
			) return (
				<Line
					x1={this.xcoord(pair.x,floorplan.width,scale)}
					y1={this.ycoord(pair.y,floorplan.height,scale)}
					x2={this.xcoord(this.state.route[i+1].x,floorplan.width,scale)}
					y2={this.ycoord(this.state.route[i+1].y,floorplan.height,scale)}
					strokeWidth="1.5"
					stroke={this.props.stairs?'blue':'blue'}
				/>
			)
		});
		let svgOutline = <Rect
			x="0"
			y="0"
			width={Dimensions.get('window').width}
			height={Dimensions.get('window').width*(FLOOR_1_HEIGHT/FLOOR_1_WIDTH)}
			stroke="red"
			strokeWidth="2"
			fill="none"
		/>;
		return (
			<View style={{flex:1}} >
				<View style={{
					flex:0.1,
					alignItems:'center'
				}}>
					<Text style={{
						fontSize: 18,
						fontWeight: 'bold'
					}}>{'Navigating to '+this.props.destination+'...'}</Text>
				</View>
				<PinchZoomView style={{
					flex:0.7
				}}>
					<Image
						source={floorplans['floor'+String(this.state.floor)]}
						style={overlap}
						width={Dimensions.get('window').width}
						height={Dimensions.get('window').width*(FLOOR_1_HEIGHT/FLOOR_1_WIDTH)}
					/>
					<Svg
						width={Dimensions.get('window').width}
	                	height={Dimensions.get('window').height*0.8}
						style={overlap}
	            	>
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
						onPress={()=>this.setState({floor:1})}>
						<Text style={{
							color:'#ffffff',
							fontSize: 19
						}}>{'Floor 1'}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={halfWidthButton}
						onPress={()=>this.setState({floor:2})}>
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
}
const floorplans = {
	'floor1': require('../img/floor1.png'),
	'floor2': require('../img/floor2.png')
}
