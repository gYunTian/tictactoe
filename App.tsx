import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Amplify, { API, graphqlOperation } from 'aws-amplify'

import GetData from './src/service/GetData'
import CreateGame from './src/service/CreateGame'
import myAppConfig from './aws-export'
import Game from './src/navigation/Game'
// import Front from './src/navigation/Front'

const { v4: uuidv4 } = require('uuid');
const Stack = createStackNavigator();

Amplify.configure(myAppConfig);

/*
* Function to setup new game session 
*/
const setUpNewSession = (_callback) => {
  console.log("creating new game session")
  let data = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  let date = JSON.stringify(new Date())
  let uid = uuidv4()

  // let game = CreateGame("new", date, data)
  console.log("New game created: " + uid)
  _callback()
}

/*
* Home screen, landing page
*/
const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Create new Game"
        onPress={() => {
          let uid = setUpNewSession(function () {
            navigation.navigate('Game', { uid: "new", navigation: navigation }) // game created by player 1
          })

        }}
      />
      <Separator />
      <Button
        title="Join existing Game"
        onPress={() => navigation.navigate('Join')}
      />
      <Separator />
      <Button
        title="Find Game"
        onPress={() => navigation.navigate('History')}
      />
    </View>
  );
}

/*
* Game screen, tic tac toe page
*/
const GameScreen = ({ route, navigation }) => {
  const { uid } = route.params;
  return (
    <Game uid={uid} navigation={navigation} />
  );
}

/*
* Join screen, join existing game page
*/
const JoinScreen = ({ route, navigation }) => {
  const [inputText, setInputText] = useState<String>("")
  const [data, setData] = useState<any>(0)
  const [show, setShow] = useState<Boolean>(false)

  const dataComp = async (inputText: any) => {
    let details = await GetData(inputText)
    if (details.uid == inputText) {
      console.log("found game!")
      navigation.navigate('Game', { uid: "new", navigation: navigation })
    }
    else {
      setShow(true)
    }
  }

  return (
    <View>
      <Text>{show ? "Cannot find game" : ""}</Text>
      <TextInput
        style={styles.input}
        placeholder=" Join by game id"
        returnKeyLabel={"next"}
        onChangeText={(text) => setInputText(text)}
      />
      <Button
        title="Join game"
        onPress={() => {
          console.log("Joining game")
          dataComp(inputText)
        }}
      />
    </View>
  );
}

/*
* History screen, search history page
*/
const HistoryScreen = ({ route, navigation }) => {
  const [inputText, setInputText] = useState<String>("")
  const [data, setData] = useState<any>(0)

  const dataComp = async (inputText: any) => {
    let details = await GetData(inputText)
    setData(details)
  }

  return (
    <View style={styles.container}>

      {data !== 0 ? (
        <View>
          <Text>Game ID: {data.uid}</Text>
          <Text>Date: {data.date}</Text>
          <Text>Winner: {data.winner}</Text>
          <Text>Final board: {data.board}</Text>
          <Text>Moves in sequence: {data.moves1}</Text>
          <Text>Player turns in sequence: {data.moves2}</Text>
          <Text>Game Status: {data.status}</Text>
          <Text>Last turn: Player {data.turn}</Text>
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

// main app
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Join" component={JoinScreen} />
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

