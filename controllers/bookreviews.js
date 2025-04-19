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

// Edit - Displays the form that allows us to submit an UPDATE request
router.get('/bookreviews/:bookreviewId/edit', async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.bookreviewId)) {
            return next()
        }
        const bookreview = await BookReview.findById(req.params.bookreviewId)

        if (!bookreview) return next()

        return res.render('bookreviews/edit.ejs', {
            bookreview: bookreview

        })
    } catch (error) {
        return next(error)
    }
})

// Show - displays a single article
router.get('/bookreviews/:bookreviewId', async (req, res,next) =>{
    try {
    if (!mongoose.isValidObjectId(req.params.bookreviewId))  {
        return next ()
    } 
    const bookreview = await BookReview.findById(req.params.bookreviewId).populate('reviewer')
    if (!bookreview) return next()

        return res.render('bookreviews/show.ejs', {
        bookreview: bookreview
        })
    }catch (error) {

    }
})

// Update - allows us to update an existing article

router.put ('/bookreviews/:bookreviewId', async (req, res) =>{
    try { 
        const bookreviewId = req.params.bookreviewId 

        if (!mongoose.isValidObjectId(bookreviewId)) {
            return next ();
        }
        const bookreview = await BookReview.findById(bookreviewId)
        if (!updatedBookReview ) return next()
        
        const updatedBookReview = await BookReview.findByIdAndUpdate(bookreviewId, req.body,
        { new:true }
        )

            return res.redirect(`/bookreviews/${bookreviewId}`);
        } catch (error) {
          console.log(error.message)
          return res.render('bookreviews/edit.ejs', {
            errorMessage: error.message,
            bookreview:req.body, 
    })
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