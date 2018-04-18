const bodyParser = require('body-parser')
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const path = require('path');
const acronymsModel = require('./models/acronyms');
const categoriesModel = require('./models/categories');

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

// GET all acronyms
app.get('/acronyms', function (req, res) {
  acronymsModel.findAcronyms({}, db, (err, result) => {
    if (err) {
      return console.log(err);
    }

    res.send(result);
  });
});

// POST a new acronym
app.post('/acronyms', function (req, res) {
  acronymsModel.acronymExists({ acronym: req.body.acronym }, db)
  .then((exists) => {
    if (exists) {
      return res.status(409).send('Duplicate acronym');
    }

    // Give the definition a unique ID
    req.body.definitions[0].id = ObjectId.createFromTime(new Date().getTime());

    acronymsModel.insertAcronym(req.body, db)
    .then((result) => {
      res.send(result);
    });
  })
  .catch((err) => {
    return console.log(err);
  });
});

// PUT to an existing acronym
app.put('/acronyms/:id', function (req, res) {
  acronymsModel.updateAcronym({_id: ObjectId.createFromHexString(req.params.id)}, {$set: req.body}, db, (err, result) => {
    if (err) {
      return console.log(err);
    }

    res.send(result);
  });
});

// GET all categories
app.get('/categories', function (req, res) {
  categoriesModel.findCategories({}, db, (err, result) => {
    if (err) {
      return console.log(err);
    }

    res.send(result);
  });
});

// POST a new category
app.post('/categories', function (req, res) {
  categoriesModel.insertCategory(req.body, db)
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    return console.log(err);
  });
});

// PUT to an existing category
app.put('/categories/:id', function (req, res) {
  categoriesModel.updateCategory({_id: ObjectId.createFromHexString(req.params.id)}, {$set: req.body}, db, (err, result) => {
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
