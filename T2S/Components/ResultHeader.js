//import liraries
import React, { Component } from 'react';
import { View, TouchableHighlight, Text, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { styleResultHeader } from './style';

class ResultHeader extends Component {
  static propTypes = {
    data: PropTypes.any.isRequired,
    mark: PropTypes.string.isRequired,
  }

  render() {
    return (
        <TouchableHighlight onPress={() => { Alert.alert("Texte original", this.props.data[0].originalText) }}>
        <View style={styleResultHeader.container}>
            <View style={styleResultHeader.subContainer}>
                <Text style={{ ...styleResultHeader.text, maxHeight: 50 }}>{this.props.data[0].originalText}</Text>
                <View style={ styleResultHeader.markContainer }>
                    <Text style={styleResultHeader.text}>{this.props.mark}</Text>
                </View>
            </View>
        </View>
    </TouchableHighlight>
    );
  }
}

export default ResultHeader;
