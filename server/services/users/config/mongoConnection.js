const { MongoClient } = require("mongodb");

// const connectionString = "mongodb://127.0.0.1:27017";
const connectionString = process.env.MONGO_STRING

let db = null;

const mongoConnect = async () => {
  const client = new MongoClient(connectionString);

  try {
    const database = client.db("User");

    db = database;

    return database;
  } catch (err) {
    await client.close();
  }
};

const getDatabase = () => db;

module.exports = {
  mongoConnect,
  // Export getDatabase-nya
  getDatabase,
};
