import { SafeAreaView, FlatList, Text, View } from "react-native"
import React from 'react';
import { styles, stylesCard } from '../Components/style'
import { TouchableOpacity } from "react-native-gesture-handler";
import NavigationService from '../navigators/NavigationService';
import { compareString } from '../service/compare'
const config = require('../config.json')

export default class History extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            array: [],
            refreshing: false
        }
    }

    componentDidMount() {
        this.getHistory()
    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.array}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.card}
                />
            </SafeAreaView>
        )
    }

    getHistory = async () => {
        try {
           // console.log("SUBMIT TO API...")
            let response = await fetch(config.tunnel + "/api/getHistory", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "GET"
            })
            var jsonresponse = await response.json();
            this.setState({ array: jsonresponse })
         //   console.log("finish")
        }
        catch (error) {
            console.log(error);
        }
    }

    card = ({ item }) => {
        var obj = JSON.parse(item.json)
        var txt = obj[0].originalText
        if (txt.length > 16) { txt = txt.substring(0, 16) + '...' }
        var mark = compareString(obj[0].originalText, obj[obj.length - 1].resultText)
        obj.forEach(element => {
            let url = { uri: config.tunnel + '/' + element.path }
            element.path = url.uri.toString()
        });
        return (

            <TouchableOpacity onPress={async () => { NavigationService.navigateH('Result', { data: obj, id:item.id, update:this.getHistory }) }}>
                <View style={{ ...stylesCard.container, borderRadius: 10, marginVertical: 5 }}>
                    <View style={{ ...stylesCard.informationsContainer, flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                        <Text style={stylesCard.finalText}>{txt}</Text>
                        <Text style={stylesCard.finalText}>{mark}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }
}