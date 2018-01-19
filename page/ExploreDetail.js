import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class ExploreDetail extends React.Component {
	static navigationOptions = ({ navigation }) => ({
    	title: `${navigation.state.params.place}`,
  	});
  	render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text> Detail page of {params.place} !!!!!</Text>
      </View>
    );
  }
  	
}
