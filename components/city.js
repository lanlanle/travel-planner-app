import React from 'react';
import { StyleSheet, Text, View,TouchableHighlight} from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';

export default class City extends React.Component {
  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }
  render() {
    return (
      <View  ref={component => this._root = component}>
          <ListItem title={this.props.city}/>
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
