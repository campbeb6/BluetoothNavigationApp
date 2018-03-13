import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  
  render() {
    return(
      <View style = {styles.centeredHeader}>
        <Text>Bluetooth Navigation</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    centeredHeader: {
      flex : 1,
      backgroundColor: '#F5FCFF',
      alignItems: 'center',
      justifyContent: 'center',
    }
  })