const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  }
}
)

userSchema.statics.signup = async function(email, password){
  
  //validation

  if(!email || !password){
    throw Error('All params not sent')
  }

  if(!validator.isEmail(email)){
    throw Error('Email is not valid')
  }
 
  if(!validator.isStrongPassword(password)){
    throw Error('password is not strong')
  }

  const exists = await this.findOne({email})
  if (exists){
    throw Error('Email already in use')
  } 

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({email, password : hash})

  return user

}


userSchema.statics.login = async function(email, password){
  if(!email || !password){
    throw Error('All params not sent')
  }

  const user = await this.findOne({email})
  if (!user){
    throw Error('No such email exists')
  } 

  const match = await bcrypt.compare(password, user.password)

  if(!match){
    throw Error('Incorrect password')
  }

  return user


}

module.exports = mongoose.model('User', userSchema)//object
