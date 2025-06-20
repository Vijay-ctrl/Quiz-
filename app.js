//jshint esversion:8

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const questions = require('./questions');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
   res.render('quiz', { questions });
});

app.post("/submit", function (req, res) {
   let score = 0;
   const userAnswers = req.body;


   for (let i = 0; i < questions.length; i++) {
      let answerKey = `q${i}`;  //inserts variable values into string
      let userAnswer = Number(userAnswers[answerKey]);
      let correctAnswer = questions[i].correctAnswer;

      if (userAnswer === correctAnswer) {
         score++;
      }
   }


   res.render('result', { score, total: questions.length });
});

app.listen(3000, function () {
   console.log("Server is running on port 3000");
}); 