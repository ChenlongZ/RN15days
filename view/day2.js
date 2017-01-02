/*
 * Day 2: a iOS style weather app
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
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';

const backgroundColor = {
	day: "#5292e5",
	night: "#030a38",
}

const BASE_URL = "http://api.wunderground.com/api/36708b1b79e70e0c/"

class Weather extends Component {
	constructor(props) {
		super(props);
		this.state = {
			weather: {
				city:"\u798f\u5dde",night: false,bgc: backgroundColor.day, condition:"\u5927\u90e8\u6674\u6717", degree:--,
				today:{week:"\u661f\u671f\u516d",day:"\u4eca\u5929",high:16,low:14},
				hours:[{key:101,time:"\u73b0\u5728",icon:"ios-moon",degree:"15\xb0",color:"rgba(255,255,255,1)"},
							 {key:102,time:"3\u65f6",icon:"ios-cloudy-night",degree:"15\xb0",color:"rgba(255,255,255,0.8)"},
							 {key:103,time:"4\u65f6",icon:"ios-cloudy-night",degree:"16\xb0",color:"rgba(255,255,255,0.8)"},
							 {key:104,time:"5\u65f6",icon:"ios-cloudy-night",degree:"16\xb0",color:"rgba(255,255,255,0.8)"},
							 {key:105,time:"6\u65f6",icon:"ios-cloudy-night",degree:"16\xb0",color:"rgba(255,255,255,0.8)"},
							 {key:106,time:"06:21",icon:"ios-sunny-outline",degree:"\u65e5\u51fa",color:"#fedf32"},
							 {key:107,time:"7\u65f6",icon:"ios-partly-sunny",degree:"16\xb0",color:"rgba(255,255,255,0.9)"},
							 {key:108,time:"8\u65f6",icon:"ios-partly-sunny",degree:"18\xb0",color:"rgba(255,255,255,0.9)"},
							 {key:109,time:"9\u65f6",icon:"ios-sunny",degree:"19\xb0",color:"#fedf32"},
							 {key:110,time:"10\u65f6",icon:"ios-sunny",degree:"122\xb0",color:"#fedf32"},
							 {key:111,time:"11\u65f6",icon:"ios-sunny",degree:"23\xb0",color:"#fedf32"},
							 {key:112,time:"13\u65f6",icon:"ios-sunny",degree:"22\xb0",color:"#fedf32"},
							 {key:113,time:"13\u65f6",icon:"ios-sunny",degree:"22\xb0",color:"#fedf32"},
							 {key:114,time:"14\u65f6",icon:"ios-partly-sunny",degree:"16\xb0",color:"rgba(255,255,255,0.9)"},
							 {key:115,time:"15\u65f6",icon:"ios-partly-sunny",degree:"22\xb0",color:"rgba(255,255,255,0.9)"},
							 {key:116,time:"16\u65f6",icon:"ios-partly-sunny",degree:"21\xb0",color:"rgba(255,255,255,0.9)"},
							 {key:117,time:"17\u65f6",icon:"ios-partly-sunny",degree:"19\xb0",color:"rgba(255,255,255,0.9)"},
							 {key:118,time:"18\u65f6",icon:"ios-partly-sunny",degree:"18\xb0",color:"rgba(255,255,255,0.9)"},
							 {key:119,time:"18:06",icon:"ios-partly-sunny-outline",degree:"\u65e5\u843d",color:"rgba(255,255,255,0.9)"},
							 {key:120,time:"19\u65f6",icon:"ios-cloudy-night",degree:"18\xb0",color:"rgba(255,255,255,0.8)"},
							 {key:121,time:"20\u65f6",icon:"ios-cloudy-night",degree:"18\xb0",color:"rgba(255,255,255,0.8)"},
							 {key:122,time:"21\u65f6",icon:"ios-cloudy-night",degree:"18\xb0",color:"rgba(255,255,255,0.8)"},
							 {key:123,time:"22\u65f6",icon:"ios-cloudy-night",degree:"17\xb0",color:"rgba(255,255,255,0.8)"},
							 {key:124,time:"23\u65f6",icon:"ios-cloudy",degree:"17\xb0",color:"rgba(255,255,255,0.8)"},
							 {key:125,time:"0\u65f6",icon:"ios-cloudy",degree:"17\xb0",color:"rgba(255,255,255,0.8)"},
							 {key:126,time:"1\u65f6",icon:"ios-cloudy",degree:"17\xb0",color:"rgba(255,255,255,0.8)"},
							 {key:127,time:"2\u65f6",icon:"ios-cloudy",degree:"17\xb0",color:"rgba(255,255,255,0.8)"}],
					days:[{key:21,day:"\u661f\u671f\u4e00",icon:"ios-partly-sunny",high:21,low:16},
							  {key:22,day:"\u661f\u671f\u4e8c",icon:"ios-rainy",high:22,low:14},
								{key:23,day:"\u661f\u671f\u4e09",icon:"ios-rainy",high:21,low:11},
								{key:24,day:"\u661f\u671f\u56db",icon:"ios-rainy",high:12,low:8},
								{key:25,day:"\u661f\u671f\u4e94",icon:"ios-rainy",high:9,low:7},
								{key:26,day:"\u661f\u671f\u516d",icon:"ios-partly-sunny",high:13,low:9},
								{key:27,day:"\u661f\u671f\u65e5",icon:"ios-rainy",high:17,low:13},
								{key:28,day:"\u661f\u671f\u4e00",icon:"ios-partly-sunny",high:18,low:14},
								{key:29,day:"\u661f\u671f\u4e8c",icon:"ios-partly-sunny",high:22,low:17}],
					info:"\u4eca\u5929\uff1a\u4eca\u5929\u5927\u90e8\u591a\u4e91\u3002\u73b0\u5728\u6c14\u6e29 15\xb0\uff1b\u6700\u9ad8\u6c14\u6e2923\xb0\u3002",
					rise:"06:21",
					down:"18:06",
					humi:"94%",
					wind_dir:"\u4e1c\u5317\u504f\u5317",
					wind_speed:"3\u5343\u7c73\uff0f\u5c0f\u65f6",
					feelslike:"15\xb0",
					rain:"0.0 \u5398\u7c73",
					pressure:"1,016 \u767e\u5e15",
					visibility:"5.0 \u516c\u91cc",
					uv:"0",}
				};
		}
	}

	_whichDay(day) {
		let d;
		switch (day) {
			case 1: d = "Monday"; 		break;
			case 2: d = "Tuesday"; 		break;
			case 3: d = "Wednesday";	break;
			case 4: d = "Thursday"; 	break;
			case 5: d = "Friday"; 		break;
			case 6: d = "Saturday"; 	break;
			case 7: d = "Sunday"; 		break;
			default: alert("Invalid day");
		}
		return d;
	}

	_fetchGeoInfo() {
		return this.navigator.geolocation.getCurrentPosition{
			(position) => {
				let longitude = JSON.stringify(position.coords.longitude);
				let latitude = JSON.stringify(position.coords.latitude);
				var location = latitude + "," + longitude + ".json";
				_fetchWeatherInfo(location);
			},
			(error) => {
				alert(JSON.stringify(error));
			},
			{enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
		}
	}

	_fetchWeatherInfo(location) {
		this._fetchTodayCondition(location);
		this._fetchTodayHourly(location);
		this._fetch10days(location);
	}

	_fetchAstronomy() {
			fetch(BASE_URL + "astronomy/q/" + location, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
			})
			.then((response) => {
				let responseJson = response.json();
				let sunsetHour = responseJson.sunset.hour;
				let currentHour = new Date().getHours();
				if (currentHour > sunsetHour) {
					this.setState({night: true});
				}
				this.setState({
					rise: responseJson.sunrise.hour + ":" + responseJson.sunrise.minute,
					down: responseJson.sunset.hour + ":" + responseJson.sunset.minute,
				})
			})
			.catch((error) => alert(JSON.stringify(error)));
	}

	_fetchTodayCondition(location) {
			fetch(BASE_URL + "conditions/q/" + location, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
			})
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					city: responseJson.city,
					bgc: this.state.night ? backgroundColor.night : backgroundColor.day,
					condition: responseJson.weather,
					degree: Math.floor(responseJson.temp_c),
					humi: responseJson.relative_humidity,
					wind_dir: responseJson.wind_dir,
					wind_speed:"3\u5343\u7c73\uff0f\u5c0f\u65f6",
					feelslike:"15\xb0",
					rain: responseJson.precip_today_metric + "(mm)",
					pressure: responseJson.pressure + "(mb)",
					visibility: responseJson.visibility_km + "(km)",
					uv: responseJson.UV,
				});
			})
	}

	_fetchTodayHourly(latitude, longitude) {

	}

	_fetch10days(latitude, longitude) {
		info:"\u4eca\u5929\uff1a\u4eca\u5929\u5927\u90e8\u591a\u4e91\u3002\u73b0\u5728\u6c14\u6e29 15\xb0\uff1b\u6700\u9ad8\u6c14\u6e2923\xb0\u3002",

	}

	/* perform network transaction here */
	componentDidMount() {
		// update weather data
		fetchWeatherInfo();
		// set os-statusbar style
		if(Platform.OS === "ios"){
			StatusBar.setBarStyle(1);
		} else {
			StatusBar.setBarStyle("Default");
		}
	}

	render() {
		return(
			<ScrollView style={styles.main}>
				<View style={styles.general}>
					<Text style={styles.city}>{this.state.city}</Text>
					<Text style={styles.abs}>{this.state.abs}</Text>
					<Text style={styles.degree}>{this.state.degree}°</Text>
				</View>
				<Views style={styles.hourly}>
					<ScrollView style={styles.hourlyContainer} horizontal={true} showHorizontalScrollIndicator={false}>
						{hourly}
					</ScrollView>
				</Views>
				<View style={styles.weekly}>
					<ListView style={styles.weeklyContainer}>

					</ListView>
				</View>
				<View style={styles.todayGeneral}>
					<Text style={styles.todayGeneralText}></Text>
				</View>
				<View style={styles.todayDetail}>
					<ListView style={styles.todayDetailKeysContainer}>

					</ListView>
					<ListView style={styles.todayDetailValuesContainer}>

					</ListView>
				</View>
				<View style={styles.bottom}>

				</View>
			</ScrollView>
		)
	}
}

styles = StyleSheet.create({
	main: {
		width: Util.size.width,
		height: Util.size.height,
	},
	general: {
		flexDirection: "column",
		alignItems: "center",
		width: Util.size.width,
		height: Util.size.height/2,
	},
	city: {
		fontSize: 25,
		color: "#fff",
	},
	abs: {
		fontSize: 15,
		color: "#fff",
	},
	degree: {
		fontSize: 85,
		color: "#fff",
		fontWeight: "100",
	},
	hourly: {
		width: Util.size.width;
		height: 150;
	},
	hourlyContainer: {
		flexDirection: "row",
		flexWrap: "nowrap",
		borderTopWidth: Util.pixel,
		borderTopColor: "rgba(255,255,255,0.7)",
		borderBottomWidth: Util.pixel,
		borderBottomColor: "rgba(255,255,255,0.7)",
	},
	hourlyBox: {
		width: 55,
		flexDirection: "column",
		paddingLeft: 7, paddingTop: 10, paddingBottom: 10, paddingRight: 7,
	}
	hourlyHour: {
		fontSize: 12,
		color: "#fff",
		textAlign: "center",
	},
	hourlyIcon: {
		textAlign: "center",
		paddingTop: 5,
	},
	hourlyDegree: {
		fontSize: 14,
		color: "#fff",
		paddingTop: 5,
		textAlign: "center",
	},
	weekly: {
		width: Util.size.width,
		height: 135,
		borderTopColor:"rgba(255,255,255,0.7)", borderTopWidth:Util.pixel,
    borderBottomColor:"rgba(255,255,255,0.7)", borderBottomWidth:Util.pixel,
	},
	weeklyContainer: {
		paddingLeft: 7, paddingTop: 10, paddingBottom: 10, paddingRight: 7,
	},
	weeklyBox: {
		flexDirection: "row",
		paddingLeft: 7, paddingTop: 5, paddingBottom: 5, paddingRight: 7,
		height: 15,
	}
	weeklyDay: {
		flex: 1,
		color:"#fff",
    fontSize:15,
	},
	weeklyIcon: {
		flex: 1,
		textAlign: "center",
		paddingTop: 5,
	},
	weeklyDegree: {
		flex: 1,
		color:"#fff",
		fontSize:15,
	}
	todayGeneral: {
		marginTop:5,
    borderTopColor:"rgba(255,255,255,0.7)", borderTopWidth:Util.pixel,
    borderBottomColor:"rgba(255,255,255,0.7)", borderBottomWidth:Util.pixel
	},
	todayGeneralText: {
		color:"#fff",
    fontSize:15,
    paddingTop:10,paddingLeft:20,paddingBottom:10,paddingRight:20,
	},
	todayDetail: {
		paddingTop:10,
		height: 100,
	},
	todayDetailKeysContainer: {
		flex: 1,
	},
	todayDetailValuesContainer: {
		flex: 1,
	},
	todayDetailKeysBox: {
		height: 15,
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	todayDetailValuesBox: {
		height: 15,
		flexDirection: "row",
		justifyContent: "flex-start",
	},
	todayDetailText: {
		fontSize: 12,
		color: "#fff",
	}
	bottom: {
		height: 15,
		width: Util.size.width,
	},
});
