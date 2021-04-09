import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Separator = () => (
  <View style={styles.separator} />
);

export const Menu = ({ navigation }) => {

  // const createGame = ({ navigation }) => {
  //   console.log("newGame")
  //   navigation.navigate('Game')
  //   return
  // }

  // const joinGame = ({ navigation }) => {
  //   console.log("joinGame")
  //   return
  // }

  return (
    <View style={styles.container}>
      <Button title="Create Game" onPress={navigation.navigate('Home')} />
      <Separator />
      <Button title="Join Game" onPress={navigation.navigate('Home')} />
    </View>
  )
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 8
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});