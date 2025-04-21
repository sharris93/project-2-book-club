import express from 'express'
import User from '../models/User.js'
import BookReview from '../models/BookReview.js'
import BookClub from '../models/BookClub.js'

const router = express.Router()

router.get('/profile', async(req, res, next) => {

    try{
// find all reviews completed by reviewer
const userReviews = await BookReview.find({reviewer:req.session.user._id})

// render the user page 

return res.render('users/profile.ejs', {
    user:req.session.user, 
    userReviews      
})
    } catch (error){
return next (error)
    }
})





export default router