import React from 'react';
import { StyleSheet, Text, View,Button} from 'react-native';
import axios from 'axios'


const info = require('../info.json');




export default class ExploreCityPage extends React.Component {

	getPlaces(){
		axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=point_of_interest+in+Sydney&key='+info.API_KEY).then((response)=>{
			console.log(response.data.results)
		})
	}
	getRestaurants(){
		axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Sydney&key='+info.API_KEY).then((response)=>{
			console.log(response.data.results)
		})
	}
	render() {
	     return (
	     	<View>
		     	<Button
					  onPress={this.getPlaces}
					  title="Places"
					  color="#841584"
				/>
				<Button
					  onPress={this.getRestaurants}
					  title="Restaurants"
					  color="#841584"
				/>

	     	</View>
	     )
	     

	}
}
