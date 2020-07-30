import React, { Component } from 'react';
import { Platform } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ViewPost from './source/ViewPost';
import UpdatePost from './source/UpdatePost';
import NewPost from './source/NewPost';
import App from './source/App';

const RootStack = createStackNavigator(
  {
    ViewPost: ViewPost,
    UpdatePost: UpdatePost,
    App: App,
    NewPost: NewPost
  },
  {
    initialRouteName: 'App',
    navigationOptions: {
      headerTitleStyle: { fontSize: totalSize(2), fontWeight: 'normal' },
      gesturesEnabled: true,
    }
  }
);
export default createAppContainer(RootStack);