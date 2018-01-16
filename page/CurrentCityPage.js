import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

export default class CurrentCityPage extends React.Component {
	static navigationOptions = {
    tabBarLabel: 'Current',
    tabBarIcon: ({ tintColor }) => <Icon name={"star"} size={30} color={tintColor} />
  };
	 render() {
	     return <Text>The places you want to go in this city </Text>
	 }
}
