const express = require("express");
const fetch = require("node-fetch");
var AWS = require("aws-sdk");
const fs = require("fs")
const stream = require('stream');
const musicRouter = express.Router(); //mini application linked to our server

musicRouter.get("/get-music-genre", async (req, res) => {
    const videoId = req.query.videoId
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
        data.pipe(passtrough)

        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        })

        const upload = new AWS.S3.ManagedUpload({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            params: {
            Bucket: process.env.WAV_FILE_UPLOADS_BUCKET,
            Key: `${videoId}.mp3`,
            Body: passtrough
          },
          partSize: 1024 * 1024 * 64 // 64 MB in bytes
        });
        upload.send((err) => {
          if (err) {
            console.log('error', err);
          } else {
            console.log('done');
          }
        });
    })
    res.send("ok")
});



// musicRouter.get("/get-music-genre", async (req, res) => {
//     const videoId = req.query.videoId
//     console.log(videoId)

//     if(!videoId || videoId == "") {
//         return res.json("No video selected")
//     }

//     AWS.config.update({
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//     })

//     var params = {
//         FunctionName: 'classify-music-genre-lambda', /* required */
//         Payload: ""
//       };
      
//     const result = await new AWS.Lambda().invoke(params).promise();
//     console.log(result)
// });

module.exports = {
    musicRouter,
  };