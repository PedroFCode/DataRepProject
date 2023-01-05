const express = require('express')
const app = express()
const port = 4000
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//Imports cors - mainly used to allow access to mongoose as it was causing errors
const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse application/json
app.use(bodyParser.json())

//importing path to easily find directories
const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));


//imports mongoose - to connect to databse on mongo atlas
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://admin:eiAvtRgc6Y7@lab7.gy88bru.mongodb.net/test');
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

//schema for game database
const gameSchema = new mongoose.Schema({
  title: String,
  cover: String,
  developer: String,
  genre: String,
  desc: String
});

//object used to interact with database
const gameModel = mongoose.model('Games', gameSchema);

//url for games database
app.post('/api/games',(req,res)=>{
  console.log(req.body);

  //creates object to put in the database
  gameModel.create({
    title: req.body.title,
    cover:req.body.cover,
    developer:req.body.developer,
    genre:req.body.genre,
    desc:req.body.desc
  })
  
  res.send('Data Recieved');
})

//getter for games in datavase
app.get('/api/games', (req, res) => {
  gameModel.find((error, data)=>{
    res.json(data);
  })
})

//gets game id for display
app.get('/api/game/:id', (req, res)=>{
  console.log(req.params.id);
  gameModel.findById(req.params.id,(error,data)=>{
    res.json(data);
  })
})

//updates a game in the database
app.put('/api/game/:id', (req, res)=>{
  console.log("Update: "+req.params.id);

  gameModel.findByIdAndUpdate(req.params.id, req.body, {new:true},
    (error,data)=>{
      res.send(data);
    })
})

//deletes a game in the database
app.delete('/api/game/:id',(req, res)=>{
  console.log('Deleting: '+req.params.id);
  gameModel.findByIdAndDelete({_id:req.params.id},(error,data)=>{
    res.send(data);
  })
})

//gets the file path and merges with build
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../build/index.html'));
  });


//Shows the user the port the server is on
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})