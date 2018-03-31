import { AppRegistry } from 'react-native';
import { YellowBox } from 'react-native';
import App from './App';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Class RCTCxxModule was not exported. Did you forget to use RCT_EXPORT_MODULE()?',
  'Sending ',
  'Module RCTImageLoader requires main queue',
  'Module BleModule requires main queue',
]);

AppRegistry.registerComponent('myApp', () => App);
