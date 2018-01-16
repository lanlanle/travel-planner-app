import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {DetailPageNavigator} from './DetailPageNavigator'

export default class DetailPage extends React.Component {
	static navigationOptions = ({ navigation }) => ({
    	title: `${navigation.state.params.city}`,
  	});
  	render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text> Welcome to {params.city} !!!!!</Text>
        <DetailPageNavigator navigation={this.props.navigation}/>
      </View>
    );
  }
  	
}

DetailPage.router = DetailPageNavigator.router