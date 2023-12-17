const express = require("express");
const app = express();
const { dbConnection } = require("./database");

app.get("/", async (req, res) => {
  try {
    const db = await dbConnection();
    const collection = db.collection("users");
    const users = await collection.find().toArray();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//post request
//for insertion of new documents

app.use(express.json()); //before declearling this req.body is coming
//undefined

app.post("/users", async (req, res) => {
  console.log(req.body);
  const db = await dbConnection();
  const collection = db.collection("users"); // Use consistent casing for the collection name
  const result = await collection.insertOne(req.body); // Await the insert operation
  res.json("updated");
});

//put request for updating existing documents
app.put("/users/:name", async (req, res) => {
  console.log(req.params);
  const db = await dbConnection();
  const collection = db.collection("users");
  let singleData = await collection.updateOne(
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
  await collection.deleteOne({ name: userName });
  res.send("deleted");
});

app.listen(3000);
