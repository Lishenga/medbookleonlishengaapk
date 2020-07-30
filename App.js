/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  View,
} from 'react-native';
import Route from './Route';

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
}


  render() {
      return (
          <View >
            <Route />
          </View>
      );
  }
}
