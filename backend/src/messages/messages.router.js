/**
 * Required External Modules and Interfaces
 */

 const express = require("express");
 const { getPublicMessage, getProtectedMessage } = require("./messages.service");
 const { checkJwt } = require("../authz/check-jwt");
 
 /**
  * Router Definition
  */

 //can also use middle ware on the router 
 //Example:

 //middleware is ONlY applied to this file!
 //NOT the app object
 //router.use(function(req, res, next) {
    // .... code
    //next()
 //})

 const messagesRouter = express.Router(); //mini application linked to our server
 //reinstantiate the router that is used in index.js
 //this deals with the endpoints /messages/public-message and /messages/protected-message
 //The route here IS /messages!. Any endpoint that we create implicitly has the root of /messages
 
 /**
  * Controller Definitions
  */
 
 // GET messages/
 
 messagesRouter.get("/public-message", (req, res) => {
   const message = getPublicMessage();
   console.log("Here")
   res.status(200).send(message);
   //res.send sends an HTTP response (back to client), can be displayed in console.
 });
 
 messagesRouter.get("/protected-message", checkJwt, (req, res) => {
   const message = getProtectedMessage();
   res.status(200).send(message);
 });
 
 module.exports = {
   messagesRouter,
 };