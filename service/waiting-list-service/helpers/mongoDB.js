const { MongoClient } = require("mongodb");

async function connectToMongoDB(req, res, next) {
  const uri = "mongodb://localhost:27017/";
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();

    const database = client.db("final-project-server");

    const userCollection = database.collection("users",);
    const appointmentCollection = database.collection("appointments");
    const doctorCollection = database.collection("doctors");
    const dentalCollection = database.collection("dentals");
    const generalCollection = database.collection("generals");

    req.userCollection = userCollection;
    req.appointmentCollection = appointmentCollection;
    req.doctorCollection = doctorCollection;
    req.dentalCollection = dentalCollection;
    req.generalCollection = generalCollection;

    next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToMongoDB;
