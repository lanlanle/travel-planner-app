import React from 'react';
import { StyleSheet, Text, View,Button,TextInput} from 'react-native';
import axios from 'axios'


const info = require('../info.json');

export default class ExploreCityPage extends React.Component {
	constructor(props){
	    super(props);
	    this.state={
	   	  searchResultArray:[],
	      searchCity:''
	    }
	}

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

	autoComplete = (searchCity)=>{
		this.setState({searchCity})
		axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+searchCity+'&types=geocode&key='+info.API_KEY).then((response)=>{
			// console.log(response.data.predictions)
			response.data.predictions.map((result)=>{
				console.log(result.description)
			})
		})
	}

	render() {
	     return (
	     	<View>
	     		<TextInput 
		              style={styles.textInput}
		              onChangeText={this.autoComplete}
		              value ={this.state.searchCity} 
		              placeholder='Add new city to your plan' 
		              placeholderTextColor='white'>
        		</TextInput>
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
const styles = StyleSheet.create({
  textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth:2,
        borderTopColor: '#ededed'
  }

});

