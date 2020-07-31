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

	delete(data) {
		fetch('https://jsonplaceholder.typicode.com/posts/' + data.id, {
			method: 'DELETE'
		}).then((json) => {
			console.log(json);
		});
		const index = this.state.data.findIndex((item) => data.id === item.id);
		this.state.data.splice(index, 1);
		this.setState({
			data:this.state.data
		})
	}

	render() {
		return (
			<View>
				<TouchableOpacity style={[styles.signUpBtn, { backgroundColor: 'rgba(0,153,0,0.9)' }]} onPress={() => this.props.navigation.navigate('NewPost')}>
              <Text style={styles.signUpTxt}>New Post</Text>
            </TouchableOpacity>
				<View>
					<ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={400}>
						{this.state.data.map((item, key) => {
							return (
								<View>
									<TouchableOpacity
										onPress={() => {
											this.props.navigation.navigate('ViewPost', { item: item });
										}}
									>
										<Card>
											<CardImage source={{ uri: 'http://bit.ly/2GfzooV' }} title={item.title} />
											<CardTitle subtitle={item.id} />
											<CardContent text={item.body} />
										</Card>
									</TouchableOpacity>
									<Card>
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
								</View>
							);
						})}
					</ScrollView>
				</View>
			</View>
		);
	}
}
