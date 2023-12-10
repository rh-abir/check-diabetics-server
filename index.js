const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    app.post("/api/create-user", async (req, res) => {
      const user = req.body;
      console.log("new user", user);

      const result = await userCollection.insertOne(user);
      res.status(200).json({
        message: "create successfull",
        result,
      });
    });

    //put data in db
    app.put("/api/gender/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const putGender = req.body;
      // console.log(putGender, id)

      const gender = {
        $set: {
          gender: putGender?.selectedGender,
        },
      };

      const result = await userCollection.updateOne(filter, gender, options);

      res.status(200).json({
        message: "create successfull",
        result,
      });
    });

    //put age data in db
    app.put("/api/age/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const putAge = req.body;
      console.log(putAge, id)

      const age = {
        $set: {
          age: putAge?.inputValue,
        },
      };

      const result = await userCollection.updateOne(filter, age, options);

      res.status(200).json({
        message: "create successfull",
        result,
      });
    });


    //put sugarlavel data in db
    app.put("/api/age/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const putAge = req.body;
      console.log(putAge, id)

      const age = {
        $set: {
          age: putAge?.inputValue,
        },
      };

      const result = await userCollection.updateOne(filter, age, options);

      res.status(200).json({
        message: "create successfull",
        result,
      });
    });

    app.get("/user", async (req, res) => {
      const result = await userCollection
        .find()
        .sort({ _id: -1 })
        .limit(1)
        .toArray();

      res.send(result[0]);
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
