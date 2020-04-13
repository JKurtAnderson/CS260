const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const photos = require("./photos.js");
const Photo = photos.model;

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  photo: {
    type: mongoose.Schema.ObjectId,
    ref: 'Photo'
  },
  comment: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Comment = mongoose.model('Comment', commentSchema);

// upload comment
router.post("/", validUser, async (req, res) => {
  // check parameters
  if (!req.body.comment)
    return res.status(400).send({
      message: "Must upload a comment."
    });

  const comment = new Comment({
    user: req.user,
    photo: req.body.photo,
    comment: req.body.comment,
  });
  try {
    await comment.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my comments
router.get("/:id", async (req, res) => {
  // return photos
  try {
    let comments = await Comment.find({
      photo: req.params.id
    }).sort({
      created: 1
    }).populate('user').populate('photo');
    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Comment,
  routes: router,
}
