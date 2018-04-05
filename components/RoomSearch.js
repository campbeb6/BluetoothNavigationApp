import React from 'react';
import { StyleSheet, Text, View, TextInput,
	Picker, Button, Alert, TouchableOpacity } from 'react-native';
import AutoSuggest from 'react-native-autosuggest';

/* Purpose of the RoomSearch class is to allow the user to search a room number
 * within FSB as free-form text. When they begin typing, matching rooms will
 * populate a scrollable list. The user then chooses the room from the list
 * and presses a button to begin navigation.
 */
export default class RoomSearch extends React.Component {
    // contructor, contains state variables
    constructor() {
        super();
		console.log('RoomSearch constructor');
        this.state = {
            entry: '', // text that user enters into box
            matches: [], // array of rooms that match entry
            choice: '' // the room for which the user wants directions
        };
    }
    /* mandatory render() for displaying, return statement defines what will
     * show up when a <RoomSearch /> tag is used */
    render() {
        // return a Picker item for each room match from server
        let roomChoices = [];
		for(let i=0;i<this.state.matches.length;i++) {
			roomChoices.push(String(this.state.matches.roomNum));
		}
        return (
            <View style={{
				// backgroundColor: '#ffffff',
				// alignItems: 'center',
				// flexDirection: 'row',
				// flex: 1,
				// //justifyContent: 'center',
				// width: '100%'
			}}>
				<View>
					<AutoSuggest
						onChangeText={(text)=>this.setState({entry:text},this.getMatches(text))}
						terms={roomChoices}
						placeholder={'Search here'}
					/>
				</View>
            </View>
        );
    }

	// get room numbers matching the user's input
	getMatches = (text) => {
		// USE DUMMY DATA FOR NOW
		if(1===1) {
			this.setState({
				matches: [
					{roomNum: text+'1'},
					{roomNum: text+'2'},
					{roomNum: text+'3'}
				]
			},()=>{
				console.log('set dummy matches to '+JSON.stringify(this.state.matches))
			});
			return;
		}

		// add in some dummy data for new routes
		let dummyRooms = [
			{roomNum:'2037',popular:'false'},
			{roomNum:'2053',popular:'true'},
			{roomNum:'1026',popular:'true'}
		];
		console.log('entered: '+text);
		this.setState({
			entry: text
		},()=>{
			console.log('getting matches for '+this.state.entry);
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
				console.log(res);
				return res.json();
			})
			.then(resj => {
				this.setState({
					matches: resj.concat(dummyRooms).filter(match => match.roomNum.startsWith(this.state.entry))
				},function(){
					console.log('set state.matches to:');
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
