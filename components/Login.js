import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Dimensions  } from 'react-native';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            termCode: '',
			token: '',
			courses: [],
            roomNums: [],
            username: '',
            password: ''
		};
    }
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image 
                        style={styles.logo}
                        source={require('../img/Miami.jpeg')} 
                    />
                    <Text style={styles.title}> Farmer School of Business Directions </Text>
                </View>

                <View style={styles.formContainer}>

                    <View style={styles2.container}>
                        <TextInput placeholder="Unique ID"
                        placeholderTextColor='#FFFFFF'
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput.focus() }
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles2.input} 
                        onChangeText = {(username) => this.state.username = username} />

                        <TextInput placeholder="Password"
                        placeholderTextColor='#FFFFFF'
                        returnKeyType="go"
                        secureTextEntry
                        style={styles2.input}
                        ref={(input) => this.passwordInput = input} 
                        onChangeText = {(pass) => this.state.password = pass} />
                    </View>
                    <View>
                        <TouchableOpacity style={styles2.buttonContainer} onPress={this.getTermId}>
                            <Text style={styles2.buttonText}> Login </Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles2.container}>
                        <TouchableOpacity onPress = {this.guestLogin}>
                            <Text style={styles2.guestButton}> Continue as Guest  </Text>
                        </TouchableOpacity>
                    </View>

                </View>    

            </KeyboardAvoidingView>
        );
    }
    getTermId = () => {
		var url = 'https://ws.miamioh.edu/authentication';
		var params = 'type=usernamePassword&application=FSBMobileAppDownload&username='+encodeURIComponent(this.state.username)+'&password='+encodeURIComponent(this.state.password);
		this.state.courses = [];
		//this.state.roomNums = [];
		fetch('http://ws.miamioh.edu/academicTerms/current?applicationname=FSBProject')
			.then(response => response.text())
			.then((response) => {
				var DOMParser = require('xmldom').DOMParser;
				var doc = new DOMParser().parseFromString(response, 'text/xml');
				this.state.termCode = doc.getElementsByTagName('termId')[0].childNodes[0].nodeValue;
				console.log('success', this.state.termCode);
			})
			.then(() => {
				fetch(url, {
					method: 'POST',
					headers: new Headers({
						'Content-type': 'application/x-www-form-urlencoded',
					}),
					body: params
				})
				.then(response => response.text())
				.then((response) => {
					var DOMParser = require('xmldom').DOMParser;
					var doc = new DOMParser().parseFromString(response, 'text/xml');
					this.state.token = doc.getElementsByTagName('token')[0].childNodes[0].nodeValue;
					console.log('success', this.state.token);
                })
                .catch(err => {
                    alert("invalid login credentials");
                    return;
                })
				.then(() => {
					var url2 = 'https://ws.miamioh.edu/enrollments?application=FSBMobileAppDownload&token='+encodeURIComponent(this.state.token);
					fetch(url2)
						.then(response => response.text())
						.then((response) => {
							var DOMParser = require('xmldom').DOMParser;
							var doc = new DOMParser().parseFromString(response, 'text/xml');
							var courseCodes = doc.getElementsByTagName('courseId');
							for(var i = 0; i < courseCodes.length; i++){
								this.state.courses.push(courseCodes[i].childNodes[0].nodeValue)
							}
							console.log('success', this.state.courses);//this.state.courses);
						})
						.then(() => {
							return new Promise((resolve, reject) => {
								var url3;
								var promises = [];
								var rooms = [];
								len = this.state.courses.length;
								for(var i = 0; i < len; i++){
									url3 = 'https://ws.miamioh.edu/courseSection/'+encodeURIComponent(this.state.termCode)+'/'+encodeURIComponent(this.state.courses[i]);
									promises.push(
									fetch(url3)
										.then(response => response.text())
										.then((response) => {
											var DOMParser = require('xmldom').DOMParser;
											var doc = new DOMParser().parseFromString(response, 'text/xml');
											var buildingName = doc.getElementsByTagName('building');
											var roomNum = doc.getElementsByTagName('room')
											rooms.push(buildingName[0].childNodes[0].nodeValue + ' ' + roomNum[0].childNodes[0].nodeValue);
										})
									)
								}
								Promise.all(promises).then(() => {
									this.state.roomNums = rooms;
                                    console.log('success', this.state.roomNums);
                                })
                                .then(() => {
                                    if(this.state.roomNums.length  > 0) {
                                        
                                        //NOTE: this for loop is only used to remove entries that do not contain FSB
                                        for(i = 0; i < this.state.roomNums.length; i++){
                                            if(!this.state.roomNums[i].startsWith("Farmer School of Business")){
                                                this.state.roomNums.splice(i,1);
                                                i--;
                                            }
                                        }
                                        this.props.showEnrollments({classes: this.state.roomNums});
                                    }
                                })
                            })
						}).done()
				}).done()
            }).done()
    }
    guestLogin = () => {
        this.props.showEnrollments({classes: []});
    }
}

const styles = StyleSheet.create ({
    container: { 
        flex: 1,
        backgroundColor: '#FFFFFF'
},

logo: {
    width: 100,
    height: 100
},

logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
},

title: {
    color: '#000000',
    marginTop: 10,
    textAlign: 'center'
}
});

const styles2 = StyleSheet.create ({
    container: { 
        padding: 20,
},

input: {
    height: 40,
    backgroundColor: '#C3142D',
    marginBottom: 15,
    color: '#FFFFFF',
    paddingHorizontal: 10
},

buttonContainer: {
    backgroundColor: '#C3142D',
    paddingVertical: 16,
    width: 150,
    marginLeft: Dimensions.get('window').width/2 - 75 //75 is half of the width (150) on line above
},

buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 20
},

guestButton: {
    textAlign: 'right',
    paddingVertical: 40,
    color: '#007B89',
    textDecorationLine: 'underline'
}
});