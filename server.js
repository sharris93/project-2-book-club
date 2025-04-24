import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'
import methodOverride from 'method-override'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passUserToView from './middleware/passUserToView.js'
import passErrorToView from './middleware/passErrorToView.js'

// Variables

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true })) 
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL
  })
}))
app.use(passUserToView)
app.use(passErrorToView)
app.use('/', bookReviewsRouter)
app.use('/', authController)
app.use('/', userRouter)
app.use(express.static('public'))


import bookReviewsRouter from './controllers/Bookreviews.js'
import authController from './controllers/auth.js'
import userRouter from './controllers/users.js'





// Routes
// Home page
app.get('/', (req,res) => {
return res.render('index.ejs', {

})
})


// //  bookreview actions - new show update delete  
// app.get('/', (req,res) => {
//     return  res.render('new.ejs')
//     })


// ! Listen
async function startServers(){
    try {
      // Connect to MongoDB
      await mongoose.connect(process.env.DATABASE_URL)
      console.log(`🔒 Database connection established`)
    // Connect the Express Server
    app.listen(port, () => console.log(`🚀 Server up and running on port ${port}`))
} catch (error) {
  console.log(error)
}
}
startServers()



// test 
// these imports may be needed 
import User from './models/User.js'
import BookClub from './models/BookClub.js'
import BookReview from './models/BookReview.js'

// test 
 

// user model

app.get('/test-user', async (req, res) => {
  try {
    const newUser = await User.create({
      email: 'test@example.com',
      name: 'test',
      password: 'password123' 
    })
    res.json(newUser)
  } catch (err) {
    console.log(err)
    res.status(500).send('Error creating user')
  }
})

// book club model 


app.get('/test-bookclub', async (req, res) => {
  try {
    const user = await User.findOne() 
    const club = await BookClub.create({
      name: 'Whiskey & Words',
      members: [user._id],
      createdBy: user._id
    })
    res.json(club)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error creating book club')
  }
})

// book review 

app.get('/test-bookreview', async (req, res) => {
    try {
      const user = await User.findOne() 
      const club = await BookClub.findOne()
      const review = await BookReview.create ({
        bookName:'Orbital', 
        reviewText:'Orbital is rubbish.', 
        tags: ['sci-fi'],
        reviewer: user._id,
        bookClub: club._id,
      })
      res.json(review)
    } catch (err) {
      console.error(err)
      res.status(500).send('Error creating book review')
    }
})


// 404 handler
app.use ((req, res) =>{
  res.status(404).render('not-found.ejs')
})














