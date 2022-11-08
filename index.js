const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const qdb = require('./qandaqueries')
const app = express()
app.use(express.json())

const port = 3000

const loaderKey = fs.readFileSync('./loader.txt')

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/qa/questions', qdb.getQuestions)
app.get('/qa/questions/:question_id/answers', qdb.getAnswers)
app.post('/qa/questions', qdb.postQuestion)
app.post('/qa/questions/:question_id/answers', qdb.postAnswer)
app.put('/qa/questions/:question_id/helpful', qdb.questionHelpful)
app.put('/qa/questions/:question_id/report', qdb.questionReport)
app.put('/qa/answers/:answer_id/helpful', qdb.answerHelpful)
app.put('/qa/answers/:answer_id/report', qdb.answerReport)
app.get('/loaderio-b5f9fc5ff9feccc7eafe82b44ac00aab', (req, res) => res.send(loaderKey))

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})