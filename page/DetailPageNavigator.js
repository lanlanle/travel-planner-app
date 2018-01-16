import React from 'react';
import { TabNavigator } from 'react-navigation';
import CurrentCityPage from './CurrentCityPage'
import ExploreCityPage from './ExploreCityPage'


export const DetailPageNavigator = TabNavigator({
  Current: { screen: CurrentCityPage},
  Explore:{ screen: ExploreCityPage}
},{
	tabBarPosition: 'top',
	animationEnabled: true,
	tabBarOptions: {
	    activeTintColor: '#454565',
    },
});