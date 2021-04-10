import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import Game from './src/navigation/Game'
import * as mutations from './src/graphql/mutations';
import * as queries from './src/graphql/queries';

// import Front from './src/navigation/Front'

const { v4: uuidv4 } = require('uuid');
const Stack = createStackNavigator();

const myAppConfig = {
  'aws_appsync_graphqlEndpoint': 'https://xh65au3w3vhwxnodlcte47i3k4.appsync-api.ap-southeast-1.amazonaws.com/graphql',
  'aws_appsync_region': 'ap-southeast-1',
  'aws_appsync_authenticationType': 'API_KEY',
  'aws_appsync_apiKey': 'da2-fcthhiuknrga7l6dc2ajm7cuzq',
}

Amplify.configure(myAppConfig);

const getData = async (uid: String) => {
  const data = await API.graphql({ query: queries.getGame, variables: { "uid": uid } });
  if (data.data.getGame === null) {
    return 0
  }
  else {
    console.log("fetched data")
    return data.data.getGame
  }
}

const createGame = async (uid: String, date: String, board: number[][]) => {
  const createdGame = await API.graphql({
    query: mutations.addGame, variables: {
      "uid": uid,
      "date": date,
      "board": board
    }
  });
  console.log("created game")
  // console.log(createdGame)
}

const setUpNewSession = () => {
  console.log("creating new game session")
  let data = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  let date = JSON.stringify(new Date())
  let uid = uuidv4()

  console.log("Creating new game")
  createGame(uid, date, data)
  console.log("New game created: " + uid)

  return uid
}

const HomeScreen = ({ navigation }) => {
  // getData()

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
      <Separator />
      <Button
        title="Find Game"
        onPress={() => navigation.navigate('History')}
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
  const [inputText, setInputText] = useState<String>("")
  const [data, setData] = useState<any>(0)

  const dataComp = async (inputText: any) => {
    let details = await getData(inputText)
    setData(details)
  }

  return (
    <View style={styles.container}>

      {data !== 0 ? (
        <View>
          <Text>Game ID: {data.uid}</Text>
          <Text>Winner: {data.winner}</Text>
          <Text>Final board: {data.board}</Text>
          <Text>Moves in sequence: {data.moves1}</Text>
          <Text>Player turns in sequence: {data.moves2}</Text>
        </View>

      ) : <Text>No data</Text>}

      <TextInput
        style={styles.input}
        placeholder=" Search game id"
        returnKeyLabel={"next"}
        onChangeText={(text) => setInputText(text)}
      />
      <Button
        title="Search game"
        onPress={() => {
          inputText.length > 0 ? (dataComp(inputText)) : console.log("empty")
        }}
      />
    </View>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />

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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

