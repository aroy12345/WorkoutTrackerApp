const express = require('express')
const {createWorkout, getWorkout, getWorkouts, delteWorkout, updateWorkout} = require("../controllers/workoutController.js")


const router = express.Router()





router.get('/', getWorkouts);



router.get('/:id', getWorkout);


router.post('/', createWorkout)

router.delete('/:id', delteWorkout);


router.patch('/:id', updateWorkout);




module.exports = router