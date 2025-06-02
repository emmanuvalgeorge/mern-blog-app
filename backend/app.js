const express = require('express')
const mongoose = require('mongoose');
const Blog = require('./models/blog'); 
const cors = require('cors');

const app = express()
const port = 3000

app.use(express.json());
app.use(cors());
require('dotenv').config()
console.log(process.env.MONGODB_URL)

main()
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})