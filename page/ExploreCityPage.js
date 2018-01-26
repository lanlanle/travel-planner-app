import React from 'react';
import { StyleSheet, Text, View,TextInput,ScrollView,TouchableHighlight,ImageBackground} from 'react-native';
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

	findPlaces(){
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
								containerStyle={{backgroundColor:'rgba(255, 255, 255, 0.85)',
												margin:10,
												marginRight:20}}
								title={item.name} 
								titleStyle={{fontSize:20,
									        color:'#907d53',
									        fontWeight:'bold'   }}
								subtitle={item.types.join()}
								subtitleStyle={{fontStyle:'italic'}}
								avatar={{uri:item.icon}}
								avatarContainerStyle={{width:50,height:50}}/>
					</View>
					
				</TouchableHighlight>
			) 
		})
	     return (
	     	<ImageBackground source={{uri:"http://afamilycdn.com/KKeeNwcSSZYWZsF7Ky9KzFlY9R0wGt/Image/2013/10/Ngam/1310/tumblr_mormapKZj21rbwsb5o1_1280-e4f70.jpg"}} style={styles.backgroundImage}>
	     		<AutoSuggest
		              textInputStyles={{
				        alignSelf: 'stretch',
				        color: '#808080',
				        width:320,
				        backgroundColor: '#fff',
				        borderTopColor: '#ededed',
				        borderRadius:10,
				        marginLeft:10
  					}}
		              terms={this.state.searchResultArray}
		              onChangeText={this.autoComplete}
		              value ={this.state.searchCity} 
		              placeholder='Type here...' 
		              onItemPress= {this.findPlaces.bind(this)}
		         />
   
				<ScrollView>
					<List containerStyle={{backgroundColor:'rgba(255, 255, 255, 0)'}}>
						{placeList}
					</List>

				</ScrollView>
			</ImageBackground>
	     )
	     

	}
}
const styles = StyleSheet.create({
  container:{
  	flex:1,
  	backgroundColor:'#b8b894'
  },
  resultSection:{
  		height:200
  },
  backgroundImage:{
    flex: 1
  }

});

