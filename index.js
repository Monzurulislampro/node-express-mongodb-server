const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000
const mongoose = require("mongoose");

// Import the mongoose module
app.use(cors());
app.use(express.json());
const mongoDB = "mongodb://127.0.0.1/my_database";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true },
  (error)=>{
    if (!error){
        console.log(mongoDB)
    }else{
        console.log("datbase not connected")
    }
  }  );
const sch ={
    name: String,
    email: String,
    id: Number,
    jobStatus: String
}
const monmodel= mongoose.model("NEWCOL", sch);
app.post('/test', async(req, res)=>{
    console.log("inside post function");
    const data = new monmodel({
        name: req.body.jame,
        email: req.body.email,
        id: req.body.id,
        jobStatus: req.body.job
    });
    const value = await data.save();
    res.send(data);
    console.log(data)
});
app.get('/post', function (req, res) {
    let posts = monmodel.find({}, function(err, posts){
        if(err){
            console.log(err);
        }
        else {
            res.json(posts);
        }
    });
});
app.get('/', (req, res) => res.send(`Hello World!`))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))