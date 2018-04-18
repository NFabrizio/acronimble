const collectionName = 'categories';

module.exports.findCategories = (query, db, callback) => {
  const collection = db.collection(collectionName);

  return collection.find(query)
  .toArray(callback);
};

module.exports.insertCategory = (doc, db, callback) => {
  const collection = db.collection(collectionName);

  return collection.insertOne(doc)
  .then(callback);
};

module.exports.updateCategory = (filter, updates, db, callback) => {
  const collection = db.collection(collectionName);

  return collection.updateOne(filter, updates, callback);
};
