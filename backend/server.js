const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');



require('dotenv').config()


let PORT = process.env.PORT; 

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

const routes=require('./routes/workouts.js');

const userRoutes=require('./routes/user.js');


app.use((req, res, next)=>{
  console.log(req.path);
  console.log(req.method);
  next();
})

app.use('/api/workouts',routes);

app.use('/api/user',userRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  app.listen(PORT, () => {
    console.log("Conected to DaB emand We are lfistening on port " + PORT + "!");
  })


})
.catch((error)=>{
  console.log(error)
})



