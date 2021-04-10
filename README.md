Video link: https://youtu.be/yEK1bqeyXIc

## How to setup
1) go to a folder, run git clone https://github.com/gYunTian/tictactoe.git
2) run npm install (make sure you have npm installed already)
3) run npm run web (im using my browser to emulate)
4) wait for app to auto open in your default browser
5) once app is opened (i.e. localhost:19006), click CREATE NEW GAME (to create a new game session)
6) copy the game id (i.e. cd5a7717-****-****-****-************)
7) open the app in a new incognito window (or another tab is also fine)
8) select JOIN EXISTING GAME and input the game id into the input box (make sure no trailing spaces)
9) each browser/tab/player will take turn to select a cell
10) Once a winning condition is found, the game will end and the backend will be updated
11) You can use the same game id and go to home page to find the game details.
12) Select FIND GAME and input the game id (make sure no trailing spaces again)
13) It will display all the game details.
    - Final board represents the board when the game ended. 1 represents player 1, -1 represents player 2
    - moves in sequence represent the moves taken by player 1 and 2 respectively and sequentially
    - player turns in sequence is empty, just need to known that player 1 and 2 take turns with player 1 starting first
    - winner: the winner of the game (null if game not properly ended)

## API SPECS
All these APIs are Graphql based
1)  retrieve game details based on game id
    POST https://xh65au3w3vhwxnodlcte47i3k4.appsync-api.ap-southeast-1.amazonaws.com/graphql
    header:
    - x-api-key: da2-fcthhiuknrga7l6dc2ajm7cuzq
    body: (stringified)
      {
          "query": "query getGame {\n  getGame(uid: \"0e26479a-3d4c-4eeb-9ed4-4950f3c85bc8\") {\n    date\n    moves1\n    moves2\n    uid\n    winner\n    board\n  }\n}",
          "variables": null,
          "operationName": "getGame"
      }
    # image
    ![GET-details](https://user-images.githubusercontent.com/54625060/114279787-f2759300-9a68-11eb-94a5-ff61132a6a93.PNG)
      
     
2)  update game details based on game id
    POST https://xh65au3w3vhwxnodlcte47i3k4.appsync-api.ap-southeast-1.amazonaws.com/graphql
    header:
    - x-api-key: da2-fcthhiuknrga7l6dc2ajm7cuzq
    body: (stringified)
      {
          "query": "mutation updateGame {\n  updateGame(\n    uid:\"new\"\n    winner: \"A new winner 1\"\n    board: [[1,-1,1],[1,-1,1],[-1,1,-1]]\n    moves1: [\"00\", \"01\", \"02\", \"10\", \"11\", \"12\", \"21\", \"22\", \"23\"]\n    moves2: [1,-1,1,-1,1,-1,1,-1]\n  ) {\n\t\twinner,\n    board,\n    moves1,\n    moves2,\n    uid\n  }\n}",
          "variables": null,
          "operationName": "updateGame"
      }
      # image
      ![update-details](https://user-images.githubusercontent.com/54625060/114279801-015c4580-9a69-11eb-8153-31caa7d3cfc0.PNG)

3)  create a new game session with a game id
    POST https://xh65au3w3vhwxnodlcte47i3k4.appsync-api.ap-southeast-1.amazonaws.com/graphql
    header:
    - x-api-key: da2-fcthhiuknrga7l6dc2ajm7cuzq
    body: (stringified)
      {
          "query": "mutation MyMutation {\n  addGame(board: [[0, 0, 0], [0, 0, 0]], date: \"TESTDATE2\", uid: \"TEST3\") {\n    uid\n    moves2\n    moves1\n    date\n    board\n  }\n}",
          "variables": null,
          "operationName": "MyMutation"
      }
     # image
     ![create-details](https://user-images.githubusercontent.com/54625060/114279852-3a94b580-9a69-11eb-8824-c77c20b7fb45.PNG)
      
      

## ARCHITECTURE DIAGRAM

![Untitled Diagram (5)](https://user-images.githubusercontent.com/54625060/114279184-f7851300-9a65-11eb-8133-f57f69d984c6.png)

All backend services are deployed on AWS using my personal account, so please dont spam the APIs.
1) AWS APPSYNC - serverless API GATEWAY alternative.
   -  GraphQl based APIs
   -  Reason: it is serverless. I can use aws amplify sdk to easily create the data schema, apis etc.. within my visual studio code
              vs lambda, lambda has a cold start - i.e. ~ 1 to 2 secs, may slow down performance
2) AWS DynamoDB - NOSQL datastore
   - Reason: because I need to store json type data, and differing number of variables since this app is not production ready
             no need for strong data integrity, relationships etc..

## ASSUMPTIONS
1) no need give deliver an app that is free of bug, as long as it works
2) i can use any directory layout i want, coding style
3) i can use my browser as emulator instead of mobile phones


## Known bugs
these are known bugs that I am aware of
I simply have no time to fix them since I have an upcoming certificate test and exams.
1) The players can click cells that are already clicked, i.e. player 1 clicked row 0 col 0, and player 2 can click row 0 col 0 again
2) A player can join a game that has already ended
3) Date displayed in game history page is null
4) Able to view game details that are still ongoing
5) games that stopped with no proper ending (i.e. no one won as one player left) will be left in that state
6) If all 8 cells are filled and no winner yet, game does not end and players can still overclick the filled cells

## Final
I actually didnt realize that this role I applied for requires react native. I know react so when I saw the project, I was shocked and had to quickly learn react native.
Therefore, some of the codes are copy and pasted from the internet.
Secondly, I am rusty in typescript. I haven used it in a long while since I last learnt it by watching videos. Nonetheless, I used to to enforce data types.

Please understand that I am extremely busy, this app took me 2 days to develop and there are still many bugs remaining, though the main requirements are met.

I completed development on Sunday, 11 April 2021. ~ 12 PM to 1 AM. Since I completed early (deadline is 15 April) though with many bugs, please at least give me credit for that

