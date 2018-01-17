import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { TabNavigator,TabView } from 'react-navigation';
import ExploreCityPage from './page/ExploreCityPage'
import PlanNavigator from './page/PlanNavigator'
import Icon from "react-native-vector-icons/FontAwesome";


export const TravelApp = TabNavigator({
 	Explore:{
 		screen:ExploreCityPage,
 		navigationOptions: {
 			tabBarLabel: "Explore",
 			tabBarIcon:({ tintColor }) => <Icon name={"search"} size={30} color={tintColor} />
 		}
 	},
 	Plan:{
 		screen:PlanNavigator,
 		navigationOptions:{
 			tabBarLabel: "Plan",
 			tabBarIcon: ({ tintColor }) => <Icon name={"star"} size={30} color={tintColor} />
 		}
 	}
},{
	tabBarOptions: {
            activeTintColor: '#454565',
    }
});

AppRegistry.registerComponent('TravelApp', () => TravelApp);