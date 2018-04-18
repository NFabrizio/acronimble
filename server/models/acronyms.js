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
