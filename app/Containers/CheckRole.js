'use strict';

import React, {
	Component
} from 'react';

import {
	StyleSheet,
	View,
	TouchableOpacity,
    Navigator,
    Text
} from 'react-native';

import Home from './Home';

class CheckRole extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	_pushButton() {
		const {
			navigator
		} = this.props;
		if (navigator) {
			navigator.push({
				name: 'Home',
				component: Home,
			})
		}
	}
	_popButton() {
		const {
			navigator
		} = this.props;
		if (navigator) {
			navigator.pop();
		}
	}
	render() {
		return (
			<View>
                <TouchableOpacity onPress={this._pushButton.bind(this)}>
                    <Text>点我跳转</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._popButton.bind(this)}>
                    <Text>点我跳回去</Text>
                </TouchableOpacity>
            </View>
		);
	}
}

const styles = StyleSheet.create({

});


export default CheckRole;