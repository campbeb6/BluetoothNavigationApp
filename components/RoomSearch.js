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
            choice: '', // the room for which the user wants directions

            // dummy version of getMatches(), always returns 3 rooms for testing
            dummyGetMatches: (room) => {
                // wait for them to type at least one character
                if(room==='') return [];

                /* actual method will probably return an array of objects like
                 * [{roomNum:2050,roomID:1}, {roomNum:2051,roomID:2}], depends
                 * on how the backend team chooses to implement */
                return [''+room+'0',''+room+'1',''+room+'2'];
            }
        };
    }
    /* mandatory render() for displaying, return statement defines what will
     * show up when a <RoomSearch /> tag is used */
    render() {
        // return a Picker item for each room match from server
        let roomChoices = this.state.matches.map((match,i)=>{
            return (<Picker.Item key={i} label={match} value={match} />);
        });
        // return JSX that defines appearance
        // JavaScript expressions must be inside curly braces { }
        return (
            <View>
                <Text>Search room</Text>
                <TextInput
                  style={styles.input}
                  editable={true}
                  numberOfLines={1}
                  maxLength={100}
                  onChangeText={(text)=>{
                      // each time the user types, update the state variables
                      this.setState({
                          entry:text,
                          // reset choice to '' iff the user clears the box
                          choice:text===''?'':this.state.choice,
                          /* call state method to get room matches from server,
                           * for now the dummy method is called */
                          matches:this.state.dummyGetMatches(text)
                      },()=>{  });
                  }}
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
	getMatches = function(room) {
		let url = 'http://10.36.0.144:3000/rooms';
		let request = new Request(url,{
			method: 'GET',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			}
		});
		return fetch(request)
		.then(res => {
			console.log(res);
			return res.json();
		})
		.then(resj => {
			this.setState({
				matches: resj
			},function(){
				console.log('set state.matches to:');
				console.log(resj);
			});
			return resj;
		})
		.catch(err => console.log('error:  '+err));
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
