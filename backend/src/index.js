/**
 * Required External Modules
 */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { clientOrigins, serverPort } = require("./config/env.dev");
const { messagesRouter } = require("./messages/messages.router");
const { userRouter } = require("./user/user");
const { userMusicLinkRouter } = require("./music/user-music-link");
const { musicRouter } = require("./music/classify-music-genre")
 
 /**
  * App Variables
  */

 const app = express();
 const apiRouter = express.Router(); //use router to use different files to link together to express
 
 /**
  *  App Configuration
  */
 //app.use is used to initalize middleware
 //middleware provides services to software app beyond the OS
 app.use(helmet());
 app.use(cors({ origin: clientOrigins }));
 app.use(express.json()); //only parse json in express app

 app.use("/api", apiRouter);
 //init all the files that you will use to run the server/all endpoints
 apiRouter.use("/messages", messagesRouter); //why do we use express.Router()
 apiRouter.use("/user", userRouter);
 apiRouter.use("/user-music", userMusicLinkRouter);
 apiRouter.use("/music", musicRouter);
 //Basically, saying that for anything that has the route "/messages," you must go to messages.router.js, which provide a set of API requests, like post, get, create, etc
 //you can have different files, and in the index, just link them to gether. for example, if you had /postcards, you would have a postcards.js file. this file would handle different api requests like get, post etc..

 //a route is a URL in a server. for the same URLs we can chain together get, post, create, etc..
//  app.route("things/cars")
//  .get((req, res) => {})
//  .post((req, res) => {})
//instead of doing this, we should make a seperate file!
 app.use(function (err, req, res, next) {
   console.log(err);
   res.status(500).send(err.message);
 });
 
 /**
  * Server Activation
  */
 
 app.listen(serverPort, () =>
   console.log(`API Server listening on port ${serverPort}`)
 );
