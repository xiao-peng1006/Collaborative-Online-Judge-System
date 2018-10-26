const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const problemService = require('../services/problemService');

const nodeRestClinet = require('node-rest-client').Client;

const restClient = new nodeRestClinet();


// executor
EXECUTOR_SERVER_URL = 'http://executor/build_and_run';

restClient.registerMethod('build_and_run', EXECUTOR_SERVER_URL, 'POST');

// Get all problems
router.get('/problems', (req, res) => {
  problemService.getProblems()
    .then(problems => res.json(problems));
});

// Get a single problem by id
router.get('/problems/:id', (req, res) => {
  const id = req.params.id;
  problemService.getProblem(+id)
    .then(problem => res.json(problem));
});

// Add a new problem
router.post('/problems', jsonParser, (req, res) => {
  problemService.addProblem(req.body)
    .then(problem => {
      res.json(problem)
    }, error => {
      res.status(400).send('Problem name already exists!');
    });
});

// req = requst from oj-client, res = response to oj-client
router.post('/build_and_run', jsonParser, (req, res) => {
  const code = req.body.code;
  const lang = req.body.lang;

  console.log('lang: ', lang, 'code: ', code);

  // API on executor
  restClient.methods.build_and_run(
    {
      data: {code: code, lang: lang},
      headers: {'Content-Type': 'application/json'}
    },
    (data, response) => {
      const text = `Build output: ${data['build']}, execute output: ${data['run']}`;
      // Packaged the result from executor and send back to oj-client
      res.json(text);
    }
  )
});

module.exports = router;
