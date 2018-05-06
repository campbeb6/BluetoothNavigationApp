import React from 'react';
import { StyleSheet, Text, View, TextInput,
	Picker, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';

/* Purpose of the RoomSearch class is to allow the user to search a room number
 * within FSB as free-form text. When they begin typing, matching rooms will
 * populate a scrollable list. The user then chooses the room from the list
 * and presses a button to begin navigation.
 */
export default class RoomSearch extends React.Component {
    // contructor, contains state variables
    constructor() {
        super();
        this.state = {
            matches: [], // array of rooms that match entry
            choice: '' // the room for which the user wants directions
        };
    }
    /* mandatory render() for displaying, return statement defines what will
     * show up when a <RoomSearch /> tag is used */
    render() {
        // return a Picker item for each room match from server
		let roomChoices = this.state.matches.map((match,i)=>{
            return (
				<View>
					<TouchableOpacity
						onPress={()=>{
							this.setState({
								choice: match.roomName,
								matches: [] // make list disappear
							},()=>{
								console.log('RoomSearch: set choice to '+match.roomName);
								this.props.getChoice(this.state.choice);
							});
						}}
						style={{
							flex:1,
							width:'100%'
						}}
					>
						<Text style={{
							fontSize: 20,
							marginBottom: 5,
							marginLeft: 4
						}}>{match.roomName}</Text>
					</TouchableOpacity>
				</View>
			);
        });
        return (
            <View style={{flex:1}}>
				<View>
					<TextInput
						style={{
							fontSize: 20
						}}
						value={this.state.choice}
						onChangeText={(text)=>{
							this.setState({
								choice: text
							},() => {
								console.log('RoomSearch: set choice to '+this.state.choice);
								this.getMatches(this.state.choice);
								this.props.getChoice(this.state.choice);
							});
						}}
					/>
				</View>
				<ScrollView>
					{roomChoices}
				</ScrollView>
            </View>
        );
    }

	// get room numbers matching the user's input
	getMatches = (text) => {
		// add in some dummy data for new routes
		// let dummyRooms = [
		// 	{roomNum:'2037',popular:'false'},
		// 	{roomNum:'2043',popular:'false'},
		// 	{roomNum:'2053',popular:'true'},
		// 	{roomNum:'1026',popular:'true'},
		// 	{roomNum:'1026B',popular:'true'}
		// ];
		this.setState({
			entry: text
		},()=>{
			console.log('RoomSearch: getting matches for '+this.state.entry);
			let url = 'http://10.36.0.144:3000/rooms/'+this.state.entry;
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
				this.setState({
					matches: resj
				},function(){
					console.log('RoomSearch: set state.matches to:');
					console.log(this.state.matches);
				});
				return resj;
			})
			.catch(err => console.log('error:  '+err));
		});
	}
}

// styles go outside of the class body, call with {styles.styleName}
const styles = StyleSheet.create({

});
