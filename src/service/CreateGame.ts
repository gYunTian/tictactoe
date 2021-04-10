import * as mutations from '../../src/graphql/mutations'
import Amplify, { API, graphqlOperation } from 'aws-amplify'

const CreateGame = async (uid: String, date: String, board: number[][]) => {
  const createdGame = await API.graphql({
    query: mutations.addGame, variables: {
      "uid": uid,
      "date": JSON.stringify(new Date()),
      "board": board,
      "player1": true,
      "player2": false,
      "turn": 1
      // "moves2": [12121212] 
    }
  });
  console.log("created game")
  return createdGame
}

export default CreateGame