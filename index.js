const express = require('express');
const app = express();
const port = 1000;

app.use(express.static('public'));

app.get('/quiz', (req, res) => {
    fetch('https://api.jsonserve.com/Uw5CrX').then(
        response => response.json()
    ).then(
        data => {
            let quizData = [];
            for (const question of data.questions) {
                let options = [];
                let correctOption = null;
                for (const option of question.options) {
                    options.push(option.description);
                    if(option.is_correct === true) {
                        correctOption = question.options.indexOf(option);
                    }
                }
                quizData.push({
                    question: question.description,
                    options: options,
                    correct: correctOption
                });
            }
            res.send(quizData);
        }
    );
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});