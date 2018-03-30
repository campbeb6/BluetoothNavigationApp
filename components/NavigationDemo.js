import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions } from 'react-native';

export default class NavigationDemo extends React.Component {
	render() {
		const viewHeight = Dimensions.get('window').height;
		const viewWidth = Dimensions.get('window').width;
		console.log('dims: '+viewHeight+'x'+viewWidth);
		return (
			<View>
				<View>
					<Button
						title="Go back"
						color="#D3D3D3"
						onPress={this.props.goBack}
					/>
				</View>
				<View>
					<Image
						style = {[
							styles.img,{
								height:viewHeight/2.5,
								width: viewWidth
							}
						]}
						source = {imgs['2053'+'_'+'1000'+'_'+'elevator'+'_'+'floor1']}
					/>
					<Image
						style = {[
							styles.img,{
								height:viewHeight/2.5,
								width: viewWidth
							}
						]}
						source = {imgs['2053'+'_'+'1000'+'_'+'elevator'+'_'+'floor1']}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	img: {
		justifyContent:'center',
		alignItems:'center'
	}
});

const imgs = {
	'2053_1000_elevator_floor1': require('../img/2053_1000_elevator_floor1.png'),
	'2053_1000_elevator_floor2': require('../img/2053_1000_elevator_floor2.png')
};
