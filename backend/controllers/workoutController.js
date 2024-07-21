const Workout = require('../models/workoutModels.js')
const mongoose = require('mongoose')


const getWorkouts = async(req, res) =>{
  const user_id = req.user._id
  const workouts = await Workout.find({user_id}).sort({createdAt:-1})
  res.status(200).json(workouts)

}

const getWorkout = async(req, res) =>{
     const {id} = req.params
     
     if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: 'Not a valid id'})
     }
  
     

     const workout = await Workout.findById(id)

     if(! workout){
      return res.status(400).json({message: 'No such workout'})
     }

     res.status(200).json(workout)
}



const createWorkout = async(req, res)=>{
  const {title, load, reps} = req.body;

  let emptyFields =[]

  if(!title){
    emptyFields.push('title')
  }

  if(!load){
    emptyFields.push('load')
  }
  if(!reps){
    emptyFields.push('reps')
  }

  if(emptyFields.length>0){
    return res.status(400).json({message: "Please fill in all the fields", emptyFields })
  }

 

  try {
     const user_id = req.user._id
     const workout = await Workout.create({title, load, reps, user_id})
     res.status(200).json(workout)
  } catch (err){
     res.status(400).json({message: err.message})
  }
}


const delteWorkout = async(req, res) =>{
    const {id} = req.params

     
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: 'Not a valid id'})
     }
  
     const workout = await Workout.findOneAndDelete({_id:id})

     if(!workout){
      return res.status(400).json({message: 'No such workout to delete'})
     }

     return res.status(200).json(workout)


}

const updateWorkout = async (req, res)=>{
   const {id} = req.params

     
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({message: 'Not a valid id'})
   }

   const workout=  await Workout.findOneAndUpdate({_id:id}, 
    {
     ...req.body 
    })

    if(!workout){
      return res.status(400).json({message: 'No such workout to deletee'})
     }

     return res.status(200).json(workout)

}


module.exports= {
  createWorkout,
  getWorkout,
  getWorkouts,
  delteWorkout,
  updateWorkout
}