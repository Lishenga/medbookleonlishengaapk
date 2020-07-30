import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Toast from 'react-native-simple-toast';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { NavigationActions } from 'react-navigation';

export default class NewPost extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			body: '',
			userId: ''
		};
	}

	submit() {
		fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify({
				title: this.state.title,
				body: this.state.body,
				userId: this.state.userId
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then((response) => response.json())
            .then((json) => alert(json.id));

            this.setState({
                title: '',
                body: '',
                userId: ''
            })
            
	}

	render() {
		return (
			<View>
				<TextInput
					style={{ width: width(80), alignSelf: 'stretch', paddingHorizontal: 10 }}
					placeholder="UserId"
					returnKeyType="next"
					onChangeText={(value) => {
						this.setState({ userId: value });
					}}
				/>
				<TextInput
					style={{ width: width(80), alignSelf: 'stretch', paddingHorizontal: 10 }}
					placeholder="title"
					returnKeyType="next"
					onChangeText={(value) => {
						this.setState({ title: value });
					}}
				/>
				<TextInput
					style={{ width: width(80), alignSelf: 'stretch', paddingHorizontal: 10 }}
					placeholder="Body"
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
