/*
 * Day 2: a iOS style weather app
 */

import React, {Component} from 'react';
import {
	Platform,
	StyleSheet,
	StatusBar,
	ScrollView,
	Text,
	Image,
	View } from 'react-native';
import Util from './utils.js';
import Swiper from 'react-native-swiper';

const backgroundColor = {
	day: "#5292e5",
	night: "#030a38",
}

const weatherIcon = {
	'chanceflurries' : './weatherIcon/Winter.png',
	'chancerain' : './weatherIcon/LightRain.png',
	'chancesleet' : './weatherIcon/Winter.png',
	'chancesnow' : './weatherIcon/Light-Snow.png',
	'chancetstorms' : './weatherIcon/Intense-Rain.png',
	'clear' : './weatherIcon/Sun.png',
	'cloudy' : './weatherIcon/Clouds.png',
	'flurries' : './weatherIcon/Winter.png',
	'fog' : './weatherIcon/Fog-Day.png',
	'hazy' : './weatherIcon/Fog-Day.png',
	'mostlycloudy' : './weatherIcon/Partly-Cloudy-Day.png',
	'mostlysunny' : './weatherIcon/Partly-Cloudy-Day.png',
	'partlycloudy' : './weatherIcon/Partly-Cloudy-Day.png',
	'partlysunny' : './weatherIcon/Partly-Cloudy-Day.png',
	'sleet' : './weatherIcon/Winter.png',
	'rain' : './weatherIcon/Rain.png',
	'snow' : './weatherIcon/Winter.png',
	'sunny' : './weatherIcon/Sun.png',
	'tstorms' : './weatherIcon/Torrential-Rain.png',
	'fognight' : './weatherIcon/Fog-Night.png',
	'partlycloudynight' : './weatherIcon/Partly-Cloudy-Night.png',
	'clearnight' : './weatherIcon/Bright-Moon.png',
};

const BASE_URL = "https://api.wunderground.com/api/36708b1b79e70e0c/";

class Weather extends Component {
	constructor(props) {
		super(props);
		this.state = {
				location: "37.785025,-122.420327.json",
				city:"\u798f\u5dde",
				night: false,
				bgc: backgroundColor.day,
				condition:"\u5927\u90e8\u6674\u6717",
				degree: "--",
				hours:[{key:101,hour:"\u73b0\u5728",icon:"./weatherIcon/default.png",degree:"15\xb0",},
							 {key:102,hour:"3\u65f6",icon:"./weatherIcon/default.png",degree:"15\xb0",},
							 {key:103,hour:"4\u65f6",icon:"./weatherIcon/default.png",degree:"16\xb0",},
							 {key:104,hour:"5\u65f6",icon:"./weatherIcon/default.png",degree:"16\xb0",},
							 {key:105,hour:"6\u65f6",icon:"./weatherIcon/default.png",degree:"16\xb0",},
							 {key:106,hour:"06:21",icon:"./weatherIcon/default.png",degree:"\u65e5\u51fa",},
							 {key:107,hour:"7\u65f6",icon:"./weatherIcon/default.png",degree:"16\xb0",},
							 {key:108,hour:"8\u65f6",icon:"./weatherIcon/default.png",degree:"18\xb0",},
							 {key:109,hour:"9\u65f6",icon:"./weatherIcon/default.png",degree:"19\xb0",color:"#fedf32"},
							 {key:110,hour:"10\u65f6",icon:"./weatherIcon/default.png",degree:"122\xb0",color:"#fedf32"}],
				days:[{key:21,day:"\u661f\u671f\u4e00",icon:"./weatherIcon/default.png",high:21,low:16},
							  {key:22,day:"\u661f\u671f\u4e8c",icon:"./weatherIcon/default.png",high:22,low:14},
								{key:23,day:"\u661f\u671f\u4e09",icon:"./weatherIcon/default.png",high:21,low:11},
								{key:24,day:"\u661f\u671f\u56db",icon:"./weatherIcon/default.png",high:12,low:8},
								{key:25,day:"\u661f\u671f\u4e94",icon:"./weatherIcon/default.png",high:9,low:7},
								{key:26,day:"\u661f\u671f\u516d",icon:"./weatherIcon/default.png",high:13,low:9},
								{key:27,day:"\u661f\u671f\u65e5",icon:"./weatherIcon/default.png",high:17,low:13},
								{key:28,day:"\u661f\u671f\u4e00",icon:"./weatherIcon/default.png",high:18,low:14},
								{key:29,day:"\u661f\u671f\u4e8c",icon:"./weatherIcon/default.png",high:22,low:17}],
				rise:"06:21",
				down:"18:06",
				humi:"94%",
				wind_dir:"\u4e1c\u5317\u504f\u5317",
				wind_speed:"3\u5343\u7c73\uff0f\u5c0f\u65f6",
				feelslike:"15\xb0",
				rain:"0.0 \u5398\u7c73",
				pressure:"1,016 \u767e\u5e15",
				visibility:"5.0 \u516c\u91cc",
				uv:"0",
			};
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

	_findConditionIcon(condition, night) {
		let specials = ['fog', 'partlycloudy', 'clear'];
		if(night && specials.indexOf(condition) != -1) {
			return weatherIcon[condition + "night"];
		}
		return weatherIcon[condition];
	}

	_fetchGeoInfo() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				let longitude = position.coords.longitude;
				let latitude = position.coords.latitude;
				this.setState({location: "" + latitude + "," + longitude + ".json"});
				this._fetchWeatherInfo();
			},
			(error) => {
				alert(error);
			},
			{enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
		)
	}

	_fetchWeatherInfo() {
		this._fetchAstronomy();
		this._fetchTodayCondition();
		this._fetchTodayHourly();
		this._fetch10days();
	}

	_fetchAstronomy() {
			fetch(BASE_URL + "astronomy/q/" + this.state.location, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
			})
			.then((response) => response.json())
			.then((responseJson) => {
				let sunsetHour = responseJson.sun_phase.sunset.hour;
				let currentHour = new Date().getHours();
				if (currentHour > sunsetHour) {
					this.setState({night: true});
				}
				this.setState({
					rise: JSON.stringify(responseJson.sun_phase.sunrise.hour) + ":" + JSON.stringify(responseJson.sun_phase.sunrise.minute),
					down: JSON.stringify(responseJson.sun_phase.sunset.hour) + ":" + JSON.stringify(responseJson.sun_phase.sunset.minute),
				})
			})
			.catch((error) => console.error(error));
	}

	_fetchTodayCondition() {
			fetch(BASE_URL + "conditions/q/" + this.state.location, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
			})
			.then((response) => response.json())
			.then((responseJson) => {
				current_observation = responseJson.current_observation;
				this.setState({
					city: current_observation.display_location.city,
					abs: current_observation.weather,
					bgc: this.state.night ? backgroundColor.night : backgroundColor.day,
					degree: Math.floor(current_observation.temp_c),
					humi: current_observation.relative_humidity,
					wind_dir: current_observation.wind_dir,
					wind_speed: current_observation.wind_kph + "(kph)",
					feelslike: current_observation.feelslike_c,
					rain: current_observation.precip_today_metric + "(mm)",
					pressure: current_observation.pressure + "(mb)",
					visibility: current_observation.visibility_km + "(km)",
					uv: current_observation.solarradiation,
				});
			})
			.catch((error) => console.error(error));
	}

	_fetchTodayHourly() {
		fetch(BASE_URL + "hourly/q/" + this.state.location, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
		.then((response) => response.json())
		.then((responseJson) => {
			hourlyForecast = [];
			hourlyRaw = responseJson.hourly_forecast;
			hourlyRaw.forEach((item, index, array) => {
				temp = {};
				temp.key = item.index;
				temp.hour = item.FCTTIME.hour;
				temp.degree = item.temp.metric;
				temp.icon = this._findConditionIcon(item.icon, this.state.night);
				hourlyForecast.push(temp);
			});
			while(hourlyForecast.length > 12) hourlyForecast.pop();
			this.setState({hours: hourlyForecast});
		})
		.catch((error) => console.error(error));
	}

	_fetch10days() {
		fetch(BASE_URL + "forecast10day/q/" + this.state.location, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
		.then((response) => response.json())
		.then((responseJson) => {
			// let re = /\d+C/;											// regex to match temperature
			let simpleforecast = responseJson.forecast.simpleforecast;
			dayForecast = [];
			dayRaw = simpleforecast.forecastday;
			dayRaw.forEach((item, index, array) => {
				temp = {};
				temp.key = index;
				temp.day = item.date.weekay_short;
				temp.icon = this._findConditionIcon(item.icon, this.state.night);
				temp.high = item.high.celsius;
				temp.low = item.low.celsius;
				dayForecast.push(temp);
			});
			this.setState(
				{days: dayForecast},
			);
		})
		.catch((error) => console.error(error));
	}

	/* perform network transaction here */
	componentDidMount() {
		// update weather data
		this._fetchGeoInfo();
		// set os-statusbar style
		if(Platform.OS === "ios"){
			StatusBar.setBarStyle(1);
		} else {
			StatusBar.setBarStyle("Default");
		}
	}

	render() {
		var hourly = this.state.hours.map(elem => {
			return (
				<View key={elem.key} style={styles.hourlyBox}>
					<Text style={styles.hourlyHour}>{elem.hour}</Text>
					<Image style={styles.hourlyIcon} source={require('./weatherIcon/default.png')}/>
					<Text style={styles.hourlyDegree}>{elem.degree}</Text>
				</View>
			);
		});
		var weekly = this.state.days.map(elem => {
			return (
				<View key={elem.key} style={styles.weeklyBox}>
					<Text style={styles.weeklyDay}>{elem.day}</Text>
					<Image style={styles.weeklyIcon} source={require('./weatherIcon/default.png')}/>
					<View style={styles.weeklyDegreeContainer}>
						<Text style={styles.weeklyDegree}>{elem.high}</Text>
						<Text style={styles.weeklyDegree}>{elem.low}</Text>
					</View>
				</View>
			);
		});
		var weatherDetail = () => {
			return (
				<View>
				<View style={styles.todayDetailContainer}>
					<View style={styles.todayDetailKeysBox}><Text style={styles.todayDetailText}>Sunrise: </Text></View>
					<View style={styles.todayDetailKeysBox}><Text style={styles.todayDetailText}>Sunset: </Text></View>
					<View style={styles.todayDetailKeysBox}><Text style={styles.todayDetailText}>Wind: </Text></View>
					<View style={styles.todayDetailKeysBox}><Text style={styles.todayDetailText}>Humidity: </Text></View>
					<View style={styles.todayDetailKeysBox}><Text style={styles.todayDetailText}>Feelslike: </Text></View>
					<View style={styles.todayDetailKeysBox}><Text style={styles.todayDetailText}>Rain: </Text></View>
					<View style={styles.todayDetailKeysBox}><Text style={styles.todayDetailText}>Pressure: </Text></View>
					<View style={styles.todayDetailKeysBox}><Text style={styles.todayDetailText}>Visibility: </Text></View>
					<View style={styles.todayDetailKeysBox}><Text style={styles.todayDetailText}>UV index: </Text></View>
				</View>
				<View style={styles.todayDetailContainer}>
					<View style={styles.todayDetailValuesBox}><Text style={styles.todayDetailText}>{this.state.rise}</Text></View>
					<View style={styles.todayDetailValuesBox}><Text style={styles.todayDetailText}>{this.state.down}</Text></View>
					<View style={styles.todayDetailValuesBox}><Text style={styles.todayDetailText}>{this.state.wind_speed} {this.state.wind_dir}</Text></View>
					<View style={styles.todayDetailValuesBox}><Text style={styles.todayDetailText}>{this.state.humi}</Text></View>
					<View style={styles.todayDetailValuesBox}><Text style={styles.todayDetailText}>{this.state.feelslike}</Text></View>
					<View style={styles.todayDetailValuesBox}><Text style={styles.todayDetailText}>{this.state.rain}</Text></View>
					<View style={styles.todayDetailValuesBox}><Text style={styles.todayDetailText}>{this.state.pressure}</Text></View>
					<View style={styles.todayDetailValuesBox}><Text style={styles.todayDetailText}>{this.state.visibility}</Text></View>
					<View style={styles.todayDetailValuesBox}><Text style={styles.todayDetailText}>{this.state.uv}</Text></View>
				</View>
				</View>
			);
		};
		return(
			<ScrollView style={styles.main, {backgroundColor: this.state.bgc}}>
				<View style={styles.general}>
					<Text style={styles.city}>{this.state.city}</Text>
					<Text style={styles.abs}>{this.state.abs}</Text>
					<Text style={styles.degree}>{this.state.degree}</Text>
				</View>
				<View style={styles.hourly}>
					<ScrollView style={styles.hourlyContainer} horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
						{hourly}
					</ScrollView>
				</View>
				<View style={styles.weekly}>
					{weekly}
				</View>
				<View style={styles.todayDetail}>
					{weatherDetail}
				</View>
				<View style={styles.bottom}>

				</View>
			</ScrollView>
		)
	}
}

export default class extends Component {
	render() {
		return (
			<View>
				<Weather />
			</View>
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
		paddingTop: 50,
		width: Util.size.width,
		height: Util.size.height/2.6,
	},
	city: {
		fontSize: 35,
		color: "#fff",
		paddingBottom: 5,
	},
	abs: {
		fontSize: 20,
		color: "#fff",
	},
	degree: {
		fontSize: 85,
		color: "#fff",
		fontWeight: "100",
	},
	degreeMark: {
		fontSize: 85,
		color: "#fff",
		fontWeight: "100",
	},
	hourly: {
		width: Util.size.width,
		height: 120,
	},
	hourlyContainer: {
		marginTop: 3,
		flexDirection: "row",
		flexWrap: "nowrap",
		paddingLeft: 20, paddingTop: 10, paddingBottom: 10, paddingRight: 20,
		borderTopWidth: Util.pixel,
		borderTopColor: "rgba(255,255,255,0.7)",
		borderBottomWidth: Util.pixel,
		borderBottomColor: "rgba(255,255,255,0.7)",
	},
	hourlyBox: {
		width: 70,
		height: 80,
		flexDirection: "column",
		paddingLeft: 7, paddingTop: 10, paddingBottom: 10, paddingRight: 7,
	},
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
	},
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
	weeklyDegreeContainer: {
		flex: 1,
		flexDirection: 'row',
		paddingTop: 5,
	},
	weeklyDegree: {
		flex: 1,
		color:"#fff",
		fontSize:15,
	},
	todayDetail: {
		flexDirection: 'row',
		paddingTop:10,
		height: 150,
	},
	todayDetailContainer: {
		flex: 1,
		flexDirection: 'column',
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
	},
	bottom: {
		height: 15,
		width: Util.size.width,
	},
});
