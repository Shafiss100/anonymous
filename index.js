const { MongoClient, ServerApiVersion } = require("mongodb");
var express = require("express");
var cors = require("cors");
var app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is start anonymus");
});

const uri =
  "mongodb+srv://anonymous:2Jm9Mn3oCaY0AkSf@cluster0.vc2va.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  // client.close();
});
async function run() {
  try {
    const textCollection = client.db("textCollection").collection("alltext");
    app.get("/alltext", async (req, res) => {
      const result = await textCollection.find({}).toArray();
      if (result.length >10) {
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
