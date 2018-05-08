import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker, Item } from 'react-native';

export default class Enrollments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choice: ''
        }
    }

    render() {
        if(this.props.classes.length == 0){
            return null;
       }
		return(
            <View style={styles.container}>
               
                <View style={{flex:1,alignItems: 'flex-end'}}>
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
                       
                        <Item label="" value=""/>
                        {this.props.classes.map((value, index) => {
                            return(<Item label = {value} value = {value.replace( /^\D+/g, '')} key = {index}/>)
                        })}
                    </Picker>
                </View>
            </View>
		);
    }
}
const styles = StyleSheet.create({
	container: {
		flex: .1,
		alignItems: 'center',
		flexDirection: 'row',
		// paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ffffff'
	},
	
});