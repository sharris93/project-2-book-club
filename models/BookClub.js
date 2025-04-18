import mongoose, { Schema } from 'mongoose'

const BookClubSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: "User", required: true}

}, {
timestamps: true 
})

const BookClub = mongoose.model('BookClub', BookClubSchema)
export default BookClub 