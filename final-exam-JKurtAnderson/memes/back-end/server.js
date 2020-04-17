const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false
}));

// Configure multer so that it will upload to '/public / images '
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 50000000
  }
});

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/memes', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const memeSchema = new mongoose.Schema({
  path: String,
  created: {
    type: Date,
    default: Date.now
  }
});

const Meme = mongoose.model('Meme', memeSchema);

// Get all memes
app.get('/api/memes', async (req, res) => {
  try {
    let memes = await Meme.find().sort({
      path: 1
    });
    res.send(memes);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error"
    });
  }
});

// Get a single meme
app.get('/api/memes/:id', async (req, res) => {
  try {
    let meme = await Meme.findOne({
      _id: req.params.id
    });
    res.send(meme);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error"
    });
  }
});

// Create a meme
app.post("/api/memes", upload.single('meme'), async (req, res) => {
  // check parameters
  if (!req.file)
    return res.status(400).send({
      message: "Must upload a file."
    });

  const meme = new Meme({
    path: "/images/" + req.file.filename,
  });
  try {
    await meme.save();
    return res.send({
      meme: meme
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
