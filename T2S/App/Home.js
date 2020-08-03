import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TextInput, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Alert, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loader from '../Components/Loader'
import NavigationService from '../navigators/NavigationService';
import { styles } from '../Components/style'
const config = require('../config.json')

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nbTour: "",
            t2s: "",
            uploading: false,
            response: ""
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <Loader isVisible={this.state.uploading} />
                <StatusBar style="light" />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <KeyboardAwareScrollView
                        resetScrollToCoords={{ x: 0, y: 0 }}
                        scrollEnabled={false}
                        automaticallyAdjustContentInsets={false}>
                        <View style={styles.inputContainer}>

                            <TextInput
                                returnKeyType='next'
                                placeholder="NbTours"
                                style={{ ...styles.textInput, ...styles.textInputNumber }}
                                placeholderTextColor="#71777e"
                                keyboardType="numeric"
                                onChangeText={(text) => this.setState({ nbTour: text.replace(/[^0-9]/g, '') })}
                                value={this.state.nbTour}

                            />
                            <TextInput
                                returnKeyType='default'
                                multiline={true}
                                placeholder="Text"
                                style={{ ...styles.textInput, ...styles.textInputText }}
                                placeholderTextColor="#71777e"
                                onChangeText={(text) => this.setState({ t2s: text })}
                                value={this.state.t2s}
                            />
                        </View>
                    </KeyboardAwareScrollView>
                </TouchableWithoutFeedback >
                <KeyboardAvoidingView behavior="padding" style={{ maxHeight: 90 }}>
                    <TouchableHighlight style={{ ...styles.button }}
                        onPress={async () => {
                            if (this.state.t2s != "" && this.state.nbTour != "") {
                                await this.T2S()
                                NavigationService.navigateH('Result', { data: this.state.response })
                            }
                            else { Alert.alert("ERROR", "Veuillez remplir les deux champs d'entrée !") }
                        }}>

                        <Text style={{ ...styles.buttonText }}>Continue</Text>
                    </TouchableHighlight>
                </KeyboardAvoidingView>
            </View>
        )
    }

    T2S = async () => {
        try {
            console.log("SUBMIT TO API...")
            this.setState({ uploading: true });
            let body = JSON.stringify({ "text": this.state.t2s, "nbTour": this.state.nbTour })
            let response = await fetch(config.tunnel + "/api/text2speak", {
                body: body,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "POST"
            })
            var jsonresponse = await response.json();
            if (response.status == 200) {
                jsonresponse.forEach(element => {
                    let url = { uri: config.tunnel + '/' + element.path }
                    element.path = url.uri.toString()
                })
                this.setState({ response: jsonresponse, })
            } else { Alert.alert("Network Error", "status code : " + response.status) }
            console.log("status code : " + response.status)
        } catch (error) {
            console.log(error);
        }
        this.setState({ uploading: false })
    }
}