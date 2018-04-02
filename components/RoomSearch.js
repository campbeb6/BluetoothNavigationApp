import React from 'react';
import { StyleSheet, Text, View, TextInput,
    Picker, Button, Alert } from 'react-native';

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
        let roomChoices = this.state.matches.map((match,i)=>{
            return (<Picker.Item key={i} label={match.roomNum} value={match.roomNum} />);
        });
        // return JSX that defines appearance
        // JavaScript expressions must be inside curly braces { }
        return (
            <View style={{backgroundColor: '#ffffff'}}>
                <Text>Search room</Text>
                <TextInput
                  	style={styles.input}
                  	editable={true}
                  	numberOfLines={1}
                  	maxLength={100}
					onChangeText = {this.getMatches}
				/>

				{/* this picker is supposed to be dropdown options, doesn't
				  * look great on Android though, instead maybe we can use:
				  * https://www.npmjs.com/package/react-native-autocomplete-input */}
                <Picker
                    style={styles.matchList}
                    selectedValue={this.state.choice}
                    onValueChange={(val)=>{
                        this.setState({
							choice:val
						},()=>{
							// pass choice back to LocationPreferences.js
							if(this.state.choice!=='') {
								this.props.getChoice(this.state.choice);
							}
						});
                    }}
                    >
                    {/*start the list with a blank option*/}
                    <Picker.Item key={-1} label={''} value={''} />
                    {/* then, dynamically get room matches and fill Picker */
                        roomChoices
                }</Picker>
            </View>
        );
    }

	// get room numbers matching the user's input
	getMatches = (text) => {
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
    input:{ // style for room number search box
        // height: 40,
        // width: 200,
        // borderColor: 'gray',
        // borderWidth: 1,
    },
    matchList:{
        //width: 100 // will not display without width property
    },
});
