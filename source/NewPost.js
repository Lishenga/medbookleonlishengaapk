import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';
import { width } from 'react-native-dimension';
import styles from './styles/listStyle';

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
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<TextInput
					style={{ width: width(80), alignSelf: 'stretch', paddingHorizontal: 10 }}
					placeholder="UserId"
					value={this.state.userId}
					returnKeyType="next"
					onChangeText={(value) => {
						this.setState({ userId: value });
					}}
				/>
				<TextInput
					style={{ width: width(80), alignSelf: 'stretch', paddingHorizontal: 10 }}
					placeholder="title"
					returnKeyType="next"
					value={this.state.title}
					onChangeText={(value) => {
						this.setState({ title: value });
					}}
				/>
				<TextInput
					style={{ width: width(80), alignSelf: 'stretch', paddingHorizontal: 10 }}
					placeholder="Body"
					value={this.state.body}
					onChangeText={(value) => {
						this.setState({ body: value });
					}}
					multiline={true}
					numberOfLines={10}
					style={{ height: 200, textAlignVertical: 'top' }}
				/>
				<TouchableOpacity
					style={[ styles.signUpBtn2, { backgroundColor: 'rgba(0,153,0,0.9)' } ]}
					onPress={() => this.submit()}
				>
					<Text style={styles.signUpTxt}>Create</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
