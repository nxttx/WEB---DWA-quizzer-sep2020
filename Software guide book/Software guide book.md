# Quizzer ~ Software guide book  

## Authors

* **G. Hulscher** - [GlennHulscher](https://github.com/GlennHulscher)
* **R. Boudewijn** - [nxttx](https://github.com/nxttx)


## Table of contents
- [Introduction](#Introduction)
- [Frameworks and other imports](#Frameworks-and-other-imports)
- [Wireframes](#wireframes-low-fidelity)
- [REST and WebSocket specification](#REST-and-WebSocket-specification)
- [Database schema](#Database-schema)

## Introduction
The Quizzer is a web application that can be used in bars, sports canteens and maybe even prisons to play quizzes as a team. A pub quiz, basically.

A typical use in a bar would look like this:

- Players are placed in _teams_. A typical team would consist of anywhere between three and eight players, this is not critical to the application, however.
- A _Quizz Night_ typically has two to six teams participating.
- A Quizz Night consists of multiple _rounds_, each round contains twelve questions, chosen from three _categories_.
- Besides the teams there is also a Quizz Master who selects questions, approves or disproves answers and keeps the mood up using humour and enthusiasm.
- Every team shares a table and uses one team member's smartphone to submit answers.
- The Quizz Master uses a tablet to host the game.
- Finally, a large screen (e.g. a beamer) is used to display everyone's score, the current question and the teams that have answered this question.
- The Quizzer's questions require short answers. They are not multiple choice questions, but don't require long sentences either. For example: “What is the capital of Peru?” or “In what year did the Netherlands last win the world championship Clay Pigeon Shooting?”.
- The Quizz Master decides when a Quizz Night is over. When it is, the application selects the winners based on the results of all played rounds.


## Frameworks and other imports
The following frameworks and other imports are going to be used: (TODO further update)
* React
* Bulma
* Websockets
* Express
* 

##  Wireframes (Low fidelity)

For this quizzer project we made three wireframes that show the flow of the three separate web applications. In this chapter we'll show the different wireframes and discuss our choices. These wireframes will also show the react components that we want to make.

In some wireframes there are green and blue dotted lines. These indicate that in that area is a react (parent) component (green dotted). The blue dotted lines indicate that there is a react child component.

### Team app 
![Wireframe Team app](Wire%20frames/Wireframes_team_app_v2.png)

Here you can see the wireframes for the team app. This is almost the most simple app. The only thing that happens here is that the user can login (frame 1), after that the user sees a waiting/loading screen (he or she will see this until the game starts) (frame 2). When the game starts the user will see frame 3. Here they can see the question and a separate react component where they can reply the awnser to the game master. When they submit the answer, they will see almost the exact same screen (frame 4). Only with a loading gif. In this screen the user still has the opportunity to change their answer. When a new question is given, the user will return to frame 3. This will happen until the game is finished. Then the user will see frame 5, with some game info.


### Scoreboard app 
![Wireframe scoreboard app](Wire%20frames/Wireframes_Scoreboard_app_v2.png)

The scoreboard app is the most simple app. Before the game starts the app will show the join code and a logo. After that the app will display:
* the current question.
* The current number of questions finished.
* The type of question.
* The amount of rounds.
* All the teams that have answered with their points.

Most of this info will be continued to be displayed during the game. When the game master says that the time is over it will display all the teams with either a 'x' or a 'V' to indicate whether their answer was correct.

When the game is finished the score will be displayed.
### Quizmaster app 
![Wireframe quizmaster app](Wire%20frames/Wireframes_Quizmaster_v2.png)

This is the quizmaster app. In this app the quizmaster can start a game (frame 1), accept teams (frame 2), choose which categories of questions to use(frame 3), start a question from the first category (frame 4), end the current question and see information about howmany teams have answered and howmany seconds have passed(if you want to play timebased) (frame 5), rate the answers of all teams (frame 6) and then select a new question(back to frame 4). After a round, the gamemaster can choose to continue the game with another round of 12 questions from the second category or he ca end the game (frame 7). After ending the game, he too can see howmany points each team has and he can start a new game (frame 8).
## REST and WebSocket specification
For our webApp is good communucation key. That is why we have spent a lot of time in preparing our API. This has been made restful, this way it is easier to understand. We will also be using a websocket connection, which we use to ensure that the server can communicate with the client. We want to avoid websocket client to server messages as much as possible. So we don't have to reinvent the wheel.

In all of the pictures the following legenda will be used:

* Yellow: WebSocket communication (data is written like JSON).
* Red: REST, will contain the request method and the URL.
* Black or gray: Wireframe or flow.
* Green: React component or Parent component
* Blue: React child component.

### Team app 
![Team app](Rest%20and%20Websocket%20specification/Team_v3.png)



### Scoreboard app 
![Scoreboard app](Rest%20and%20Websocket%20specification/scoreboard_v3.png)

### Quizmaster app 
![Quizmaster app](Rest%20and%20Websocket%20specification/Wireframe_Quizmaster_v3.png)


## Quizzer database schema

```JS
gamepin: Number,                                                                        // Used to identify each game so teams can join
quizmaster: String,                                                                     // Name of the quizmaster of this game
teams:  [{                                                                              // List of: Accepted teams and their points
    name: String, 
    points: {type: Number, default: 0},                                   
    answers: [{                                                                         // Along with a questionID, the teams answer and whether it was correct
        questionID: String, answer: String, isCorrect: {type: Boolean, default: false}
    }] 
}], 
categories: [],                                                                         // Chosen categories
questions: [],                                                                          // Asked questions end up in this list
date: { type: Date, default: Date.now },                                                // Date the game was started, wont be changed, allways will be date of collection creation
closed: {type: Boolean, default: false},                                                // If the game is over, will be changed to closed. While active default value will be kept

```

## Questions database schema
Filled with provided questions and answers

```JS
question: String,
answer: String,
category: String
```
```JS
/**
   * @type ExpressSocket.
   * @description Closes a question
   * @param gamepin
   * @body
   * @returns websocket connection to all team clients
   * @async
   * @memberof app
   */```
