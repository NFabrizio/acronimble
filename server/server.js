const bodyParser = require('body-parser')
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectIdParse = require('mongodb').ObjectID;
const path = require('path');
const acronymsModel = require('./models/acronyms');

const app = express();
const port = process.env.PORT || 8080;
const url = 'mongodb://localhost:27017';
let db;
const dbName = 'acronimble';

MongoClient.connect(url, function(err, client) {
  if(err) {
    return console.log(err);
  }

  console.log("Database connected successfully to server");

  db = client.db(dbName);
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/acronyms', function (req, res) {
  acronymsModel.findAcronyms({}, db, (err, result) => {
    if (err) {
      return console.log(err);
    }

    res.send(result);
  });
});

app.post('/acronyms', function (req, res) {
  acronymsModel.insertAcronym(req.body, db, (err, result) => {
    if (err) {
      return console.log(err);
    }

    res.send(result);
  });
});

app.put('/acronyms/:id', function (req, res) {
  acronymsModel.updateAcronym({_id: ObjectIdParse.createFromHexString(req.params.id)}, {$set: req.body}, db, (err, result) => {
    if (err) {
      return console.log(err);
    }

    res.send(result);
  });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
 console.log(`AcroNimble server running on port ${port}`);
});
