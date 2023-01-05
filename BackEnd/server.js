const express = require('express')
const app = express()
const port = 4000
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

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

const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));



const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://admin:eiAvtRgc6Y7@lab7.gy88bru.mongodb.net/test');
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

const gameSchema = new mongoose.Schema({
  title: String,
  cover: String,
  developer: String,
  genre: String,
  desc: String
});

const gameModel = mongoose.model('Games', gameSchema);

app.post('/api/games',(req,res)=>{
  console.log(req.body);

  gameModel.create({
    title: req.body.title,
    cover:req.body.cover,
    developer:req.body.developer,
    genre:req.body.genre,
    desc:req.body.desc
  })
  
  res.send('Data Recieved');
})

app.get('/api/games', (req, res) => {
  gameModel.find((error, data)=>{
    res.json(data);
  })
})

app.get('/api/game/:id', (req, res)=>{
  console.log(req.params.id);
  gameModel.findById(req.params.id,(error,data)=>{
    res.json(data);
  })
})

app.put('/api/game/:id', (req, res)=>{
  console.log("Update: "+req.params.id);

  gameModel.findByIdAndUpdate(req.params.id, req.body, {new:true},
    (error,data)=>{
      res.send(data);
    })
})

app.delete('/api/game/:id',(req, res)=>{
  console.log('Deleting: '+req.params.id);
  gameModel.findByIdAndDelete({_id:req.params.id},(error,data)=>{
    res.send(data);
  })
})

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../build/index.html'));
  });



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})