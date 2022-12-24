const express = require("express");
const fetch = require("node-fetch");
var AWS = require("aws-sdk");
const stream = require('stream');
var getYoutubeTitle = require('get-youtube-title');
const { MongoClient, ServerApiVersion } = require('mongodb');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const { runMusicClassifyScript } = require("./run-classification-script");
const musicRouter = express.Router(); //mini application linked to our server

const uri =`mongodb+srv://${process.env.MONGO_DB_CLIENT_INFO}@cluster0.7wgin9t.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

musicRouter.post("/post-music", async (req, res) => {
    const videoId = req.body.videoId
    console.log(videoId)

    if(!videoId || videoId == "") {
        return res.json("No video selected")
    }

    options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": process.env.YOUTUBE_API_KEY,
            "x-rapidapi-host": process.env.YOUTUBE_API_HOST,
        }
    }
    
    const rapidAPIResponse = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, options)
    const rapidAPIData = await rapidAPIResponse.json();

    if(rapidAPIData.status != "ok") {
        return res.json("Error in sending rapid API data")
    }

    console.log(rapidAPIData)
    await fetch(rapidAPIData.link)
    .then((response) => {
        const data = response.body
        // const readableStream = fs.createReadStream(response.body);
        const passtrough = new stream.PassThrough();
        var command = ffmpeg(data)
        .inputFormat('mp3')
        .audioCodec('pcm_s16le')
        .format('wav')
        .pipe(passtrough)

        const upload = new AWS.S3.ManagedUpload({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            params: {
            Bucket: process.env.WAV_FILE_UPLOADS_BUCKET,
            Key: `${videoId}.wav`,
            Body: passtrough
          },
          partSize: 1024 * 1024 * 64 // 64 MB in bytes
        });
        upload.send(async (err) => {
          if (err) {
            console.log('error uploading file', err);
            res.status(401).send('Failed to get music info')
          } else {
            console.log('done uploading file');
            const userMusicCollection = client.db("user").collection("user-music-link");

            if(req.body.userId) {
              userMusicCollection.insertOne(req.body)
              .then(result => {
                  console.log("Successfully stored user with video link")
                  //res.redirect('/') //send a response back; in thisc ase, we dont want to send anything so redirect back to origin
                  console.log(result)
              })
            }

            res.status(200).send('successfully uploaded file data')
  
          }
        })
    })
   
});

musicRouter.get("/get-music-genre", async (req, res) => {
  const videoId = req.query.videoId

  if(!videoId || videoId == "") {
      return res.json("No video selected")
  }

  let result = ""
  try {
    result = await runMusicClassifyScript(videoId);
    console.log(result)
  }
  catch(error) {
    console.log(error)
  }
  console.log("classification complete")
  const musicGenre = { genre: result }
  res.status(200).send(musicGenre)

});


musicRouter.get("/get-music-title", async (req, res) => {
  const videoId = req.query.videoId

  if(!videoId || videoId == "") {
      return res.json("No video selected")
  }

  const options = {
    method: 'GET',
    headers: {
      "x-rapidapi-key": process.env.YOUTUBE_API_VIDEO_INFO_KEY,
      "x-rapidapi-host": process.env.YOUTUBE_API_VIDEO_INFO_HOST,
    }
  };
  try {
    const rapidAPIResponse = await fetch(`https://youtube-video-info.p.rapidapi.com/video_formats?video=${videoId}`, options)
    const rapidAPIData = await rapidAPIResponse.json();
    const videoInfo = {videoTitle: rapidAPIData.VideoTitle}
    res.status(200).send(videoInfo)
  }
  catch(error) {
    console.log(error)
    res.status(500)
  }
 
});

module.exports = {
    musicRouter,
  };