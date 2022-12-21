const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');

const userMusicLinkRouter = express.Router();
const uri =`mongodb+srv://${process.env.MONGO_DB_CLIENT_INFO}@cluster0.7wgin9t.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const userMusicCollection = client.db("user").collection("user-music-link");

userMusicLinkRouter.get('/get-user-music', async (req, res) => {
    console.log(req.query.userId)
    // find one field with the name John
    const query = { userId: req.query.userId}
    
    try {
        const cursor = userMusicCollection.find(query)
        let result = []

        await cursor.forEach(item => result.push(item));
        console.log(result)
        res.status(200).send(result)
    }
    catch {
        res.status(500).send("Failed to grab user music data")
    }
   


})

module.exports = {
    userMusicLinkRouter,
  };
