import { SafeAreaView, View, Text, TouchableHighlight, Button, Alert } from "react-native"
import React from 'react';
import { FlatList } from "react-native-gesture-handler";
import { Audio } from 'expo-av';
import Loader from '../Components/Loader'
import { styles, stylesCard, cardButtonIconColor } from '../Components/style'
import ResultHeader from '../Components/ResultHeader'
import Icon from 'react-native-vector-icons/Ionicons';
import { compareString } from '../service/compare'
import NavigationService from '../navigators/NavigationService';
const config = require('../config.json')


export default class Result extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            id: "NA"
        }
    }



    static navigationOptions = ({ navigation }, ) => {
        const id = navigation.getParam('id', 'NA')
        if (id != 'NA') {
            return {
                headerRight: () => {
                    return (
                        <Button
                            onPress={() => Alert.alert("Warning", "\nêtes vous sur de vouloir supprimer cet élément ?",
                                [{ text: "non" }, { text: "oui", onPress: async () => { 
                                    await deletefromhistory(id) 
                                    console.log(navigation.getParam('id','nn'))
                                    navigation.getParam('update','')()
                                } }])
                            }
                            title="Delete"
                            color="red"
                        />
                    )
                }
            }
        }
    }


    render() {
        const { navigation } = this.props;
        
        const data = navigation.getParam('data', 'Nothing to show');
        var array = []
        data.forEach(element => {
            array.push({ lang: element.lang, voice: element.voice, origin: element.originalText, end: element.resultText, url: element.path })
        });
        var mark = compareString(array[0].origin, array[array.length - 1].end)
        return (
            <SafeAreaView style={styles.container}>
                <Loader isVisible={this.state.loading} />
                <ResultHeader data={data} mark={mark} />
                <FlatList
                    data={array}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.card}
                />
            </SafeAreaView>
        )
    }

    playsong = async (url) => {
        this.setState({ loading: true })
        await Audio.Sound.createAsync(
            { uri: url },
            { shouldPlay: true }
        );
        this.setState({ loading: false })
    }

    

    card = ({ item }) => {
        return (
            <View style={stylesCard.container}>
                <View style={stylesCard.informationsContainer}>
                    <Text style={stylesCard.informationsText}>Langue : {item.lang}</Text>
                    <Text style={stylesCard.informationsText}>Voice : {item.voice}</Text>
                </View>
                <View style={{ margin: 10 }}>
                    <Text style={stylesCard.finalText}>{item.end}</Text>
                </View>
                <View style={stylesCard.buttonContainer}>
                    <TouchableHighlight style={stylesCard.button}
                        onPress={async () => { await this.playsong(item.url) }}>
                        <View style={stylesCard.icon}>
                            <Icon name="ios-play-circle" size={30} color={cardButtonIconColor} />
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

deletefromhistory = async (id) => {
    console.log("SUBMIT TO API...")
    NavigationService.navigateH('History', {})
    let body = JSON.stringify({ "id": id })
    let response = await fetch(config.tunnel + "/api/deleteFromHistory", {
        body: body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "POST"
    })
    await response.json();
    
    if (response.status == 200) {
        NavigationService.navigateH('History', {"toto":"forceupdate"})
    } else { Alert.alert("Unexpected Error", "\nstatus code : " + response.status) }
    console.log("status code : " + response.status)
}