import React from 'react';
import { StackNavigator } from 'react-navigation';
import ExploreCityPage from './ExploreCityPage'
import ExploreDetail from './ExploreDetail'


const ExploreNavigator = StackNavigator({
  ExploreHome: { screen: ExploreCityPage},
  ExploreDetail:{ screen: ExploreDetail}
});


export default ExploreNavigator