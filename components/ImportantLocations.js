import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, Alert } from 'react-native';
// import { Constants } from 'expo';
import { Button } from 'react-native';

export default class ImportantLocations extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: [],
			choice: ''
		}
	}
	componentDidMount() {
		this.getRooms();
	}
	getRooms = () => {
		let url = 'http://10.36.0.144:3000/rooms';
		let request = new Request(url,{
			method: 'GET',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			}
		});
		fetch(request)
		.then(res => {
			return res.json();
		})
		.then(resj => {
			let arr = resj.filter(room => room.isPopular===1);
			arr.sort((a,b)=>{
				return a.roomName>b.roomName ? 1:a.roomName<b.roomName ? -1:0
			});
			this.setState({
				rooms: arr
			},function(){
				console.log('ImportantLocations: loaded rooms');
			});
			return resj;
		})
		.catch(err => console.log('error:  '+err));
	}

	render() {
		let roomList = this.state.rooms.map(room=>{
			return (
				<Picker.Item label={room.roomName} value={room.roomNumber} />
			);
		});
		return (
			<View style={styles.container}>
				
				<View style={{flex: 1, alignItems: 'flex-end'}}>
					<Picker
						style={{width: '100%'}}
						selectedValue = {this.state.choice}
						onValueChange={(choice) => {
							this.setState({
								choice: choice
							},()=>{
								this.props.getChoice(choice)
							});
						}}>
							<Picker.Item label="" value="" />
							{roomList}
					</Picker>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: .3,
		alignItems: 'center',
		flexDirection: 'row',
		// paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ffffff'
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#34495e'
	}
});
