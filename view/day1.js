/**
 * Day 1: A iOS fashion stopwatch 
 * Author: Chenlong Zhang
 */

import React, {Component} from 'react';
import {
	Platform,
	ListView, 
	StyleSheet,
	StatusBar, 
	Text, 
	TouchableHighlight, 
	View } from 'react-native';
import Util from './utils.js';

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return(
				<Text>Hello, stopwatch!</Text>
				);
	}
}
