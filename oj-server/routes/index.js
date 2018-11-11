const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile('../public/index.html', {root: path.dirname(__dirname)}); // Avoid going above the root in Heroku
});

module.exports = router;
