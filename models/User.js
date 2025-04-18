import mongoose from 'mongoose'
// import BookClub from './BookClub'


const userSchema = new mongoose.Schema({
email:{type: String, required: true, unique: true}, 
name:{type: String, required: true}, 
password:{type: String, required: true},
bookClub: { type: mongoose.Schema.Types.ObjectId, ref: 'BookClub'} 

})
const User = mongoose.model('User', userSchema)
export default User