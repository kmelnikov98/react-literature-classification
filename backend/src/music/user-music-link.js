const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const { checkJwt } = require("../authz/check-jwt");

const userMusicLinkRouter = express.Router();
const uri =`mongodb+srv://${process.env.MONGO_DB_CLIENT_INFO}@cluster0.7wgin9t.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const userMusicCollection = client.db("user").collection("user-music-link");

userMusicLinkRouter.get('/get-user-music', checkJwt, async (req, res) => {
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

userMusicLinkRouter.put('/update-user-music', checkJwt, async (req, res) => {
    console.log(req.body.userId)
    console.log(req.body.videoId)
    console.log(req.body.genre)

    const query = { userId: req.body.userId, videoId: req.body.videoId }
    try {
        userMusicCollection.updateMany(query, {
             $set: {
                musicGenre: req.body.genre
             }
        })
        console.log("Completed music genre transfer")
        res.status(200).send("Successfully updated with the music genre")
    }
    catch {
        res.status(500).send("Failed to grab user music data")
    }
})

module.exports = {
    userMusicLinkRouter,
  };
