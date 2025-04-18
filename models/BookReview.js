import mongoose, { Schema } from 'mongoose'

// Comment Schema (child document)
const Commentschema = new mongoose.Schema ({
    content: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: "User", required: true}
},{
timestamps:true 
})


// BookReview Schema (parent document)
const BookReviewSchema = new mongoose.Schema ({
    bookName:{type: String, required: true}, 
    reviewText:{type: String, required: true}, 
    tags: [String],
    reviewer:{ type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookClub:{type: Schema.Types.ObjectId, ref: 'BookClub', required: true },
    comments: [commentschema],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
}, {
    timestamps:true
    })

const BookReview = mongoose.model('BookReview', BookReviewSchema)
export default BookReview 