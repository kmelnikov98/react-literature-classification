const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
// const bodyParser = require('body-parser');
// const path = require("path");

const userRouter = express.Router();
const uri =`mongodb+srv://${process.env.MONGO_DB_CLIENT_INFO}@cluster0.7wgin9t.mongodb.net/?retryWrites=true&w=majority`;

/* Ensure any requests prefixed with /static will serve our "frontend/static" directory */
// userRouter.set('view engine', 'ejs')
// userRouter.use(bodyParser.urlencoded({ extended: true }))
// userRouter.use(bodyParser.json())
// userRouter.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    // perform actions on the collection object
});

const userCollection = client.db("user").collection("user-info-collection");

userRouter.post('/add-user', (req, res) => {
    if(userCollection.findOne({ sub: req.body.sub })) { // if element already exists, then don't add it
        console.log("User already exist")
        return res.json(401)
    }

    userCollection.insertOne(req.body)
    .then(result => {
        res.json(200)
        //res.redirect('/') //send a response back; in thisc ase, we dont want to send anything so redirect back to origin
        console.log(result)
    })
    .catch(error => console.log(error))
})

userRouter.put('/update-user', (req, res) => {
    console.log(req.body)
    // find one field with the name John
     userCollection.findOneAndUpdate(
        { name: 'John'}, //filter search by
        { sub: req.body.sub}, //filter search by
        { //update field 
            $set: {
                name: req.body.name,
                quote: req.body.quote,
            }
        },
    ).then(result => {
        res.json("Success") //send success message back to frontend javascript.
    }).catch(error => console.error(error))
})


userRouter.delete('/delete-user', (req, res) => {
    // Handle delete event here
    userCollection.findOneAndDelete( //no options needed - just add the filter
        { name: 'Darth Vader' })
        .then(result => { //if successful
            console.log(result.deletedCount)
            if (result.deletedCount === 0) { //if no values deleted/found
                console.log("here")
                return res.json('No quote to delete')
            }
            res.json(`Deleted Darth Vader's quote`)  
        })
        .catch(error => console.error(error))
})


/* Redirect all routes to our (soon to exist) "index.html" file */
/* Hypothetically, the .get response should be from a seperate url. Right now, its using the homepage ('/') to do both iteration through backend
db and also to set a new file on the frontend, the index.html  */
// userRouter.get("/*", (req, res) => {
//     //.find() returns a cursor to the db that one can iterate over
//     //res.sendFile(path.resolve("frontend", "index.html"));
//     backendCollection.find().toArray()
//     .then(results => {
//         console.log(results)
//         res.render('index.ejs', {quotes: results})
//     })
//     .catch(error => console.log(error))
// })

client.close();

module.exports = {
    userRouter,
  };
