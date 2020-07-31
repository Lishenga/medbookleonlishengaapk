import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { NavigationActions } from 'react-navigation';

export default class ViewPost extends Component<Props> {
	constructor(props) {
		super(props);
  }
  
  delete(item) {
		fetch('https://jsonplaceholder.typicode.com/posts/' + item.id, {
			method: 'DELETE'
		}).then((json)=>{
      console.log(json)
    })
	}

	render() {
		const item = this.props.navigation.getParam('item', 'ViewPost');
		return (
			<View>
				<ScrollView>
					<Card>
						<CardImage source={{ uri: 'http://bit.ly/2GfzooV' }} title={item.title} />
						<CardTitle subtitle={item.id} />
						<CardContent text={item.body} />
						<CardAction separator={true} inColumn={false}>
							<CardButton
								onPress={() => {
									this.delete(item);
								}}
								title="Delete"
								color="#FEB557"
							/>
							<CardButton
								onPress={() => {
									this.props.navigation.navigate('UpdatePost', { item: item });
								}}
								title="Update"
								color="#FEB557"
							/>
						</CardAction>
					</Card>
				</ScrollView>
			</View>
		);
	}
}
