import React from 'react';
import { StyleSheet, Text, View, ScrollView,TextInput,TouchableOpacity,TouchableHighlight,Button} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import axios from 'axios';
import City from '../components/city';


const info = require('../info.json');

export default class PlanPage extends React.Component {
  static navigationOptions = {
    title: 'Plans'
  };
  constructor(props){
    super(props);
    this.state={
      cityArray:[],
      inputCity:''
    }
  }
  addCity(){
    if(this.state.inputCity){
      this.state.cityArray.push(this.state.inputCity);
    }
    this.setState({cityArray: this.state.cityArray});
    this.setState({inputCity: '' });
  }
  getPlans(){
    return axios.get('http://'+info.URL+':3000/plans').then((response)=>{
      this.setState({cityArray:response.data})
    }).catch((err)=>{
      throw err;
    })
  }
  componentDidMount(){
    this.getPlans()
  }
  render() {
    // Add navigation 
    const { navigate } = this.props.navigation;

    //Add the array here 
    let cities = this.state.cityArray.map((city,key)=>{

      return(    
        <TouchableHighlight  key={key} keyval={key} onPress={() => navigate('Detail', {city:city.name})} title={city.name}>
          <City  key={key} keyval={key} city={city.name}/>
        </TouchableHighlight>
        )
    })

    return (
      <View style={styles.container}>
        <TextInput 
              style={styles.textInput}
              onChangeText={(inputCity)=> this.setState({inputCity})}
              onSubmitEditing={this.addCity.bind(this)}
              value ={this.state.inputCity} 
              placeholder='Add plan...' 
              placeholderTextColor='#D3D3D3'>
        </TextInput>
        <ScrollView>
            <List>
              {cities}
            </List>
        </ScrollView>

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: '#454565',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
  },
  addButtonText: {
        color: '#fff',
        fontSize: 24
  },
  textInput: {
        alignSelf: 'stretch',
        color: '#808080',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth:2,
        borderTopColor: '#ededed',
        margin:10,
        borderRadius:10
  }

});
