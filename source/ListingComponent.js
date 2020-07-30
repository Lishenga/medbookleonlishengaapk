import React, { Component } from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { width } from 'react-native-dimension';
import { withNavigation } from 'react-navigation';
import styles from './styles/listStyle';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

class ListingComponent extends Component<Props> {
	render() {
		let item = this.props.item;
		console.log(item);

		return (
			<Card>
				<CardImage source={{ uri: 'http://bit.ly/2GfzooV' }} title={item.title} />
				<CardTitle subtitle={item.id} />
				<CardContent text={item.body} />
				<CardAction separator={true} inColumn={false}>
					<CardButton onPress={() => {}} title="Delete" color="#FEB557" />
					<CardButton onPress={() => {}} title="Explore" color="#FEB557" />
				</CardAction>
			</Card>
		);
	}
}
export default withNavigation(ListingComponent);
