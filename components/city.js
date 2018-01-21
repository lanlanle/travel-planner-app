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
          <ListItem style={styles.itemText} title={this.props.city}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({ 
  itemText: {
        fontSize:15      
  },
});
