import React from 'react';
import { StyleSheet, Text, View, ScrollView,TextInput,TouchableOpacity,TouchableHighlight,Button} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import City from '../components/city'

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
  render() {
    // Add navigation 
    const { navigate } = this.props.navigation;

    //Add the array here 
    let cities = this.state.cityArray.map((city,key)=>{

      return(
        <TouchableHighlight  key={key} keyval={key} onPress={() => navigate('Detail', {city:city})} title={city}>
          <City  key={key} keyval={key} city={city}/>
        </TouchableHighlight>
        )
    })

    return (
      <View style={styles.container}>
        <ScrollView>
            <List>
              {cities}
            </List>
        </ScrollView>

        <TextInput 
              style={styles.textInput}
              onChangeText={(inputCity)=> this.setState({inputCity})}
              value ={this.state.inputCity} 
              placeholder='Add new city to your plan' 
              placeholderTextColor='white'>
        </TextInput>

        <TouchableOpacity onPress={ this.addCity.bind(this) } style = {styles.addButton}>
            <Text style ={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        
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
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth:2,
        borderTopColor: '#ededed'
  }

});
