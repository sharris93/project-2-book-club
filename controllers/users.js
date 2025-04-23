import express from 'express'
import User from '../models/User.js'
import BookReview from '../models/BookReview.js'
import BookClub from '../models/BookClub.js'
import isLoggedIn from '../middleware/isLoggedIn.js'

const router = express.Router()

router.get('/profile', isLoggedIn,  async(req, res, next) => {
    try{
// find all reviews completed by reviewer
const userReviews = await BookReview.find({reviewer:req.session.user._id})
// get their book club info 

const user = await User.findById(req.session.user._id).populate('bookClub')
// render the user page 

return res.render('users/profile.ejs', {
    user,
    userReviews,
})
    } catch (error){
return next (error)
    }
})

export default router