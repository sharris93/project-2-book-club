import mongoose from 'mongoose'
import express from 'express'
import User from '../models/User.js'
import BookReview from '../models/BookReview.js'
import BookClub from '../models/BookClub.js'

const router = express.Router()

// ! Routes that render a web page

// Index - get all reviews

// router.get('/')

// New - display the form that allows users to submit a create request 
router.get('/bookreviews/new', (req, res)=>{
    try{
return res.render('bookreviews/new.ejs')
    } catch (error) {
        console.log(error)
    }
})



// ! Routes that DO NOT render a web page
// Create - create a new bookreview
router.post('/bookreviews', async (req, res) => {
    try {
        // req.body.reviewer  = req.session.user._id
        const newBookReview = await BookReview.create(req.body)
        return res.redirect(`/bookreviews/${newBookReview._id}`)
    } catch (error) {
    console.log(error.message)
    return res.render ('bookreviews/new.ejs', {
        errorMessage: error.message
    })
    }
})




export default router