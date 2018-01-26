import React from 'react';
import { StyleSheet, Text, View,Image,ScrollView,FlatList, TouchableOpacity } from 'react-native';
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
        website:'',
        address:''
      }
    }

    getPlaceData(placeID){
      axios.get("https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeID+"&key="+info.API_KEY).then((response)=>{
        this.setState({reviews:response.data.result.reviews})
        this.setState({website:response.data.result.website})
        this.setState({address:response.data.result.formatted_address})
        response.data.result.photos.map((photo)=>{
          // console.log("photo_ref",photo.photo_reference)
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
      if (counter<5){
         this.getPlaceData(params.placeID)
      }
     
      counter=counter+1
      console.log("counter: ",counter)
     
    }
  	render() {
    
    const { params } = this.props.navigation.state;
    console.log(this.state.photosUrl.length)

    let photosList =this.state.photosUrl.map((photoSrc,key)=>{
      console.log("get from list", photoSrc)
      return <Image key={key} keyval={key} style={{width: 315, height: 300, margin:2}} source={{uri:photoSrc}}/>
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
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          {photosList}
        </ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Text style = {styles.title}> {params.place} </Text> 
          <TouchableOpacity style = {styles.btn}>
          <Text style= {styles.btnText}>Add</Text>
          </TouchableOpacity>
        </View>
        
        <Text style ={styles.header}>{this.state.address}</Text>
        <Text style ={styles.header}>Website: {this.state.website}</Text>
        

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
  container:{
    flex:1,
    backgroundColor:'#d8caa4'
  },
  title: {
    marginTop:15,
    marginLeft:15,
    fontSize:20,
    fontWeight:'bold'
  },
  header: {
      marginTop:5,
      marginLeft:15,
      fontSize:15
  },
  btn: {
    width:50,
    margin:5,
    backgroundColor:'#9f886f'
  },
  btnText: {
    color:'#FFF',
    padding:5
  }
})
