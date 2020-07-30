/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { Text, View, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';

import { NavigationActions } from 'react-navigation';
import { width, height, totalSize } from 'react-native-dimension';
import { COLOR_PRIMARY, COLOR_SECONDARY } from './styles/common';
import styles from './styles/listStyle';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class App extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			reCaller: false,
			loading: false,
			loadmore: false,
			sorting: false,
			sortCheck: false,
			search: '',
			data: [],
			next_page_url: '',
			param: {},
			per_page: '',
			to: 0,
			arr: [ { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 } ]
		};
	}
	static navigationOptions = { header: null };
	navigateToScreen = (route, title) => {
		const navigateAction = NavigationActions.navigate({
			routeName: route
		});
		this.props.navigation.setParams({ otherParam: title });
		this.props.navigation.dispatch(navigateAction);
	};

	componentDidMount = async () => {
		await this.getSearchList();
	};

	getSearchList = async () => {
		const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer '
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer' // no-referrer, *client
		});

		const result = await response.json();
		this.setState({
			data: result
		});
	};

	delete(item) {
		fetch('https://jsonplaceholder.typicode.com/posts/' + item.id, {
			method: 'DELETE'
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => {
						this.navigateToScreen('NewPost', { item: null });
					}}
				>
					<Text>New Post</Text>
				</TouchableOpacity>
				<View style={{ flex: 1, alignItems: 'center' }}>
					<ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={400}>
						{this.state.data.map((item, key) => {
							return (
								<View>
									<TouchableOpacity
									onPress={() => {
										this.navigateToScreen('ViewPost', { item: item });
									}}
								>
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
													this.navigateToScreen('UpdatePost', { item: item });
												}}
												title="Update"
												color="#FEB557"
											/>
										</CardAction>
									</Card>
								</TouchableOpacity>
								</View>
							);
						})}
					</ScrollView>
				</View>
			</View>
		);
	}
}
