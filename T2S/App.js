import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const { width, height } = Dimensions.get('window')

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            isReady: false,
            nbTour: "",
            t2s: "",
            uploading: false,
        }
    }

    T2S = async () => {
        try {
            console.log("SUBMIT TO API :")
            this.setState({ uploading: true });
            let body = JSON.stringify({ "text": "hello world" })
            console.log(body)
            let response = await fetch("https://7514dc2c1576.ngrok.io/api/test", {
                body: body,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //  Authorization: "Basic " + base64.encode("apikey:"+"FIHCnCa2Joh3wqI__TTdx6tA72o8TI9YZjbFs_a9z9pi"),
                },
                method: "POST"
            }) 
            
           let jsonresponse = await response.json();
           console.log(jsonresponse);
            //  let Blobresponse = await response.blob();
            //  var ObjectUrl = URL.createObjectURL(Blobresponse)
            //myAudio = document.querySelector('audio')
            //myAudio.src = ObjectUrl

            //console.log(ObjectUrl)
            this.setState({
                uploading: false
            });
            console.log("finish")
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <View style={styles.container} >
                <StatusBar style="auto" />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <KeyboardAwareScrollView
                        resetScrollToCoords={{ x: 0, y: 0 }}
                        scrollEnabled={false}
                        automaticallyAdjustContentInsets={false}
                    >
                        <View style={{ flex: 1, marginTop: 50, alignItems: 'center' }}>
                            <TextInput
                                returnKeyType='done'
                                placeholder="NbTours"
                                style={{ ...styles.textInput, width: '30%', textAlign: 'center', color: 'white' }}
                                placeholderTextColor="grey"
                                backgroundColor="#36393f"
                                keyboardType="number-pad"
                                borderColor="#292b2f"
                                onChangeText={(text) => this.setState({ t2s: text })}
                                value={this.state.t2s}
                            />
                            <TextInput
                                returnKeyType='default'
                                multiline={true}
                                placeholder="Text"
                                style={{ ...styles.textInput, width: '80%', color: 'white', paddingTop: 13, paddingBottom: 13, height: 'auto', minHeight: 50 }}
                                placeholderTextColor="grey"
                                backgroundColor="#36393f"
                                borderColor="#292b2f"
                                onChangeText={(text) => this.setState({ nbTour: text })}
                                value={this.state.nbTour}
                            />
                        </View>
                    </KeyboardAwareScrollView>
                </TouchableWithoutFeedback >
                <View style={styles.bottom}>
                    <TouchableHighlight style={styles.button} onPress={() => { this.T2S() }}>
                        {/* NavigationService.navigateH('AddItem2', { data: data, type: type, photo: photo, title: this.state.title })} > */}
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', fontSize: 16 }}>Continue</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2f3136',
        //alignItems: 'center',
        // justifyContent: 'center',
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
        marginBottom: 36,
    },
});