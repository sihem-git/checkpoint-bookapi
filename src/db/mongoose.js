const mongoose = require('mongoose')

// ***** CONFIG .ENV *****

require('dotenv').config()
const MONGODB_URL = `mongodb://${process.env.DB_HOST}:
${process.env.DB_PORT}/${process.env.DB_NAME}`

mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(
  res => console.log(` Mongodb Connected .....`),
  err => console.error(`Something went wrong: ${err}`),
);