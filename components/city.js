import React from 'react';
import { StyleSheet, Text, View,TouchableHighlight} from 'react-native';

export default class City extends React.Component {
  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }
  render() {
    return (
      <View style={styles.item} ref={component => this._root = component}>
            <Text style ={styles.itemText}> {this.props.city}</Text>  
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
