import serverless from 'serverless-http'
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'
import methodOverride from 'method-override'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passUserToView from '../../middleware/passUserToView.js'
import passErrorToView from '../../middleware/passErrorToView.js'
import bookReviewsRouter from '../../controllers/bookreviews.js'
import authController from '../../controllers/auth.js'
import userRouter from '../../controllers/users.js'
import User from '../../models/User.js'
import BookClub from '../../models/BookClub.js'
import BookReview from '../../models/BookReview.js'
import bodyParser from '../../middleware/bodyParser.js'

// Variables

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(methodOverride('_method'))
app.use(bodyParser)
app.use((req,res,next) =>{
console.log(req.method + " " + req.url)
console.log(req.body)
console.log("content type", req.headers['content-type'])
next()

})


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  })
}))
app.use(express.static('public'))

app.use(passUserToView)
app.use(passErrorToView)
app.use('/', bookReviewsRouter)
app.use('/', authController)
app.use('/', userRouter)

// Routes
// Home page
app.get('/', (req,res) => {
return res.render('index.ejs', {

})
})




// 404 handler
app.use ((req, res) =>{
  res.status(404).render('not-found.ejs')
})

export const handler = serverless(app)














