const express = require("express");
const fetch = require("node-fetch");
var AWS = require("aws-sdk");
const musicRouter = express.Router(); //mini application linked to our server

// musicRouter.get("/get-music-genre", async (req, res) => {
//     const videoId = req.query.videoId
//     console.log(videoId)

//     if(!videoId || videoId == "") {
//         return res.json("No video selected")
//     }

//     options = {
//         method: "GET",
//         headers: {
//             "x-rapidapi-key": process.env.YOUTUBE_API_KEY,
//             "x-rapidapi-host": process.env.YOUTUBE_API_HOST,
//         }
//     }

//     const rapidAPIResponse = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, options)
//     const rapidAPIData = await rapidAPIResponse.json();

//     if(rapidAPIData.status == "ok") {
//         return res.json(rapidAPIData)
//     }
//     else {
//         res.json("Error in sending rapid API data")
//     }
// });

// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// })

musicRouter.get("/get-music-genre", async (req, res) => {
    const videoId = req.query.videoId
    console.log(videoId)

    if(!videoId || videoId == "") {
        return res.json("No video selected")
    }

    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })

    var params = {
        FunctionName: 'myImageProcessingLambdaFn', /* required */
        Payload: "PAYLOAD_AS_A_STRING"
      };
      
    const result = await new AWS.Lambda().invoke(params).promise();
    console.log(result)



    options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": process.env.YOUTUBE_API_KEY,
            "x-rapidapi-host": process.env.YOUTUBE_API_HOST,
        }
    }

    // const rapidAPIResponse = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, options)
    // const rapidAPIData = await rapidAPIResponse.json();

    // if(rapidAPIData.status == "ok") {
    //     return res.json(rapidAPIData)
    // }
    // else {
    //     res.json("Error in sending rapid API data")
    // }
});

module.exports = {
    musicRouter,
  };