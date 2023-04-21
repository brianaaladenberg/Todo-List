import express from "express";
import mongoose from "mongoose";
import PostMessage from "./models/postMessage.js";
const app = express();
const router = express.Router();

router.post("/form", async(req, res) => {
  // prints the recieved data to the console
  console.log(
    `Received form data: name=${req.body.name}`
  );
  // creates the object to send to the database
  const newEntry = new PostMessage({
    name: req.body.name,
  });
    // inputs the object into the database
  PostMessage.collection.insertOne(newEntry);
  
  // Send a response back to the client
  res.json({ message: "Form submission successful!" });
});


router.post("/delete", async(req, res) => {
    console.log('deleting');
    console.log(req.body._id);
  
    // finds the object by its id and deletes it
    await PostMessage.findByIdAndDelete(req.body._id);
    console.log('deleted');
    res.json({ message: "deletion successful!" });
});

router.post("/edit", async(req, res) => {
  console.log('editing');
  console.log(req.body._id+"  "+req.body.item);

  // finds the object by its id and deletes it
  await PostMessage.findByIdAndUpdate(req.body._id,{'name':req.body.item});
  console.log('edited');
  res.json({ message: "edit successful!" });
});

// // gets the objects in the database
router.get("/todo", async(req, res) => {
    const allItems = await PostMessage.find().exec();
    res.json(allItems);
});
  
export default router;