import React from 'react'
import {Alert, TouchableOpacity} from 'react-native'
import NavigationService from '../navigators/NavigationService';
import Icon from 'react-native-vector-icons/Ionicons';

function historyLogo() {
    return (
        <TouchableOpacity onPress={() => NavigationService.navigateH('History', {})}>
            <Icon size={25} style={{ marginRight: 15, justifyContent: 'center', color: '#157efb' }} name="ios-timer" />
        </TouchableOpacity>
    )
}

function infoLogo() {
    return (
        <TouchableOpacity onPress={() => Alert.alert("Information", "\nThibault Lecointe 2020\nTest technique")}>
            <Icon size={25} style={{ marginLeft: 15, justifyContent: 'center', color: '#157efb' }} name="ios-information-circle-outline" />
        </TouchableOpacity>
    )
}

export default {
    historyLogo,
    infoLogo
}