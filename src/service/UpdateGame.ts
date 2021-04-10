import * as mutations from '../../src/graphql/mutations'
import Amplify, { API, graphqlOperation } from 'aws-amplify'

const UpdateGame = async (uid: String, board: number[][], winner: String, player2: Boolean, turn: number, status: String, moves1: String[]) => {
  const updatedGame = await API.graphql({
    query: mutations.updateGame, variables: {
      "uid": uid,
      "winner": winner,
      "board": board,
      "player2": player2,
      "turn": turn,
      "status": status,
      "moves1": moves1
    }
  });
  console.log("updated game")
}

export default UpdateGame