const { MongoClient } = require("mongodb");

async function connectToMongoDB(req, res, next) {
  const uri = "mongodb://localhost:27017/";
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();

    const database = client.db("final-project-server");
    // const collection = database.collection("");

    // req.collection = collection;
    next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToMongoDB;
