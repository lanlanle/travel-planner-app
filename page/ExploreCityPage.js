import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";


export default class ExploreCityPage extends React.Component {
	static navigationOptions = {
    tabBarLabel: 'Explore',
    tabBarIcon: ({ tintColor }) => <Icon name={"search"} size={30} color={tintColor} />
  };
	render() {
	     return <Text>Explore all those cool places in this city </Text>

	}
}
