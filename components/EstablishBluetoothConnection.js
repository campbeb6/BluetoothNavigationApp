import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const beacon1_id = '8D367CB8-2A4F-B555-556F-05F8F17043F8';
const beacon2_id = '62A0007D-4252-BA82-EE95-A98A12A47A5D';

/*
 * This class connects to two bluetooth beacons, obtains their
 * initial RSSI values, and displays them
 */
export default class EstablishBluetoothConnection extends Component {

  constructor() {
    super();
    this.manager = new BleManager();
    this.state = {
      beacon1_rssi: 0,
      beacon2_rssi: 0
    }
  }

  /*
   * Scan and Connect with the beacons
   * Record their RSSI values at an interval
   */
  scan() {
    var beacon_count = 0;
    this.manager.startDeviceScan(null, null, (error, device) => {
      var name = device.name
      if (name) {
        if (name.startsWith("estimote")) {
          beacon_count++;
          const transactionId = 'Monitor rssi';
          device.connect();
          this.rssiTimer = setInterval (() =>
            this.updateAndReadRSSI(device, transactionId), 2000
          );
          if (beacon_count >= 2) {
            this.manager.stopDeviceScan();
          }
        }
      }
    });
  }

  /*
   * Reads the RSSI value of the given device
   * @param device: the device being measured
   * @param transActionID: transactionID of transaction
   */
  updateAndReadRSSI(device, transactionId) {
    device.readRSSI(transactionId)
    .then((device) => {
      if (device.id === beacon1_id) {
        this.setState({
          beacon1_rssi: device.rssi
        });
      } else {
        this.setState({
          beacon2_rssi: device.rssi
        });
      }
    }, () => {
      // Do nothing
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.rssi_value}>
          Beacon1 RSSI: {this.state.beacon1_rssi}
        </Text>
        <Text style={styles.rssi_value}>
          Beacon2 RSSI: {this.state.beacon2_rssi}
        </Text>
      </View>
    );
  }

  componentDidMount() {
   if (Platform.OS === 'ios') {
     this.manager.onStateChange((state) => {
       if (state === 'PoweredOn') {
         this.scan();
       }
     });
     this.manager.state().then((state) => {
       if (state === 'PoweredOn') {
         this.scan();
       }
     });
   } else {
     this.scan()
   }
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
