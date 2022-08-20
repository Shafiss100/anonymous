const { MongoClient, ServerApiVersion } = require("mongodb");
var express = require("express");
var app = express();
var cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
require("dotenv").config();



const uri =
  "mongodb+srv://anonymous:2Jm9Mn3oCaY0AkSf@cluster0.vc2va.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const textCollection = client.db("textCollection").collection("alltext");

    app.get("/alltext", async (req, res) => {
      const result = await textCollection.find({}).toArray();
      if (result.length >14) {
        const text = result[0].text
        const delet= await textCollection.deleteOne({text:text})
      }
      res.send(result);
    });

    app.post("/post", async (req, res) => {
      const doc = req.body;
      console.log(doc);
      const result = await textCollection.insertOne(doc);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is start anonymus");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
