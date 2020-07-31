import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Dimensions, TouchableWithoutFeedback, Keyboard, Alert, KeyboardAvoidingView, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Audio } from 'expo-av';
import Loader from '../Components/Loader'
import NavigationService from '../navigators/NavigationService';

const { width, height } = Dimensions.get('window')

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isReady: false,
            nbTour: "",
            t2s: "",
            uploading: false,
            path: "",
            response: ""
        }
    }

    T2S = async () => {
        try {
            console.log("SUBMIT TO API :")
            this.setState({ uploading: true });
            let body = JSON.stringify({ "text": this.state.t2s })
            console.log(body)
            let response = await fetch("https://d339e093ee3a.ngrok.io/api/test", {
                body: body,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "POST"
            })

            var jsonresponse = await response.json();
            console.log(jsonresponse);

            let url = {
                uri: 'https://d339e093ee3a.ngrok.io/' + jsonresponse.path
            };
            //url = url.uri
            console.log(url.uri)
            jsonresponse.path = url.uri.toString()
            url = url.uri.toString()
            // await Audio.Sound.createAsync(
            //     { uri: url },
            //     { shouldPlay: true }
            // );

            this.setState({
                uploading: false,
                response: jsonresponse,
            });
            console.log("finish")
        } catch (error) {
            console.log(error);
            this.setState({
                uploading: false,
            });
        }
    };

    render() {
        return (
            <View style={styles.container} >
                <Loader isVisible={this.state.uploading} />
                <StatusBar style="light" />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <KeyboardAwareScrollView
                        resetScrollToCoords={{ x: 0, y: 0 }}
                        scrollEnabled={false}
                        automaticallyAdjustContentInsets={false}
                    >
                        <View style={{ flex: 1, marginTop: 50, alignItems: 'center' }}>
                        <Image
                            source={require('../assets/logo_react.png')}
                            style={{width:150, height:150, margin:20}}
                        />
                            <TextInput
                                returnKeyType='done'
                                placeholder="NbTours"
                                style={{ ...styles.textInput, width: '30%', textAlign: 'center', color: 'white' }}
                                placeholderTextColor="grey"
                                backgroundColor="#36393f"
                                keyboardType="numeric"
                                borderColor="#292b2f"
                                onChangeText={(text) => this.setState({ nbTour: text.replace(/[^0-9]/g, '') })}
                                value={this.state.nbTour}
                            />
                            <TextInput
                                returnKeyType='default'
                                multiline={true}
                                placeholder="Text"
                                style={{ ...styles.textInput, width: '80%', color: 'white', paddingTop: 13, paddingBottom: 13, height: 'auto', minHeight: 50, maxHeight: height-height/3, }}
                                placeholderTextColor="grey"
                                backgroundColor="#36393f"
                                borderColor="#292b2f"
                                onChangeText={(text) => this.setState({ t2s: text })}
                                value={this.state.t2s}
                            />
                        </View>

                    </KeyboardAwareScrollView>
                </TouchableWithoutFeedback >
                <KeyboardAvoidingView behavior="padding">
                <View style={{ ...styles.bottom }}>
                    <TouchableHighlight style={styles.button} 
                    onPress={async () => { 
                        if (this.state.t2s != "") 
                        { 
                            await this.T2S() 
                            
                            NavigationService.navigateH('Result', { data:this.state.response })
                        } 
                        else 
                        { Alert.alert("ERROR", "pas de texte à traduire !") } }}>
                    
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', fontSize: 16 }}>Continue</Text>
                    </TouchableHighlight>
                </View>
                </KeyboardAvoidingView>
                <Text style={{textAlign:'center', marginBottom:20, color:'white'}}>Thibault Lecointe 2020</Text>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2f3136',
    },
    textInput: {
        height: 50,
        borderRadius: 15,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        paddingRight: 10,
        marginVertical: 5,
        borderColor: '#DADADA',
        borderWidth: 2,
    },
    button: {
        height: 50,
        width: width - 50,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#18c063',
        marginHorizontal: 20,
        borderRadius: 15,
    },
    bottom: {
        flex: 1,
        alignItems: 'center',
        flexDirection: "column-reverse",
        marginBottom: 20,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});