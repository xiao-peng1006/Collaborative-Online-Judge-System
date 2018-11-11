const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile('/app/public/index.html');
});

module.exports = router;
