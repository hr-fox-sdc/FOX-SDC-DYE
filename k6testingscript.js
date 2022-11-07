import http from 'k6/http';
import { check, sleep, group } from 'k6';

export const options = {
  stages: [
    { duration: '60s', target: 10 },
    // { duration: '30s', target: 60 },
    // { duration: '30s', target: 120 },
    // { duration: '30s', target: 250 },
    // { duration: '30s', target: 500 },
    // { duration: '30s', target: 1000 },
  ],
};

const generateNumber = () => {
  return Math.floor(Math.random() * 10000) + 1
}

const answers = `http://localhost:3000/qa/questions/${Math.floor(Math.random() * 10000) + 1}/answers`

const questions = `http://localhost:3000/qa/questions/?product_id=${Math.floor(Math.random() * 10000) + 1}`
const questionsPayload = JSON.stringify({
  product_id: 5
});

const postAnswers = `http://localhost:3000/qa/questions/${Math.floor(Math.random() * 10000) + 1}/answers`
const postAnswerPayload = JSON.stringify({
  body: 'This answer',
  name: 'AName',
  email: 'Aemail',
  photos: ["https://images.unsplash.com/photo-1526880792616-4217886b9dc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80","https://images.unsplash.com/photo-1526880792616-4217886b9dc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"]
})
const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const postQuestions = `http://localhost:3000/qa/questions/`
const postQuestionsPayload = JSON.stringify({
  body: 'This is a question',
  name: 'A Name For A Question',
  email: 'questionemail@questionemail.com',
  product_id: `${Math.floor(Math.random() * 10000) + 1}`
})

const helpQuestions = `http://localhost:3000/qa/questions/${Math.floor(Math.random() * 10000) + 1}/helpful`
const helpAnswers = `http://localhost:3000/qa/answers/${Math.floor(Math.random() * 10000) + 1}/helpful`

export default function test() {
  group('getAnswers', () => {
    const answerResponse = http.get(answers);
    check(answerResponse, {
      'status is 200': (r) => r.status === 200,
      'transaction time < 10ms': (r) => r.timings.duration < 10,
      'transaction time < 50ms': (r) => r.timings.duration < 50,
      'transaction time < 75ms': (r) => r.timings.duration < 75,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 1000ms': (r) => r.timings.duration < 1000,
      'transaction time < 2000ms': (r) => r.timings.duration < 2000,
      'transaction time < 5000ms': (r) => r.timings.duration < 5000,
      'transaction time < 10s': (r) => r.timings.duration < 10000,
      'transaction time < 20s': (r) => r.timings.duration < 20000,
    });
  });

  group('getQuestions', () => {
    const questionResponse = http.get(questions)
    check(questionResponse, {
      'status is 200': (r) => r.status === 200,
      'transaction time < 10ms': (r) => r.timings.duration < 10,
      'transaction time < 50ms': (r) => r.timings.duration < 50,
      'transaction time < 75ms': (r) => r.timings.duration < 75,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 1000ms': (r) => r.timings.duration < 1000,
      'transaction time < 2000ms': (r) => r.timings.duration < 2000,
      'transaction time < 5000ms': (r) => r.timings.duration < 5000,
      'transaction time < 10s': (r) => r.timings.duration < 10000,
      'transaction time < 20s': (r) => r.timings.duration < 20000,
    });
  })

  // group('postAnswer', () => {
  //   const postAnswerResponse = http.post(postAnswers, postAnswerPayload, params)
  //   check(postAnswerResponse, {
  //     'status is 200': (r) => r.status === 200,
  //     'transaction time < 10ms': (r) => r.timings.duration < 10,
  //     'transaction time < 50ms': (r) => r.timings.duration < 50,
  //     'transaction time < 75ms': (r) => r.timings.duration < 75,
  //     'transaction time < 200ms': (r) => r.timings.duration < 200,
  //     'transaction time < 500ms': (r) => r.timings.duration < 500,
  //     'transaction time < 1000ms': (r) => r.timings.duration < 1000,
  //     'transaction time < 2000ms': (r) => r.timings.duration < 2000,
  //     'transaction time < 5000ms': (r) => r.timings.duration < 5000,
  //     'transaction time < 10s': (r) => r.timings.duration < 10000,
  //     'transaction time < 20s': (r) => r.timings.duration < 20000,
  //   });
  // })

  // group('postQuestion', () => {
  //   const postQuestionResponse = http.post(postQuestions, postQuestionsPayload, params)
  //   check(postQuestionResponse, {
  //     'status is 200': (r) => r.status === 200,
  //     'transaction time < 10ms': (r) => r.timings.duration < 10,
  //     'transaction time < 50ms': (r) => r.timings.duration < 50,
  //     'transaction time < 75ms': (r) => r.timings.duration < 75,
  //     'transaction time < 200ms': (r) => r.timings.duration < 200,
  //     'transaction time < 500ms': (r) => r.timings.duration < 500,
  //     'transaction time < 1000ms': (r) => r.timings.duration < 1000,
  //     'transaction time < 2000ms': (r) => r.timings.duration < 2000,
  //     'transaction time < 5000ms': (r) => r.timings.duration < 5000,
  //     'transaction time < 10s': (r) => r.timings.duration < 10000,
  //     'transaction time < 20s': (r) => r.timings.duration < 20000,
  //   });
  // })

  group('helpQuestion', () => {
    const helpQuestionsResponse = http.put(helpQuestions)
    check(helpQuestionsResponse, {
      'status is 200': (r) => r.status === 200,
      'transaction time < 10ms': (r) => r.timings.duration < 10,
      'transaction time < 50ms': (r) => r.timings.duration < 50,
      'transaction time < 75ms': (r) => r.timings.duration < 75,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 1000ms': (r) => r.timings.duration < 1000,
      'transaction time < 2000ms': (r) => r.timings.duration < 2000,
      'transaction time < 5000ms': (r) => r.timings.duration < 5000,
      'transaction time < 10s': (r) => r.timings.duration < 10000,
      'transaction time < 20s': (r) => r.timings.duration < 20000,
    });
  })

  group('helpAnswer', () => {
    const helpAnswersResponse = http.put(helpAnswers)
    check(helpAnswersResponse, {
      'status is 200': (r) => r.status === 200,
      'transaction time < 10ms': (r) => r.timings.duration < 10,
      'transaction time < 50ms': (r) => r.timings.duration < 50,
      'transaction time < 75ms': (r) => r.timings.duration < 75,
      'transaction time < 200ms': (r) => r.timings.duration < 200,
      'transaction time < 500ms': (r) => r.timings.duration < 500,
      'transaction time < 1000ms': (r) => r.timings.duration < 1000,
      'transaction time < 2000ms': (r) => r.timings.duration < 2000,
      'transaction time < 5000ms': (r) => r.timings.duration < 5000,
      'transaction time < 10s': (r) => r.timings.duration < 10000,
      'transaction time < 20s': (r) => r.timings.duration < 20000,
    });
  })
}