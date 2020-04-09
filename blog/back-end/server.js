const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// Create a scheme for posts
const itemSchema = new mongoose.Schema({
  title: String,
  post: String,
  date: String,
  edited: String
});

// Create a model for items Posts.
const Item = mongoose.model('Item', itemSchema);

// Create a scheme for comments
const commentSchema = new mongoose.Schema({
  post: String,
  comment: String,
  date: String,
  name: String
});

// Create a model for comments.
const Comment = mongoose.model('Comment', commentSchema);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


// connect to the database
mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true
});

const getDate = function() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  return today;
}

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/posts', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    post: req.body.post,
    date: getDate(),
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Create a new comment
app.post('/api/comments', async (req, res) => {
  const comment = new Comment({
    post: req.body.post,
    comment: req.body.comment,
    name: req.body.name,
    date: getDate(),
  });
  try {
    await comment.save();
    res.send(comment);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/posts', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all comments for a post
app.get('/api/comments/:post', async (req, res) => {
  try {
    let comments = await Comment.find({ post: req.params.post });
    res.send(comments);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/comments/:id', async (req, res) => {
  try {
    await Comment.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const item = await Item.findOne({
      _id: req.params.id
    });
    item.title = req.body.title;
    item.post = req.body.post;
    item.edited = getDate();
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
