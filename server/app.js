const express = require('express');
const app = express();
const apiRouter = require('./api');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');



app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
})




module.exports = app;