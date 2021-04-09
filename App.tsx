import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';

export default function App() {

  const [board, setBoard] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]) // default empty board
  const [current, setCurrent] = useState<number>(1) // default player 1 starts first
  const [mounted, setMounted] = useState<boolean>(false)

  // setting initial board state
  useEffect(() => {
    setMounted(true)
    setBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ])
  }, [])

  // function to return icon based on player
  const renderIcon = (row: number, col: number) => {
    const value = board[row][col]

    switch (value) {
      case 1: return <Text> X </Text>
      case -1: return <Text> O </Text>
      default: return <View />
    }
  };

  // function to reset board
  const onNewGame = () => {
    setBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ])
    setCurrent(1)
  }

  // function to check row, col, diagonal
  const getWinner = () => {
    const NUMTILES = 3;
    let sum;
    const arr = board;

    for (let i = 0; i < NUMTILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2]
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    for (let i = 0; i < NUMTILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i]
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    sum = arr[0][0] + arr[1][1] + arr[2][2]
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    sum = arr[2][0] + arr[1][1] + arr[0][2]
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    return 0;

  };
  
  // function to handle tile presses
  const onTilePress = (row: number, col: number) => {
    let value = board[row][col]
    let currentPlayer = current;
    let arr = board.slice();
    arr[row][col] = currentPlayer;
    setBoard(arr)

    let nextPlayer = (currentPlayer == 1) ? -1 : 1;
    let winner = getWinner();

    // end match is winner, send to api
    if (winner === 1) {
      console.log("player 1 won")
      Alert.alert("Player 1 is the winner");
      onNewGame();
    } else if (winner == -1) {
      console.log("player 2 won")
      Alert.alert("Player 2 is the winner");
      onNewGame();
    }
    else {
      // continue game
      setCurrent(nextPlayer);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 50, fontSize: 20 }}> Tic Tac Toe </Text>
      <Text style={{ marginBottom: 50, fontSize: 20 }}> Current player: {current === 1 ? 1 : 2} </Text>
      {/* row 1 */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
          {renderIcon(0, 0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]} >
          {renderIcon(0, 1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(0, 2)} style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}>
          {renderIcon(0, 2)}
        </TouchableOpacity>
      </View>

      {/* row 2 */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }]} >
          {renderIcon(1, 0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(1, 1)} style={styles.tile}>
          {renderIcon(1, 1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]}>
          {renderIcon(1, 2)}
        </TouchableOpacity>
      </View>

      {/* row 3 */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => onTilePress(2, 0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
          {renderIcon(2, 0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]} >
          {renderIcon(2, 1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(2, 2)} style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]}>
          {renderIcon(2, 2)}
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

  btn: {
    marginTop: 20,
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20
  }
});


