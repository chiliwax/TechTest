//import liraries
import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Modal from "react-native-modal";
import PropTypes from 'prop-types';
import { stylesLoader } from '../Components/style';

class Loader extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <Modal
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={this.props.isVisible}>
        <View style={stylesLoader.container}>
          <View style={stylesLoader.containerform}>
            <ActivityIndicator size='large' />
          </View>
        </View>
      </Modal>
    );
  }
}

export default Loader;
