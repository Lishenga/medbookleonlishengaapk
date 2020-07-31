import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import styles from './styles/listStyle';

export default class UpdatePost extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			body: '',
			userId: ''
		};
	}

	componentDidMount(){
		const item = this.props.navigation.getParam('item', 'UpdatePost');
		this.setState({
			title: item.title,
			body: item.body,
			userId: item.userId
		})
	}	

	submit() {
		const item = this.props.navigation.getParam('item', 'UpdatePost');
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
			.then((json) => {
				this.props.navigation.navigate('ViewPost', { item: json });
			});
	}

	render() {
		return (
			<View>
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
					value={this.state.title}
					returnKeyType="next"
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
					<Text style={styles.signUpTxt}>Update</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
