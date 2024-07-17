const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');



require('dotenv').config()


let PORT = process.env.PORT; 

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

const routes=require('./routes/workouts.js');


app.use((req, res, next)=>{
  console.log(req.path);
  console.log(req.method);
  next();
})

app.use('/api/workouts',routes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  app.listen(PORT, () => {
    console.log("Conected to DB and We are listening on port " + PORT + "!");
  })


})
.catch((error)=>{
  console.log(error)
})



