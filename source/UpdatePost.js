import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class UpdatePost extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			body: '',
			userId: ''
		};
  }
  navigateToScreen = (route, title) => {
		const navigateAction = NavigationActions.navigate({
			routeName: route
		});
		this.props.navigation.setParams({ otherParam: title });
		this.props.navigation.dispatch(navigateAction);
	};
  
  submit() {
    const item = this.props.navigation.getParam('item', 'UpdatePost')
		fetch('https://jsonplaceholder.typicode.com/posts/' + item.id, {
			method: 'PUT',
			body: JSON.stringify({
				id: 1,
				title: this.state.title,
				body: this.state.body,
				userId: this.state.userId
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then((response) => response.json())
            .then((json) => {this.navigateToScreen('ViewPost', { item: json })});

            this.setState({
                title: '',
                body: '',
                userId: ''
            })
            
	}

	render() {
    const item = this.props.navigation.getParam('item', 'UpdatePost')
		return (
			<View>
				<TextInput
					style={{ width: width(80), alignSelf: 'stretch', paddingHorizontal: 10 }}
          placeholder="UserId"
          value={item.userId}
					returnKeyType="next"
					onChangeText={(value) => {
						this.setState({ userId: value });
					}}
				/>
				<TextInput
					style={{ width: width(80), alignSelf: 'stretch', paddingHorizontal: 10 }}
					placeholder="title"
          value={item.title}
					returnKeyType="next"
					onChangeText={(value) => {
						this.setState({ title: value });
					}}
				/>
				<TextInput
					style={{ width: width(80), alignSelf: 'stretch', paddingHorizontal: 10 }}
					placeholder="Body"
          value={item.body}
					onChangeText={(value) => {
						this.setState({ body: value });
					}}
				/>
				<TouchableOpacity
					onPress={() => {
						this.submit();
					}}
				>
					Submit
				</TouchableOpacity>
			</View>
		);
	}
}
