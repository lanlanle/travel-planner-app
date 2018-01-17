import React from 'react';
import { StackNavigator } from 'react-navigation';
import PlanPage from './PlanPage'
import DetailPage from './DetailPage'


const PlanNavigator = StackNavigator({
  Home: { screen: PlanPage},
  Detail:{ screen: DetailPage}
});


export default PlanNavigator
