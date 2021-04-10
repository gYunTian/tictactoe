/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Game = {
  __typename: "Game",
  uid?: string | null,
  date?: string | null,
  winner?: string | null,
  board?: Array< Array< number | null > | null > | null,
  moves1?: Array< string | null > | null,
  moves2?: Array< number | null > | null,
  status?: string | null,
  turn?: number | null,
};

export type UpdateGameMutationVariables = {
  uid?: string | null,
  winner?: string | null,
  board?: Array< Array< number | null > | null > | null,
  moves1?: Array< string | null > | null,
  moves2?: Array< number | null > | null,
  status?: string | null,
  turn?: number | null,
};

export type UpdateGameMutation = {
  updateGame?:  {
    __typename: "Game",
    uid?: string | null,
    date?: string | null,
    winner?: string | null,
    board?: Array< Array< number | null > | null > | null,
    moves1?: Array< string | null > | null,
    moves2?: Array< number | null > | null,
    status?: string | null,
    turn?: number | null,
  } | null,
};

export type AddGameMutationVariables = {
  uid?: string | null,
  date?: string | null,
  board?: Array< Array< number | null > | null > | null,
  moves1?: Array< string | null > | null,
  moves2?: Array< number | null > | null,
  status?: string | null,
  turn?: number | null,
};

export type AddGameMutation = {
  addGame?:  {
    __typename: "Game",
    uid?: string | null,
    date?: string | null,
    winner?: string | null,
    board?: Array< Array< number | null > | null > | null,
    moves1?: Array< string | null > | null,
    moves2?: Array< number | null > | null,
    status?: string | null,
    turn?: number | null,
  } | null,
};

export type GetGameQueryVariables = {
  uid?: string | null,
};

export type GetGameQuery = {
  getGame?:  {
    __typename: "Game",
    uid?: string | null,
    date?: string | null,
    winner?: string | null,
    board?: Array< Array< number | null > | null > | null,
    moves1?: Array< string | null > | null,
    moves2?: Array< number | null > | null,
    status?: string | null,
    turn?: number | null,
  } | null,
};

export type UpdatedGameSubscriptionVariables = {
  uid?: string | null,
};

export type UpdatedGameSubscription = {
  updatedGame?:  {
    __typename: "Game",
    uid?: string | null,
    date?: string | null,
    winner?: string | null,
    board?: Array< Array< number | null > | null > | null,
    moves1?: Array< string | null > | null,
    moves2?: Array< number | null > | null,
    status?: string | null,
    turn?: number | null,
  } | null,
};
