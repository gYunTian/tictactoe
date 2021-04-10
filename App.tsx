import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import Game from './src/navigation/Game'
import * as mutations from './src/graphql/mutations';
import * as queries from './src/graphql/queries';

// import Front from './src/navigation/Front'

// const { w3cwebsocket: W3CWebSocket } = require('websocket')
const { v4: uuidv4 } = require('uuid');
const Stack = createStackNavigator();

const myAppConfig = {
  'aws_appsync_graphqlEndpoint': 'https://xh65au3w3vhwxnodlcte47i3k4.appsync-api.ap-southeast-1.amazonaws.com/graphql',
  'aws_appsync_region': 'ap-southeast-1',
  'aws_appsync_authenticationType': 'API_KEY',
  'aws_appsync_apiKey': 'da2-fcthhiuknrga7l6dc2ajm7cuzq',
}

Amplify.configure(myAppConfig);

const getData = async () => {
  const todoDetails = {
    "uid": "34"
  };
  const newTodo = await API.graphql({ query: queries.getGame, variables: {"uid": "34"}});
  console.log("fetching data")
  console.log(newTodo.data.getGame.date)
}

const setUpNewSession = () => {
  console.log("creating new game session")
  let data = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  let data2 = JSON.stringify(data)

  let date = new Date()
  let uid = uuidv4()

  console.log("Creating new game")
  // const newTodo = await API.graphql({ query: queries.getGame, variables: {"uid": "34"}});
  console.log("fetching data")
  // console.log(newTodo.data.getGame.date)

  console.log("New game created: " + uid)
  // set up session
  return uid
}

const HomeScreen = ({ navigation }) => {
  getData()

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

const HistoryScreen = ({ route, navigation }) => {
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

