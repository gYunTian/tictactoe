import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Amplify from 'aws-amplify'
import Game from './src/navigation/Game'
// import Front from './src/navigation/Front'

const { w3cwebsocket: W3CWebSocket } = require('websocket')
const { v4: uuidv4 } = require('uuid');
const Stack = createStackNavigator();

const myAppConfig = {
  'aws_appsync_graphqlEndpoint': 'https://fye4dz6dzvgrha6ck5mipmntlm.appsync-api.ap-southeast-1.amazonaws.com/graphql',
  'aws_appsync_region': 'ap-southeast-1',
  'aws_appsync_authenticationType': 'API_KEY',
  'aws_appsync_apiKey': 'da2-lhfwjanaifahzm7epzyq2y6hsm',
}

Amplify.configure(myAppConfig);


const setUpNewSession = () => {
  console.log("creating new game session")
  let data = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  let data2 = JSON.stringify(data)

  let date = new Date()
  let uid = uuidv4()

  console.log("Creating new game")
  // make a post request to create new game
  // fetch('https://fye4dz6dzvgrha6ck5mipmntlm.appsync-api.ap-southeast-1.amazonaws.com/graphql', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     "x-api-key": "da2-lhfwjanaifahzm7epzyq2y6hsm",
  //   },
  //   body: JSON.stringify({
  //     query: 'mutation MyMutation  {\n  addGame(board: ' + data2 + ', date: \"' + date + '\", uid: \"' + uid + '\") {\n    uid\n    moves2\n    moves1\n    date\n    board\n  }\n}'
  //   })
  // });

  // establishing a websocke connection
  const client = new W3CWebSocket('wss://fye4dz6dzvgrha6ck5mipmntlm.appsync-realtime-api.ap-southeast-1.amazonaws.com/?header=eyJob3N0IjoiZnllNGR6NmR6dmdyaGE2Y2s1bWlwbW50bG0uYXBwc3luYy1hcGkuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbSIsIngtYW16LWRhdGUiOiIyMDIxMDQxMFQwNTIxNDlaIiwieC1hcGkta2V5IjoiZGEyLWxoZndqYW5haWZhaHptN2VwenlxMnk2aHNtIn0=&payload=e30=', 'echo-protocol');

  client.onopen = function () {
    console.log('WebSocket Client Connected');

    // function sendNumber() {
    //    if (client.readyState === client.OPEN) {
    //       var number = Math.round(Math.random() * 0xFFFFFF);
    //       client.send(number.toString());
    //       setTimeout(sendNumber, 1000);
    //    }
    // }
    // sendNumber();
  };

  client.onclose = function () {
    console.log('echo-protocol Client Closed');
  };

  client.onmessage = function (e) {
    if (typeof e.data === 'string') {
      console.log("Received: '" + e.data + "'");
    }
  };

  console.log("New game created: " + uid)
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

