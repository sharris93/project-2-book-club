import express from 'express'
import User from '../models/User.js'
import BookReview from '../models/BookReview.js'
import BookClub from '../models/BookClub.js'

const router = express.Router()

// routes 

// register form page 

router.get('/auth/register', (req,res) => {

    try { 
        return res.render('auth/register.ejs', {
            errorMessage:''
        })    
    } catch (error){
        return res.status(500).send('Server Error');

}
})



export default router