const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const problemService = require('../services/problemService');

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

// Edit a existing problem
router.put('/problems/:id', jsonParser, (req, res) => {
    const id = req.params.id;
    problemService.editProblem(req.params.id, req.body)
      .then(problem => {
        res.json(problem)
      }, error => {
        res.status(400).send(error);
      })
});

module.exports = router;
