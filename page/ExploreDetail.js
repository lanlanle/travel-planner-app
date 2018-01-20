import React from 'react';
import { StyleSheet, Text, View,Image,ScrollView,FlatList } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import axios from 'axios';
import ReviewItem from '../components/reviewItem'


const info = require('../info.json');
var counter = 0;

export default class ExploreDetail extends React.Component {
	  static navigationOptions = ({ navigation }) => ({
    	title: `${navigation.state.params.place}`,
  	});
    constructor(props){
      super(props);
      this.getPlaceData= this.getPlaceData.bind(this)
      this.state={
        photosUrl:[],
        photosRef:[],
        reviews:[],
        website:''
      }
    }
    _keyExtractor = (item, index) => item.id;

    getPlaceData(placeID){
      axios.get("https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeID+"&key="+info.API_KEY).then((response)=>{
        this.setState({reviews:response.data.result.reviews})
        this.setState({website:response.data.result.website})
        response.data.result.photos.map((photo)=>{
          this.getPhotos(this.state.photosUrl,photo.photo_reference)
        })

      })
    }

    getPhotos(array,photo_reference){  
        axios.get('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+photo_reference+'&key='+info.API_KEY).then((response)=>{
          array.push(response.request.responseURL)
        }).catch((err)=>{
            console.log(err);
        })
    }

    componentDidMount(){
      counter=0
      const { params } = this.props.navigation.state;
      this.getPlaceData(params.placeID)
     
    }
    componentDidUpdate(){

      const { params } = this.props.navigation.state;
      if (counter<3){
         this.getPlaceData(params.placeID)
      }
     
      counter=counter+1
      console.log("counter: ",counter)
     
    }
  	render() {
    
    const { params } = this.props.navigation.state;
    // console.log(this.state.reviews)
    console.log(this.state.photosUrl)
    console.log(this.state.photosUrl.length)

    let photosList =this.state.photosUrl.map((photoSrc,key)=>{
      return <Image key={key} keyval={key} style={{width:150,height:120, margin:2}} source={{uri:photoSrc}}/>
    })
    let reviewsList =this.state.reviews.map((item,key)=>{
      return <ListItem key={key} keyval={key} 
                title={item.author_name} 
                subtitle={<ReviewItem time={item.relative_time_description} 
                                      text={item.text}
                                      rating={item.rating}/>}
              />
    })

                
    
    return (
      <View>
        <Image resizeMode={'cover'} style={{width: '100%', height: 150}} source={{uri:params.photoUrl}}/>
        <Text style = {styles.title}> {params.place} </Text>
        <Text>Website: {this.state.website}</Text>
        <Text style= {styles.header}>Photos</Text>
        <ScrollView horizontal={true}>
          {photosList}
        </ScrollView>

        <Text style ={styles.header}>Reviews</Text>
        <ScrollView>
          <List>
            {reviewsList}
          </List>
        </ScrollView>

      </View>
    );
  }
  	
}




const styles = StyleSheet.create({
  title: {
    marginTop:5,
    fontSize:20
  },
  header: {
      marginTop:5,
      fontSize:15
  }
})
