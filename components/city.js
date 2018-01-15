import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class City extends React.Component {
  render() {
    return (
      <View style={styles.item}>
        <Text style ={styles.itemText}>{this.props.city}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
        margin:3,
        width:250,
        padding: 5,
        backgroundColor:'#454565',
        borderRadius:5,    
        alignItems: 'flex-start'
  },
  itemText: {
        color: '#FFF',
        fontSize:20       
  },
});
