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

            /* Defines a function called getMatches() but does not call it yet.
             * It will pass a room number to the api and return an array of
             * rooms that match the user's input. E.g. if '205' is passed it
             * will return all rooms in FSB that start with '205' (2050, 2052,
             * 2052A, etc.). Backend would have a SQL statement along the lines
             * of SELECT roomNumber FROM rooms WHERE roomNumber LIKE '100%'; */
            getMatches: (room) => {
                // this endpoint does not actually exist yet
                let url = 'http://10.36.0.144:3000/rooms';
                /* documentation for fetch(), very similar to $.ajax:
                 * https://facebook.github.io/react-native/docs/network.html */
                fetch(url,{
                    method:'POST',
                    headers:{
                        Accept:'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({room:room})
                });
                // if successful, either set state.matches or return array

            },
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
        // navigation button only shows up when a choice has been made
        let btnNavigate = null;
        if(this.state.choice!=='' && this.state.entry!==''){
            btnNavigate = <Button
              title={'Navigate to '+this.state.choice}
              onPress={()=> { // use => to avoid .bind(this)
                  ///STUB pass choice and load navigation screen
                  /* may want to pass room choice back up to App.js instead
                   * of getting navigation screens here */
                  let choice = this.state.choice;
                  Alert.alert(
                      'begin navigation',
                      'stub, pass along beacon data and room choice ('
                        + choice + ') to start navigating',
                      {cancelable:true}
                  );
              }} />;
        }
        // return JSX that defines appearance
        // JavaScript expressions must be inside curly braces { }
        return (
            <View style={styles.container}>
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
                      });
                  }}
                  />
                {/*DEBUG show the entry's value and choice*/}
                <Text>(For testing, show user input and choice)</Text>
                <Text>{'Entered:  '+this.state.entry}</Text>
                <Text>{'Choice:  '+this.state.choice}</Text>
                {/* btnNavigate will be null until user makes a choice, then it
                  * will become a button that begins navigation*/
                  btnNavigate}
                <Picker
                    style={styles.matchList}
                    selectedValue={this.state.choice}
                    onValueChange={(val)=>{
                        this.setState({choice:val});
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
}

// styles go outside of the class body, call with {styles.styleName}
const styles = StyleSheet.create({
    container: { // container copied from generated App.js
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input:{ // style for room number search box
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
    },
    matchList:{
        width: 100 // will not display without width property
    },
});
