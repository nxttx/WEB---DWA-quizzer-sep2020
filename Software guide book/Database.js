import mongoose from 'mongoose';
  const { Schema } = mongoose;

  const Quizzer = new Schema({
    gamepin: Number,                                                                        // Used to identify each game so teams can join
    quizmaster: String,                                                                     // Name of the quizmaster of this game
    teams:  [{                                                                              // List of: Accepted teams and their points
        name: String, points: {type: Number, default: 0},                                   // Along with a questionID, the teams answer and whether it was correct
        answers: [{
            questionID: String, answer: String, isCorrect: {type: Boolean, default: false}
        }] 
    }], 
    categories: [String],                                                                   // Chosen categories
    questions: [{                                                                           // Questions exists of
        categoryname: String, questions: [{                                                 // a list with a Categoryname and for each categoryname a list with questions and answers
            questyionID: String, question: String, answer: String      
        }]                                        
    }],
    date: { type: Date, default: Date.now },                                                // Date the game was started, wont be changed, allways will be date of collection creation
    closed: {type: Boolean, default: false},                                                // If the game is over, will be changed to closed. While active default value will be kept
  });
