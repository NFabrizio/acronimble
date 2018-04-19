const bodyParser = require('body-parser')
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const path = require('path');
const acronymsModel = require('./models/acronyms');
const categoriesModel = require('./models/categories');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();
const port = process.env.PORT || 8080;
const url = 'mongodb://localhost:27017';
let db;
const dbName = 'acronimble';

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://nathankluth.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://nathankluth.auth0.com/`,
  algorithms: ['RS256']
});

MongoClient.connect(url, function(err, client) {
  if(err) {
    return console.log(err);
  }

  console.log("Database connected successfully to server");

  db = client.db(dbName);
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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

// GET acronym by ID
app.get('/acronyms/:id', function (req, res) {
  acronymsModel.findAcronyms({ _id: ObjectId.createFromHexString(req.params.id) }, db, (err, result) => {
    if (err) {
      return res().status(500);
    }

    if (!result.length) {
      return res.send({ message: 'Not found' }).status(404);
    }

    res.send(result[0]);
  });
});

// POST a new acronym
app.post('/acronyms', checkJwt, function (req, res) {
  acronymsModel.acronymExists({ acronym: req.body.acronym }, db)
  .then((exists) => {
    if (exists) {
      return res.status(409).send('Duplicate acronym');
    }

    // Give the definition a unique ID
    req.body.definitions[0].id = ObjectId.createFromTime(new Date().getTime());
    req.body.owner = req.user.sub;

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
app.put('/acronyms/:id', checkJwt, function (req, res) {
  acronymsModel.findAcronyms({}, db, (err, result) => {
    if (err) {
      return res.send(err).status(500);
    }

    if (result.length && result[0].owner !== req.user.sub) {
      return res.send({ message: 'Unauthorized' }).status(401);
    }

    acronymsModel.updateAcronym({_id: ObjectId.createFromHexString(req.params.id)}, {$set: req.body}, db, (err, result) => {
      if (err) {
        return res.send(err).status(500);
      }

      res.send(result);
    });
  });
});

// PUT to add a definition to an existing acronym
app.put('/acronyms/:id/definitions', function (req, res) {
  acronymsModel.updateAcronym({
    _id: ObjectId.createFromHexString(req.params.id)
  },
  {
    $push: {
      definitions: req.body
    }
  },
  db,
  (err, result) => {
    if (err) {
      return console.log(err);
    }

    res.send(result);
  });
});

// TODO: Add routes for adding and removing likes from existing acronyms

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
app.post('/categories', checkJwt, function (req, res) {
  categoriesModel.insertCategory(req.body, db)
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    return console.log(err);
  });
});

// PUT to an existing category
app.put('/categories/:id', checkJwt, function (req, res) {
  categoriesModel.updateCategory({_id: ObjectId.createFromHexString(req.params.id)}, {$set: req.body}, db, (err, result) => {
    if (err) {
      return console.log(err);
    }

    res.send(result);
  });
});

// PUT to existing definition -- like
app.put('/definitions/:id/likes', checkJwt, function (req, res) {
  acronymsModel.likeDefinition(req.params.id, req.user.sub, db, (err) => {
    if (err) {
      return res.send(err).status(500);
    }

    res.send().status(204);
  });
});

// DELETE like
app.delete('/definitions/:id/likes', checkJwt, function (req, res) {
  acronymsModel.unlikeDefinition(req.params.id, req.user.sub, db, (err) => {
    if (err) {
      return res.send(err).status(500);
    }

    res.send().status(204);
  });
});


// GET users likes/submissions
app.get('/users/:id/acronyms', checkJwt, function (req, res) {
  acronymsModel.findAcronyms({
    $or: [{ 'definitions.likes': req.params.id }, { owner: req.params.id }]
  }, db, (err, result) => {
    if (err) {
      return res.send().status(500);
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
