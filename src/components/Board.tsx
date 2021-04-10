import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native'
import Winner from '../util/Winner'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import * as subscriptions from '../../src/graphql/subscriptions'
import UpdateGame from '../service/UpdateGame'
import GetData from '../service/GetData'

export const Board = ({ uid, navigation }) => {

  const [board, setBoard] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ])
  const [status, setStatus] = useState<String>("Awaiting for a second player") // status
  const [current, setCurrent] = useState<number>(1) // default player 1 starts first
  const [mounted, setMounted] = useState<boolean>(false)

  const [moves1, setMoves1] = useState<String[]>([])
  const [moves2, setMoves2] = useState<number[]>([])
  const [game_id, setUID] = useState<String>(uid)
  const [disabled, setDisabled] = useState<boolean>(false) // cannot click by default
  const [player1, setPlayer1] = useState<boolean>(false)
  const [player2, setPlayer2] = useState<boolean>(false) // keep track whether player 2 is in
  const [who, setWho] = useState<number>(0) // keep track which user

  const handleSubscription = (data: any) => {
    setBoard(data.value.data.updatedGame.board)
    setStatus(data.value.data.updatedGame.status)
    setMoves1(data.value.data.updatedGame.moves1)
    setCurrent(data.value.data.turn)
  };

  // setting initial board state
  useEffect(() => {
    console.log("sub")
    setMounted(true)
    const subscription = API.graphql(
      graphqlOperation(subscriptions.updatedGame, {
        uid: uid,
      }),
    ).subscribe({
      next: handleSubscription,
    });
    console.log("subscription established")

    return () => {
      // Anything in here is fired on component unmount.
      subscription.unsubscribe();
      console.log("unmounted")
    }
  }, [])

  // function to return icon based on player
  // const renderIcon = (row: number, col: number) => {
  //   const value = board[row][col]

  //   switch (value) {
  //     case 1: return <Text> X </Text>
  //     case -1: return <Text> O </Text>
  //     default: return <View />
  //   }
  // };

  // function to reset board
  const gameOver = () => {
    setStatus("Game ended")
    console.log("game ended")
    // setBoard([
    //   [0, 0, 0],
    //   [0, 0, 0],
    //   [0, 0, 0]
    // ])
    // setCurrent(1)
    // navigation.navigate('Home')
  }

  // function to call Winner util function
  const getWinner = () => {
    return Winner(board, 3)
  };

  const updateState = (moves1: String[], moves2: number[], board: number[][], winner: number, uid: String) => {
    let data2 = JSON.stringify(board)
  }

  // function to handle tile presses
  const onTilePress = (row: number, col: number) => {
    let value = board[row][col]
    let currentPlayer = current;
    let arr = board.slice();
    arr[row][col] = currentPlayer;
    setBoard(arr)

    // update db
    let nextPlayer = (currentPlayer == 1) ? -1 : 1;
    let winner = getWinner();

    // end match is winner, send to api
    if (winner === 1) {
      console.log("player 1 won")
      Alert.alert("Player 1 is the winner");
    } else if (winner == -1) {
      console.log("player 2 won")
      Alert.alert("Player 2 is the winner");
    }
    else {
      setCurrent(nextPlayer);
      return
    }

    if (moves2.length == 0) {
      moves2.push(currentPlayer == 1 ? 1 : 2)
    }

    updateState(moves1, moves2, board, winner, game_id)
    gameOver();
  }

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 30, fontSize: 20 }}> Tic Tac Toe </Text>
      <Text style={{ marginBottom: 10, fontSize: 12 }} selectable> Game id: {uid} </Text>
      <Text style={{ marginBottom: 30, fontSize: 20 }}> Game status: {status} </Text>
      <Text style={{ marginBottom: 30, fontSize: 20 }}> Current player's turn: {current === 1 ? 1 : 2} </Text>
      {/* row 1 */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity disabled={disabled} onPress={() => onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
          {board[0][0] == 1 ? <Text> X </Text> : <View />}
          {board[0][0] == -1 ? <Text> O </Text> : <View />}
          {/* {renderIcon(0, 0)} */}
        </TouchableOpacity>
        <TouchableOpacity disabled={disabled} onPress={() => onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]} >
          {board[0][1] == 1 ? <Text> X </Text> : <View />}
          {board[0][1] == -1 ? <Text> O </Text> : <View />}
          {/* {renderIcon(0, 1)} */}
        </TouchableOpacity>
        <TouchableOpacity disabled={disabled} onPress={() => onTilePress(0, 2)} style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}>
          {board[0][2] == 1 ? <Text> X </Text> : <View />}
          {board[0][2] == -1 ? <Text> O </Text> : <View />}
          {/* {renderIcon(0, 2)} */}
        </TouchableOpacity>
      </View>

      {/* row 2 */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity disabled={disabled} onPress={() => onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }]} >
          {board[1][0] == 1 ? <Text> X </Text> : <View />}
          {board[1][0] == -1 ? <Text> O </Text> : <View />}
        </TouchableOpacity>
        <TouchableOpacity disabled={disabled} onPress={() => onTilePress(1, 1)} style={styles.tile}>
          {board[1][1] == 1 ? <Text> X </Text> : <View />}
          {board[1][1] == -1 ? <Text> O </Text> : <View />}
        </TouchableOpacity>
        <TouchableOpacity disabled={disabled} onPress={() => onTilePress(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]}>
          {board[1][2] == 1 ? <Text> X </Text> : <View />}
          {board[1][2] == -1 ? <Text> O </Text> : <View />}
        </TouchableOpacity>
      </View>

      {/* row 3 */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity disabled={disabled} onPress={() => onTilePress(2, 0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
          {board[2][0] == 1 ? <Text> X </Text> : <View />}
          {board[2][0] == -1 ? <Text> O </Text> : <View />}
        </TouchableOpacity>
        <TouchableOpacity disabled={disabled} onPress={() => onTilePress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]} >
          {board[2][1] == 1 ? <Text> X </Text> : <View />}
          {board[2][1] == -1 ? <Text> O </Text> : <View />}
        </TouchableOpacity>
        <TouchableOpacity disabled={disabled} onPress={() => onTilePress(2, 2)} style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]}>
          {board[2][2] == 1 ? <Text> X </Text> : <View />}
          {board[2][2] == -1 ? <Text> O </Text> : <View />}
        </TouchableOpacity>
      </View>

      {/* <Button title="New" onPress={onNewGame} style={styles.btn} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile: {
    borderWidth: 5,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },

  tileX: {
    color: "red",
    fontSize: 50
  },

  tileO: {
    color: "green",
    fontSize: 50
  },
});