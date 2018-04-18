const collectionName = 'acronyms';

module.exports.findAcronyms = (query, db, callback) => {
  const collection = db.collection(collectionName);

  collection.find(query)
  .toArray(callback);
};

module.exports.insertAcronym = (doc, db, callback) => {
  const collection = db.collection(collectionName);

  collection.insertOne(doc, callback);
};

module.exports.updateAcronym = (filter, updates, db, callback) => {
  const collection = db.collection(collectionName);

  collection.updateOne(filter, updates, callback);
};
