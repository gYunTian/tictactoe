import * as queries from '../../src/graphql/queries';
import Amplify, { API, graphqlOperation } from 'aws-amplify'

const GetData = async (uid: String) => {
  const data = await API.graphql({ query: queries.getGame, variables: { "uid": uid } });
  if (data.data.getGame === null) {
    return 0
  }
  else {
    console.log("fetched data")
    // console.log(data.data.getGame)
    return data.data.getGame
  }
}

export default GetData