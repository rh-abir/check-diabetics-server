const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://check-diabetics:kxPq7sJxksh5tVHb@cluster0.nhx90uc.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const database = client.db("usersDB");
    const userCollection = database.collection("users");

    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log("new user", user);

      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.json("Hello worlds");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
