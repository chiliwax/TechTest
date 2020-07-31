import { SafeAreaView, View, Text, TouchableHighlight, StyleSheet } from "react-native"
import React from 'react';
import { FlatList } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo-av';
import Loader from '../Components/Loader'

export default class Result extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }

    playsong = async (url) => {
        this.setState({loading:true})
        await Audio.Sound.createAsync(
            { uri: url },
            { shouldPlay: true }
        );
        this.setState({loading:false})
    }
    render() {
        const { navigation } = this.props;
        const data = navigation.getParam('data', 'Nothing to show');
        console.log(data)
        const array = [
            { lang: data.lang, voice: data.voice, origin: data.originalText, end: data.resultText, url: data.path },
            { lang: data.lang, voice: data.voice, origin: data.originalText, end: data.resultText, url: data.path }
        ]
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#36393f' }}>
                <Loader isVisible={this.state.loading} />
                <FlatList
                    data={array}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <View style={{ backgroundColor: 'white', margin: 10, padding: 10, borderRadius: 20 }}>
                            <View style={{
                                paddingHorizontal: 10, paddingTop: 5,
                            }}>

                                <Text style={{ color: 'grey' }}>Langue : {item.lang}</Text>
                                <Text style={{ color: 'grey' }}>Voice : {item.voice}</Text>
                            </View>
                            <View style={{ margin: 10, marginBottom: 5 }}>
                                <Text style={{ color: 'grey' }}>Texte Original :</Text>
                                <Text>{item.origin}</Text>
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ color: 'grey' }}>Texte Final :</Text>
                                <Text>{item.end}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingBottom: 5 }}>

                                <TouchableHighlight style={styles.button}
                                    onPress={async () => {
                                        await this.playsong(item.url)
                                    }}>
                                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 10, paddingVertical: 5 }}>
                                        <Icon name="ios-play-circle" size={30} color='white' />
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    }
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        //height: 30,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#18c063',

        borderRadius: 15,
    },
})