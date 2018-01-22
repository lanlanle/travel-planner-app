import React from 'react';
import { StyleSheet, Text, View,TouchableHighlight} from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';

export default class City extends React.Component {
  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }
  render() {
    return (
      <View style={styles.item} ref={component => this._root = component}>
          <Text style={styles.itemText}>{this.props.city}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({ 
  item:{
    width:'90%',
    margin:15,
    padding:15,
    backgroundColor:'rgba(255, 255, 255, 0.8)',
    borderColor:'#a5a5a5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
        fontSize:25,
        color:'#907d53',
        fontWeight:'bold'    
  },
});
