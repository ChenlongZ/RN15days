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

'use strict';

class WatchFace extends Component {
	static propTypes = {
		sectionTime: React.PropTypes.string.isRequired,
		totalTime: React.PropTypes.string.isRequired,
	};
	render() {
	   return (
		   	<View style={styles.watchFaceContainer}>
				<Text style={styles.sectionTime}>{this.props.sectionTime}</Text>
		 		<Text style={styles.totalTime}>{this.props.totalTime}</Text>
		 	</View>
			)
	}		   
}

class WatchControl extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	_startWatch() {};
	_recordWatch() {};
	render() {
		return (
				<View style={styles.watchControlContainter}>
					<View style={{flex:1,alignItems:"center"}}>
						<TouchableHighlight style={styles.Button}>
							<Text style={styles.ButtonText}>haha</Text>
						</TouchableHighlight>
					</View>
					<View style={{flex:1, alignItems: "center"}}>
						<TouchableHighlight style={styles.Button}>
							<Text style={styles.ButtonText}>hehe</Text>
						</TouchableHighlight>
					</View>
				</View>
			   )
	}
}

class WatchRecord extends Component {
	static propTypes = {
		record: React.PropTypes.array.isRequired,
	};
	render() {
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2});
		theDataSource = ds.cloneWithRows(this.props.record);
		return (
				<ListView style={styles.recordList}
						  dataSource={theDataSource}
						  renderRow={(rowData) => { 
							 return ( <View style={styles.recordItem}>
								  <Text style={styles.recordItemTitle}>{rowData.title}</Text>
								  <Text style={[styles.recordItemTitle, {textAlign: "right", color: "#222"}]}>{rowData.time}</Text>
							  </View>)}}
				/>
			)
	}
}
export default class extends Component {
	constructor() {
		super();
		this.state = {ready: true, 
					  reset: true,
					  running: false,
					  curr_time: 0,
					  rec_time: 0,
					  record: [],
					  recordCounter: 0,};
	}
	render() {
		return(
			<View style={styles.watchContainer}>
				<WatchFace totalTime={"00:00.00"} sectionTime={"00:00.00"}/>
				<WatchControl />
				<WatchRecord record={[{title:"haha", time:"hehe"}, {title:"jiji", time:"jaja"}]}/>
			</View>)
	}
}

const styles = StyleSheet.create({
	watchContainer: {
		alignItems: "center",
		backgroundColor: "#f3f3f3",
		marginTop: 60,
	},
	watchFaceContainer: {
		width: Util.size.width,
		height: 170,
		paddingTop: 30, 
		paddingLeft: 30,
		paddingRight: 30,
		paddingBottom: 40,
		backgroundColor: "#fff",
		alignItems: "center",
	},
	sectionTime: {
		fontSize: 20, 
		fontWeight: "100",
		alignSelf: "flex-end",
		paddingRight: 30,
		color: "#555",
	},
	totalTime: {
		fontSize: Util.size.width === 375? 70: 60,
		fontWeight: "100",
		color: "#222",
	},
	watchControlContainter: {
		width: Util.size.width,
		height: 110,
		flexDirection: "row",
		backgroundColor: "#f3f3f3",
		paddingTop: 30,
		paddingLeft: 60,
		paddingRight: 60, 
		paddingBottom: 30,
	},
	Button: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	ButtonText: {
		fontSize:14,
		backgroundColor: "transparent",
	}, 
	recordList: {
		width: Util.size.width,
		height: Util.size.height - 300,
		paddingTop: 30,
		paddingBottom: 30,
		paddingLeft: 15,
		paddingRight: 15,
	},
	recordItem: {
		height: 40,
		borderBottomWidth: Util.pixel,
		borderBottomColor: "#bbb",
		paddingTop: 5, 
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 5,
		flexDirection: "row",
		alignItems: "center",
	},
	recordItemTitle: {
		backgroundColor: "transparent",
		flex: 1,
		textAlign: "left",
		paddingLeft: 5,
		color: "#777",
	},
});
