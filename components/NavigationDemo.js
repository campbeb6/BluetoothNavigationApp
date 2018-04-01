import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions } from 'react-native';

export default class NavigationDemo extends React.Component {
	render() {
		const viewHeight = Dimensions.get('window').height;
		const viewWidth = Dimensions.get('window').width;
		let imgSrc =
			this.props.startingLocation + '_' +
			this.props.destination + '_' +
			(this.props.stairs?'stairs':'elevator');
		console.log('imgSrc: '+imgSrc);
		console.log('dims: '+viewHeight+'x'+viewWidth);
		return (
			<View style={styles.containerView}>
				<View style={styles.btnView}>
					<Button
						title="Go back"
						color="#D3D3D3"
						onPress={this.props.goBack}
					/>
				</View>
				<View style={styles.imgView}>
					<Image
						resizeMode = "contain"
						source = {imgs[imgSrc]}
						style = {styles.img}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	containerView: {
		flex: 1
	},
	btnView: {
		flex: 0.07,
		backgroundColor: 'white'
	},
	imgView: {
		flex: 0.93,
		backgroundColor: 'white',
		alignItems: 'center'
	},
	img: {
		flex:1
	}
});

const imgs = {
	'1036_1000_stairs': require('../img/1036_1000_stairs.png')
};
//
// <Image
// 	resizeMode = "contain"
// 	source = {imgs[imgSrc]}
// 	style = {{
// 		width: viewWidth,
// 		height: viewHeight*.93
// 	}}
// />

// <View>
// 	<Button
// 		title="Go back"
// 		color="#D3D3D3"
// 		onPress={this.props.goBack}
// 	/>
// </View>
