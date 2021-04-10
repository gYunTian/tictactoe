/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updatedGame = /* GraphQL */ `
  subscription UpdatedGame($uid: String) {
    updatedGame(uid: $uid) {
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
