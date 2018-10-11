const express = require('express');

const app = express();

// Connect to mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://user01:user01@ds125293.mlab.com:25293/problems', {useNewUrlParser: true});

const restRouter = require('./routes/rest');
const indexRouter = require('./routes/index');

// app.get('/', (req, res) => {
//   res.send('Hello world from express!');
// });

app.use('/api/v1', restRouter);

app.listen(3000, () => {
  console.log('App is listening to port 3000!');
});
