/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $uid: String
    $winner: String
    $board: [[Int]]
    $moves1: [String]
    $moves2: [Int]
    $status: String
    $turn: Int
    $player1: Boolean
    $player2: Boolean
  ) {
    updateGame(
      uid: $uid
      winner: $winner
      board: $board
      moves1: $moves1
      moves2: $moves2
      status: $status
      turn: $turn
      player1: $player1
      player2: $player2
    ) {
      uid
      date
      winner
      board
      moves1
      moves2
      status
      turn
      player1
      player2
    }
  }
`;
export const addGame = /* GraphQL */ `
  mutation AddGame(
    $uid: String
    $date: String
    $board: [[Int]]
    $moves1: [String]
    $moves2: [Int]
    $status: String
    $turn: Int
    $player1: Boolean
    $player2: Boolean
  ) {
    addGame(
      uid: $uid
      date: $date
      board: $board
      moves1: $moves1
      moves2: $moves2
      status: $status
      turn: $turn
      player1: $player1
      player2: $player2
    ) {
      uid
      date
      winner
      board
      moves1
      moves2
      status
      turn
      player1
      player2
    }
  }
`;
