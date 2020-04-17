const fs = require('fs');
const FormData = require('form-data');
const axios = require("axios");

const files = fs.readdirSync('./memes/');

files.forEach(async file => {
  try {
    let data = fs.createReadStream("./memes/" + file);
    let form = new FormData();
    form.append('meme', data);
    let response = await axios.post("http://localhost:3000/api/memes", form, {
      headers: form.getHeaders()
    });
  } catch (error) {
    console.log(error);
  }
});
