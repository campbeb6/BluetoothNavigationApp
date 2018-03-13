/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Accessibility from "./components/Accessibility";
import Header from "./components/Header"

export default class App extends React.Component {
  
  render() {
    return(
      <View style = {{flex : 1}}>
        <Header/>
        <Accessibility/>
      </View>
    );
  }
}



