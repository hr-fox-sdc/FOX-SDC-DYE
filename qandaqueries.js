const pool = require('./pool.js')

const getQuestions = (req, res) => {
  let productID = req.body.product_id || req.params.product_id
  let count = req.body.count || req.params.count || 5
  let page = req.body.page || req.params.page || 1

  query = {
    text: `select * from
    ( select
          question.id as "question_id",
          question.body as "question_body",
          TO_CHAR(TO_TIMESTAMP(question.date_written / 1000), 'DD/MM/YYYY HH24:MI:SS') as "question_date",
          question.asker_name,
          question.helpful as "question_helpfulness",
          question.reported,
          (select json_object_agg(id,answers) from
            (select * from
              ( select
                answer.id as "id",
                answer.body as "body",
                TO_CHAR(TO_TIMESTAMP(answer.date_written / 1000), 'DD/MM/YYYY HH24:MI:SS') as "date",
                answer.answerer_name,
                answer.helpful as "helpfulness",
                (select json_agg(photos) from
                (select * from answer_image where answer_id = answer.id) photos)
                as photos
                from answer where question_id = question.id
              ) answer
            ) answers
          ) as answers from question where product_id = ${productID} AND reported = false order by id limit ${count} offset ${(page * count) - count}
    ) questions;`

  }
  pool
    .query(query)
    .then((data) => {
      res.send({
        "product_id":productID,
        "results":data.rows
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
}

const getAnswers = (req, res) => {
  let questionID = req.body.question_id || req.params.question_id || req.query.question_id
  let count = req.body.count || req.query.count || 5
  let page = req.body.page || req.query.page || 1

  query = {
    text: `select * from
    ( select
        answer.id as "answer_id",
        answer.body,
        TO_CHAR(TO_TIMESTAMP(answer.date_written / 1000), 'DD/MM/YYYY HH24:MI:SS') as "date",
        answer.answerer_name,
        answer.helpful as "helpfulness",
          (select json_agg(photos) from (select * from answer_image where answer_id = answer.id) photos) as photos
      from answer where question_id = ${questionID} order by id limit ${count} offset ${(page * count) - count}) answers;`
  }
  pool
    .query(query)
    .then((data) => {
      res.send({
        "question": questionID,
        "page": page,
        "count": count,
        "results": data.rows
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
}

const postQuestion = (req, res) => {
  let body = req.body.body
  let name = req.body.name
  let email = req.body.email
  let product_id = req.body.product_id
  let date = new Date().getTime()

  query = {
    text: `INSERT INTO question (product_id, body, date_written, asker_name, asker_email) VALUES (${product_id}, '${body}', '${date}', '${name}', '${email}')`
  }
  pool
    .query(query)
    .then((data) => {
      res.send()
    })
    .catch((err) => {
      res.status(500).end()
    })
}

const postAnswer = (req, res) => {
  let questionID = req.body.question_id || req.params.question_id || req.query.question_id
  let body = req.body.body
  let name = req.body.name
  let email = req.body.email
  let date = new Date().getTime()
  let photos = req.body.photos || []

  query = {
    text: `INSERT INTO answer (question_id, body, date_written, answerer_name, answerer_email) VALUES (${questionID}, '${body}', '${date}', '${name}', '${email}') RETURNING id`
  }
  pool
    .query(query)
    .then((data) => {
      if (photos.length === 0) {
        res.send()
      } else {
        let newanswer_id = data.rows[0].id
        let photoQueries = []
        photos.forEach(photo => {
          let photoQ = pool.query(
            `INSERT INTO answer_image (answer_id, url) VALUES (${newanswer_id}, '${photo}')`
          )
          photoQueries.push(photoQ)
        })
        Promise.all(photoQueries).then((data) => {
          res.send()
        }).catch((err) => {
          console.log(err)
          res.status(500).end()
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
}

const questionHelpful = (req, res) => {
  let questionID = req.body.question_id || req.params.question_id || req.query.question_id

  query = {
    text: `UPDATE Question SET helpful = helpful + 1 WHERE id = ${questionID}`
  }
  pool
    .query(query)
    .then((data) => {
      res.send()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
}

const questionReport = (req, res) => {
  let questionID = req.body.question_id || req.params.question_id || req.query.question_id

  query = {
    text: `UPDATE Question SET reported = true WHERE id = ${questionID}`
  }
  pool
    .query(query)
    .then((data) => {
      res.send()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
}

const answerHelpful = (req, res) => {
  let answerID = req.body.answer_id || req.params.answer_id || req.query.answer_id
  console.log(answerID)
  query = {
    text: `UPDATE Answer SET helpful = helpful + 1 WHERE id = ${answerID}`
  }
  pool
    .query(query)
    .then((data) => {
      console.log(data)
      res.send()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
}

const answerReport = (req, res) => {
  let answerID = req.body.answer_id || req.params.answer_id || req.query.answer_id

  query = {
    text: `UPDATE Answer SET reported = true WHERE id = ${answerID}`
  }
  pool
    .query(query)
    .then((data) => {
      res.send()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
}

module.exports = {
  getQuestions,
  getAnswers,
  postQuestion,
  postAnswer,
  questionHelpful,
  questionReport,
  answerHelpful,
  answerReport
}