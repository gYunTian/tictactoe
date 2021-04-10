/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
		$uid: String,
		$winner: String,
		$board: [[Int]],
		$moves1: [String],
		$moves2: [Int]
  ) {
    updateGame(
      uid: $uid
      winner: $winner
      board: $board
      moves1: $moves1
      moves2: $moves2
    ) {
      uid
      date
      winner
      board
      moves1
      moves2
    }
  }
`;
export const addGame = /* GraphQL */ `
  mutation AddGame(
		$uid: String,
		$date: String,
		$board: [[Int]],
		$moves1: [String],
		$moves2: [Int]
  ) {
    addGame(
      uid: $uid
      date: $date
      board: $board
      moves1: $moves1
      moves2: $moves2
    ) {
      uid
      date
      winner
      board
      moves1
      moves2
    }
  }
`;
