const express = require('express');
const app = express();
var path = require('path');
var bodyParser = require('body-parser');
// app.use(express.static(path.join(__dirname, 'build')));
var cors = require('cors');
// app.use(express.json({ extended: false }));

// app.use(cors);

app.use('/api/data', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/data', require('./router'));

var dataController = require('./dataController');

const port = 3002;

// app.get('/api/data', dataController.getData);

app.listen(process.env.PORT || port);
