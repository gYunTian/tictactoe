import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Game from './src/navigation/Game'
// import Front from './src/navigation/Front'

const { v4: uuidv4 } = require('uuid');
const Stack = createStackNavigator();

const setUpNewSession = () => {
  console.log("creating new game session")
  let data = [[0,0,0],[0,0,0],[0,0,0]]
  let data2 = JSON.stringify(data)
  
  let date = new Date()
  let uid = uuidv4()
  
  console.log("Creating new game")
  // make a post request to create new game
  fetch('https://fye4dz6dzvgrha6ck5mipmntlm.appsync-api.ap-southeast-1.amazonaws.com/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "x-api-key": "da2-lhfwjanaifahzm7epzyq2y6hsm",
    },
    body: JSON.stringify({
      query: 'mutation MyMutation  {\n  addGame(board: ' + data2 + ', date: \"'+date+'\", uid: \"'+uid+'\") {\n    uid\n    moves2\n    moves1\n    date\n    board\n  }\n}'
    })
  });

  console.log("New game created: "+uid)
  // set up session
  return uid
}

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Create new Game"
        onPress={() => {
          let uid = setUpNewSession()

          navigation.navigate('Game', {
            uid: uid
          })
        }}
      />
      <Separator />
      <Button
        title="Join existing Game"
        onPress={() => navigation.navigate('Game')}
      />
    </View>
  );
}

const GameScreen = ({ route, navigation }) => {
  const { uid } = route.params;
  return (
    <Game uid={uid} navigation={navigation} />  
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Separator = () => (
  <View style={styles.separator} />
);

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

