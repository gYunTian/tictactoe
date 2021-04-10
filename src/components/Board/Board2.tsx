import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native'
import Winner from '../../util/Winner'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import * as subscriptions from '../../graphql/subscriptions'
import UpdateGame from '../../service/UpdateGame'
import GetData from '../../service/GetData'

export const Board2 = ({ uid, navigation }) => {
  
  const [board, setBoard] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ])
  const [status, setStatus] = useState<String>("Player 1's turn") // status
  const [current, setCurrent] = useState<number>(1) // default player 1 starts first
  const [mounted, setMounted] = useState<boolean>(false)

  const [moves1, setMoves1] = useState<String[]>([])
  const [moves2, setMoves2] = useState<number[]>([])
  const [game_id, setUID] = useState<String>(uid)
  const [disabled, setDisabled] = useState<boolean>(false) // cannot click by default
  const [player1, setPlayer1] = useState<boolean>(true)
  const [player2, setPlayer2] = useState<boolean>(true) // keep track whether player 2 is in
  const [who, setWho] = useState<number>(0) // keep track which user
  const [data, setData] = useState<any>()

  const handleSubscription = (data: any) => {
    setData(data)
    setBoard(data.value.data.updatedGame.board)
    setStatus(data.value.data.updatedGame.status)
    setMoves1(data.value.data.updatedGame.moves1)
    setCurrent(data.value.data.updatedGame.turn)
    setMoves2(data.value.data.updatedGame.moves2)
    setPlayer1(data.value.data.updatedGame.player1)
    setPlayer2(data.value.data.updatedGame.player2)
  };

  // setting initial board state
  useEffect(() => {
    setMounted(true)
    // update game to show player 2 joined
    UpdateGame(uid, board, "null", true, 1, status, moves1)
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

  // function to reset board
  const gameOver = (winner: number) => {
    setStatus("Game ended - player "+current+" won")
    setDisabled(true)
    UpdateGame(uid, board, String(current), true, 2, "Game ended - player "+current+" won", moves1)
  }
  
  // function to call Winner util function
  const getWinner = () => {
    return Winner(board, 3)
  };

  const updateState = (moves1: String[], moves2: number[], board: number[][], winner: number, uid: String) => {
    // let data2 = JSON.stringify(board)
    console.log("updating game state")
    UpdateGame(uid, board, "null", true, 1, "Player 1's turn", moves1)
  }

  // function to handle tile presses
  const onTilePress = (row: number, col: number) => {
    let value = board[row][col]
    let currentPlayer = -1

    let arr = board.slice();
    arr[row][col] = currentPlayer;
    setBoard(arr)

    let temp = moves1
    temp.push(String(row)+String(col)+"-")
    setMoves1(temp)

    // update db
    let nextPlayer = (currentPlayer == -1) ? 1 : -1;
    let winner = getWinner();

    if (winner === 0 ) {
      setCurrent(nextPlayer);
      setStatus("Player 1's turn");
      updateState(temp, moves2, board, winner, game_id)
      return
    }
    else {
      console.log(board)
      console.log(winner)
      gameOver(winner);
    }

  }
  
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 30, fontSize: 20 }}> Tic Tac Toe Player 2 </Text>
      <Text style={{ marginBottom: 10, fontSize: 12 }} selectable> Game id: {game_id} </Text>
      <Text style={{ marginBottom: 10, fontSize: 20 }}> Clicking: {disabled ? "not enabled" : current == 2 ? "enabled" : "not enabled"} </Text>
      <Text style={{ marginBottom: 30, fontSize: 20 }}> Game status: {status} </Text>
      <Text style={{ marginBottom: 30, fontSize: 20 }}> Current player's turn: {current === 0 ? "Game not started" : current === 1 ? 1 : 2} </Text>
      {/* row 1 */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity disabled={disabled ? true : current == 2 ? false : true} onPress={() => onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
          {board[0][0] == 1 ? <Text> X </Text> : <View />}
          {board[0][0] == -1 ? <Text> O </Text> : <View />}
        </TouchableOpacity>
        <TouchableOpacity disabled={disabled ? true : current == 2 ? false : true} onPress={() => onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]} >
          {board[0][1] == 1 ? <Text> X </Text> : <View />}
          {board[0][1] == -1 ? <Text> O </Text> : <View />}
        </TouchableOpacity>
        <TouchableOpacity disabled={disabled ? true : current == 2 ? false : true} onPress={() => onTilePress(0, 2)} style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}>
          {board[0][2] == 1 ? <Text> X </Text> : <View />}
          {board[0][2] == -1 ? <Text> O </Text> : <View />}
        </TouchableOpacity>
      </View>

      {/* row 2 */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity disabled={disabled ? true : current == 2 ? false : true} onPress={() => onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }]} >
          {board[1][0] == 1 ? <Text> X </Text> : <View />}
          {board[1][0] == -1 ? <Text> O </Text> : <View />}
        </TouchableOpacity>
        <TouchableOpacity disabled={disabled ? true : current == 2 ? false : true} onPress={() => onTilePress(1, 1)} style={styles.tile}>
          {board[1][1] == 1 ? <Text> X </Text> : <View />}
          {board[1][1] == -1 ? <Text> O </Text> : <View />}
        </TouchableOpacity>
        <TouchableOpacity disabled={disabled ? true : current == 2 ? false : true} onPress={() => onTilePress(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]}>
          {board[1][2] == 1 ? <Text> X </Text> : <View />}
          {board[1][2] == -1 ? <Text> O </Text> : <View />}
        </TouchableOpacity>
      </View>

      {/* row 3 */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity disabled={disabled ? true : current == 2 ? false : true} onPress={() => onTilePress(2, 0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
          {board[2][0] == 1 ? <Text> X </Text> : <View />}
          {board[2][0] == -1 ? <Text> O </Text> : <View />}
        </TouchableOpacity>
        <TouchableOpacity disabled={disabled ? true : current == 2 ? false : true} onPress={() => onTilePress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]} >
          {board[2][1] == 1 ? <Text> X </Text> : <View />}
          {board[2][1] == -1 ? <Text> O </Text> : <View />}
        </TouchableOpacity>
        <TouchableOpacity disabled={disabled ? true : current == 2 ? false : true} onPress={() => onTilePress(2, 2)} style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]}>
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