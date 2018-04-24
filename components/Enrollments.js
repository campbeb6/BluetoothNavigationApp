import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker, Item } from 'react-native';

export default class TestEnrollments extends React.Component {
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
            <View>
                <View>
                    <Text style = {{color: '#000000'}}>OR choose a room for a course you are taking</Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
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