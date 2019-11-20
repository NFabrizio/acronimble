const collectionName = 'acronyms';

module.exports.findAcronyms = (query, db, callback) => {
  const collection = db.collection(collectionName);

  return collection.find(query)
  .toArray(callback);
};

module.exports.insertAcronym = (doc, db, callback) => {
  const collection = db.collection(collectionName);

  return collection.insertOne(doc)
  .then(callback);
};

module.exports.updateAcronym = (filter, updates, db, callback) => {
  const collection = db.collection(collectionName);

  return collection.updateOne(filter, updates, callback);
};

module.exports.acronymExists = (query, db) => {
  const collection = db.collection(collectionName);

  return collection.findOne(query)
  .then((result) => {
    if(result && Object.keys(result).length > 0 && result.constructor === Object) {
      return result;
    };

    return null;
  });
};

module.exports.definitionUpdate = (definitionId, doc, db, callback) => {
  const collection = db.collection(collectionName);
  // const userCollection = db.collection('users');

  return collection.updateOne({ 'definitions.id': definitionId }, {
    $set: { 'definitions.$': doc }
  }, (err) => {
    if (err) {
      return callback(err);
    }
    callback(null);

    // userCollection.update({ userId }, { $addToSet: { likes: definitionId } }, { upsert: true }, callback);
  });
}

module.exports.likeDefinition = (definitionId, userId, db, callback) => {
  const collection = db.collection(collectionName);
  const userCollection = db.collection('users');

  return collection.updateOne({ 'definitions.id': definitionId }, {
    $addToSet: { 'definitions.$.likes': userId }
  }, (err) => {
    if (err) {
      return callback(err);
    }

    userCollection.update({ userId }, { $addToSet: { likes: definitionId } }, { upsert: true }, callback);
  });
}

module.exports.unlikeDefinition = (definitionId, userId, db, callback) => {
  const collection = db.collection(collectionName);
  const userCollection = db.collection('users');

  return collection.updateOne({ 'definitions.id': definitionId }, {
    $pull: { 'definitions.$.likes': userId }
  }, (err) => {
    if (err) {
      return callback(err);
    }

    userCollection.update({ userId }, { $pull: { likes: definitionId } }, { upsert: true }, callback);
  });
}
