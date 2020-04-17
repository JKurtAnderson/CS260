const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
});
const Client = mongoose.model('Client', clientSchema);

const petSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client'
  },
  name: String,
  type: String,
});
const Pet = mongoose.model('Pet', petSchema);

// setup express
const app = express();

// setup body parser middleware to conver to JSON and handle URL encoded forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/vets', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.get('/api/clients', async (req, res) => {
  try {
    let clients = await Client.find();
    res.send(clients);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/clients', async (req, res) => {
  const client = new Client({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
  });
  try {
    await client.save();
    res.send(client);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/clients/:id/pets', async (req, res) => {
  try {
    let client = await Client.findOne({
      _id: req.params.id
    });
    let pets = await Pet.find({
      client: client
    });
    res.send(pets);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/clients/:id/pets', async (req, res) => {
  let client = await Client.findOne({
    _id: req.params.id
  });
  const pet = new Pet({
    client: client,
    name: req.body.name,
    type: req.body.type,
  });
  try {
    await pet.save();
    res.send(pet);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
