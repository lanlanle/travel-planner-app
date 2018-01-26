import React from 'react';
import { StyleSheet, Text, View,TouchableHighlight} from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';

export default class ReviewItem extends React.Component {
 
  render() {
    return (
      <View >
          <Text style={{fontStyle:'italic'}}>Rating: {this.props.rating}- {this.props.time}</Text>
          <Text>Review: {this.props.text}</Text>
      </View>
    );
  }
}

