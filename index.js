const express = require("express");
const app = express();
const { dbConnection } = require("./database");

app.get("/", async (req, res) => {
  try {
    const db = await dbConnection();
    const collection = db.collection("Users");
    const Users = await collection.find().toArray();
    res.json(Users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//post request

app.use(express.json());

app.post("/users", async (req, res) => {
  console.log(req.body);
  const db = await dbConnection();
  const collection = db.collection("Users"); // Use consistent casing for the collection name
  const result = await collection.insertOne(req.body); // Await the insert operation
  res.json("updated");
});

//put request
app.put("/users/:name", async (req, res) => {
  console.log(req.params);
  const db = await dbConnection();
  const collection = db.collection("users");
  let singleData = collection.updateOne(
    { name: req.params.name },
    { $set: req.body }
  );
  res.json("Put updated");
});

//delete request
app.delete("/users/:name", async (req, res) => {
  const db = await dbConnection();
  const collection = db.collection("users");
  const userName = req.params.name;
  collection.deleteOne({ name: userName });
  res.send("deleted");
});

app.listen(3000);
