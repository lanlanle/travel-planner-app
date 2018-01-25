import React from 'react';
import { StyleSheet, Text, View,TextInput,ScrollView,TouchableHighlight} from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import AutoSuggest from 'react-native-autosuggest';
import axios from 'axios'


const info = require('../info.json');


export default class ExploreCityPage extends React.Component {

	static navigationOptions = {
    	title: 'Explore'
  	};

  	setNativeProps (nativeProps) {
    	this._root.setNativeProps(nativeProps);
  	}

	constructor(props){
	    super(props);
	    this.state={
	   	  searchResultArray:[],
	      searchCity:'',
	      placesResultArray:[],
	      restaurantsResultArray:[],
	      placesPhotoReferenceArray:[],
	      placesImageUrlArray:[],
	      restaurantsImageUrlArray:[]
	    }
	}

	getPlaces(param){
		axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=point_of_interest+in+'+param+'&key='+info.API_KEY).then((response)=>{
			this.setState({placesResultArray:response.data.results})
			// response.data.results.map((item)=>{
			// 	this.getPhotos(this.state.placesImageUrlArray,item.photos[0].photo_reference)
			// })
			
		})
	}
	getRestaurants(param){
		axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+'+param+'&key='+info.API_KEY).then((response)=>{
			this.setState({restaurantsResultArray:response.data.results})
			response.data.results.map((item)=>{
				this.getPhotos(this.state.restaurantsImageUrlArray,item.photos[0].photo_reference)
			})
			
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

	getPhotos(array,photo_reference){
		axios.get('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+photo_reference+'&key='+info.API_KEY).then((response)=>{
			array.push(response.request.responseURL)
		}).catch((err)=>{
				console.log(err);
		})
	}

	findPlacesandRestaurants(){
		console.log('button hit')
		if(this.state.searchCity){
			var city_param = this.state.searchCity.replace(/\s/g, "")
			this.getPlaces(city_param)
			
		}

	}

	render() {
		const { navigate } = this.props.navigation;
		let placeList = this.state.placesResultArray.map((item,key)=>{
			return(
				<TouchableHighlight  key={key} keyval={key} onPress={() => navigate('ExploreDetail', { place:item.name,placeID:item.place_id,photoUrl:this.state.placesImageUrlArray[key]})} title={item.name}>
					<View ref={component => this._root = component}>
						<ListItem key={key} keyval={key} 
								title={item.name} 
								subtitle={item.types.join()}
								avatar={{uri:item.icon}}/>
					</View>
					
				</TouchableHighlight>
			) 
		})
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
				<ScrollView>
					<List>
						{placeList}
					</List>

				</ScrollView>

				
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
  },
  resultSection:{
  		height:200
  }

});

