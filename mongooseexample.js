const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const UserModel = mongoose.model("users", UserSchema);

const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/MyDatabase");
  console.log("connected to Mongodb");

  const newData = new UserModel({
    name: "john",
    age: 25,
  });

  await newData.save();
  console.log("Data added sucessfully");
};
