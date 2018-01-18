import React from 'react';
import { StyleSheet, Text, View,Button,TextInput} from 'react-native';
import AutoSuggest from 'react-native-autosuggest';
import axios from 'axios'


const info = require('../info.json');

export default class ExploreCityPage extends React.Component {
	constructor(props){
	    super(props);
	    this.state={
	   	  searchResultArray:[],
	      searchCity:'',
	      placesResultArray:[],
	      restaurantsResultArray:[]
	    }
	}

	getPlaces(param){
		axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=point_of_interest+in+'+param+'&key='+info.API_KEY).then((response)=>{
			console.log(response.data.results)
			this.setState({placesResultArray:response.data.results})
		})
	}
	getRestaurants(param){
		axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+'+param+'&key='+info.API_KEY).then((response)=>{
			console.log(response.data.results)
			this.setState({placesResultArray:response.data.results})
		})
	}

	autoComplete = (searchCity)=>{
		this.setState({searchCity})
		axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+searchCity+'&types=geocode&key='+info.API_KEY).then((response)=>{
			response.data.predictions.map((result)=>{
				this.state.searchResultArray.push(result.description)
			})
		})
		this.setState({searchResultArray:[]})
	}

	findPlacesandRestaurants(){
		if(this.state.searchCity){
			var city_param = this.state.searchCity.replace(/\s/g, "")
			this.getPlaces(city_param)
			this.getRestaurants(city_param)
		}
	}

	render() {
	     return (
	     	<View>
	     		<AutoSuggest
		              style={styles.textInput}
		              terms={this.state.searchResultArray}
		              onChangeText={this.autoComplete}
		              value ={this.state.searchCity} 
		              placeholder='Seach places and restaurants' 
		              onSubmitEditing= {this.findPlacesandRestaurants.bind(this)}
		         />
   
		     	<Button
					  onPress={this.findPlacesandRestaurants.bind(this)}
					  title="Find places and restaurants"
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

