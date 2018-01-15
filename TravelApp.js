import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import PlanPage from './page/PlanPage'
import DetailPage from './page/DetailPage'


export const TravelApp = StackNavigator({
  Home: { screen: PlanPage},
  Detail:{ screen: DetailPage}
});

AppRegistry.registerComponent('TravelApp', () => TravelApp);