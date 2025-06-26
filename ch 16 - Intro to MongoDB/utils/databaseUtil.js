const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const MONGO_URL = 'mongodb+srv://root:root@priyanshu.8wr624m.mongodb.net/?retryWrites=true&w=majority&appName=Priyanshu';

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL, { autoSelectFamily: false })
    .then(client => {
      callback(client);
      _db = client.db('airbnb'); // Set the database to use
    })
    .catch(error => console.error('Error connecting to MongoDB:', error));
}

const getDB = () => {
  if (!_db) {
    throw new Error('No database found!');
  }
  return _db;
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;


// This module connects to the MongoDB database and exports a function to get the database instance.