const express = require('express');

const app = express();

// Connect to mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://xiaopeng:mfp2m6ea@ds125293.mlab.com:25293/problems');

const restRouter = require('./routes/rest');

// app.get('/', (req, res) => {
//   res.send('Hello world from express!');
// });

app.use('/api/v1', restRouter);

app.listen(3000, () => {
  console.log('App is listening to port 3000!');
});
