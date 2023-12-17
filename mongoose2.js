const express = require("express");
const mongoose = require("mongoose");

//create express app
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/MyDatabase");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
});

const Books = mongoose.model("Book", bookSchema);

app.get("/books", async (req, res) => {
  try {
    const books = await Books.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

//post insert karna data
//middleware
app.use(express.json());

app.post("/books", async (req, res) => {
  console.log(req.body);
  try {
    const { title, author } = req.body;
    const newBook = new Books({ title, author });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
  }
});

app.put("/books/:id", async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const { title, author } = req.body;
  const updatedBook = await Books.findByIdAndUpdate(id, { title, author });
  res.json(updatedBook);
  try {
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

//delete 204-no content

app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  await Books.findByIdAndRemove(id);
  res.sendStatus(204);
});

app.listen(4000, () => {
  console.log("server running on port 4000");
});
