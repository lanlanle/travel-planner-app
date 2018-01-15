import React from 'react';
import { StyleSheet, Text, View, ScrollView,TextInput,TouchableOpacity,Button} from 'react-native';
import City from '../components/city'

export default class PlanPage extends React.Component {
  static navigationOptions = {
    title: 'Your Plans'
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
    this.setState({noteArray: this.state.cityArray});
    this.setState({inputCity: '' });
  }
  render() {
    // Add navigation 
    const { navigate } = this.props.navigation;

    //Add the array here 
    let cities = this.state.cityArray.map((city,key)=>{
      return <City  key={key} keyval={key} city={city}/>
    })

    return (
      <View style={styles.container}>
        <Button
          onPress={() => navigate('Detail')}
          title="Detail Page"
        />
        <ScrollView>
            {cities}
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
  title:{
    margin:20,
    fontSize:30
  },
  container: {
    flex: 1,
    backgroundColor: '#8abdbf',
    alignItems: 'center',
    justifyContent: 'center',
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
