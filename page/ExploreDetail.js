import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import axios from 'axios'

const info = require('../info.json');

export default class ExploreDetail extends React.Component {
	  static navigationOptions = ({ navigation }) => ({
    	title: `${navigation.state.params.place}`,
  	});
    constructor(props){
      super(props);
      // this.getPlaceData= this.getPlaceData.bind(this)
      this.state={
        photoObjects:[],
        reviews:[],
        websites:''
      }
    }

    getPlaceData(placeID){
      // console.log(placeID)
      axios.get("https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeID+"&key="+info.API_KEY).then((response)=>{
        // console.log(response.data.result.reviews)
        this.setState({reviews:response.data.result.reviews})
      })
    }

    // componentDidMount(){
    // }
  	render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    this.getPlaceData(params.placeID)
    // console.log(this.state.reviews)
    return (
      <View>
        <Image resizeMode={'cover'} style={{width: '100%', height: 200}} source={{uri:params.photoUrl}}/>
        <Text style = {styles.header}> {params.place} </Text>
      </View>
    );
  }
  	
}




const styles = StyleSheet.create({
  header: {
    marginTop:5,
    fontSize:20
  }
})
