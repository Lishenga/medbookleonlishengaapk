import React, {Component} from 'react';
import {
  View, Text
} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { NavigationActions } from 'react-navigation';

export default class ViewPost extends Component<Props> {
  constructor(props) {
    super(props);
}


  render() {
    const item = this.props.navigation.getParam('item', 'ViewPost')
      return (
          <View >
            <Card>
				<CardImage source={{ uri: 'http://bit.ly/2GfzooV' }} title={item.title} />
				<CardTitle subtitle={item.id} />
				<CardContent text={item.body} />
				<CardAction separator={true} inColumn={false}>
					<CardButton onPress={() => {}} title="Delete" color="#FEB557" />
					<CardButton onPress={() => {}} title="Explore" color="#FEB557" />
				</CardAction>
			</Card>
          </View>
      );
  }
}