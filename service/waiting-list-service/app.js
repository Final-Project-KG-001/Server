const express = require('express')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;
const router = require("./routes/index.js");
const connectToMongoDB = require('./helpers/mongoDB.js');
const errorHandler = require('./middlewares/errorHandler.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(connectToMongoDB)
app.use("/", router);
app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log(`Current PORT: ${PORT}`);
// });

module.exports = app