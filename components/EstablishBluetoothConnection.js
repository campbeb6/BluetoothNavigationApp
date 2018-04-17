import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

// Beacons IDs
const beacon1_id = '8D367CB8-2A4F-B555-556F-05F8F17043F8';
const beacon2_id = '62A0007D-4252-BA82-EE95-A98A12A47A5D';

// Probably wrong
const beacon3_id = '405E8058-FF3A-440F-A75D-0E754787F47C';

// Number of beacons being used/considered
const NUMBER_OF_BEACONS = 3;

// The interval between getting RSSI values
const INTERVAL_LENGTH = 1000;

/*
 * This class reads the RSSI values of specified estimote
 * beacons and updates and displays them
 */
export default class App extends Component {

  constructor() {
    super();
    this.manager = new BleManager();
    this.state = {
      beacon1_rssi: 0,
      beacon2_rssi: 0,
      beacon3_rssi: 0,

      // Only used to hold beacon IDs
      // Will not be in final product
      name_and_ids: []
    }
  }

  /*
   * Scan for the beacons
   * Record their RSSI values
   */
  scan() {
    var beacon_count = 0;

    // n_ids is only used to figure out the beacon IDs
    // Should not be in final product
    var n_ids = [];

    this.manager.startDeviceScan(null, null, (error, device) => {
      var name = device.name

      if (name) {

        // This block of code is only used to find the
        // beacon IDs
        // It will not be in the final product
        var val = device.name + ' ' + device.id;
        n_ids.push(val);
        this.setState({
          name_and_ids: n_ids
        });


        if (name.startsWith("estimote")) {
          beacon_count++;
          this.updateAndReadRSSI(device);
          if (beacon_count >= NUMBER_OF_BEACONS) {
            this.manager.stopDeviceScan();
          }
        }
      }
    });
  } // End scan

  /*
   * Reads the RSSI value of the given device
   * @param device: the device being measured
   */
  updateAndReadRSSI(device) {

    if (device.id === beacon1_id) {
      this.setState({
        beacon1_rssi: device.rssi
      });
    } else if (device.id === beacon2_id) {
      this.setState({
        beacon2_rssi: device.rssi
      });
    } else if (device.id === beacon3_id) {
      this.setState({
        beacon3_rssi: device.rssi
      });
    }

  } // End updateAndReadRSSI

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.rssi_value}>
          Beacon1 RSSI: {this.state.beacon1_rssi}
        </Text>
        <Text style={styles.rssi_value}>
          Beacon2 RSSI: {this.state.beacon2_rssi}
        </Text>
        <Text style={styles.rssi_value}>
          Beacon3 ID: {this.state.beacon3_rssi}
        </Text>

        // Only used to display the beacon n_ids
        // Will not be in final product
        <FlatList
          data={this.state.name_and_ids}
          renderItem={({item}) => <Text>{item}</Text>}
        />

      </View>
    );
  } // End render

  componentDidMount() {
   if (Platform.OS === 'ios') { // Extra steps for iOS
     this.manager.onStateChange((state) => {
       if (state === 'PoweredOn') {
         this.rssiTimer = setInterval (() =>
          this.scan(), INTERVAL_LENGTH
        );
       }
     });
     this.manager.state().then((state) => {
       if (state === 'PoweredOn') {
          this.rssiTimer = setInterval (() =>
          this.scan(), INTERVAL_LENGTH
         );
       }
     });
   } else { // For all other platforms
     this.rssiTimer = setInterval (() =>
      this.scan(), INTERVAL_LENGTH
    );
   }
 } // End componentDidMount

 componentWillUnmount() {
   clearInterval(this.rssiTimer);
 }
} // End class

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    rssi_value: {
      fontSize: 20,
      textAlign: 'center',
      margin: 50,
    },
  });
