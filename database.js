const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "MyDatabase";

const dbConnection = async () => {
  try {
    await client.connect();
    console.log("connected sucessfully to database");
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.log("failed to connect to the database");
    throw error;
  }
};

module.exports = { dbConnection };
