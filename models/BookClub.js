import mongoose, { Schema } from 'mongoose'

const BookClubSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    members: [{type: Schema.Types.ObjectId, ref: "User", required: true}],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User'} 
}, {
timestamps: true 
})

const BookClub = mongoose.model('BookClub', BookClubSchema)
export default BookClub 