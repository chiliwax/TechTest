//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Modal from "react-native-modal";
import PropTypes from 'prop-types';

// create a component
class Loader extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <Modal
        animationIn="bounceIn"
        animationOut="bounceOut"
        style={{}}
        isVisible={this.props.isVisible}
        onRequestClose={() => { }}
      >
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',

        }}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:'white',
            borderRadius: 25,
            width: 100,
            height: 100
          }}>
            <ActivityIndicator size='large' />
          </View>
        </View>
      </Modal>
    );
  }
}

//make this component available to the app
export default Loader;

const styles = StyleSheet.create({
  button_modal: {

  },
})