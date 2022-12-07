const express = require("express");

const musicRouter = express.Router(); //mini application linked to our server


messagesRouter.get("/get-music-genre", (req, res) => {
    const videoId = req.body.videoInfo.videoId;
    if(!videoId || videoId == "") {
        return res.json("No video selected")
    }
    console.log(videoId);


});

module.exports = {
    musicRouter,
  };