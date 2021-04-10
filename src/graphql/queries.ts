/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGame = /* GraphQL */ `
  query GetGame($uid: String) {
    getGame(uid: $uid) {
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
