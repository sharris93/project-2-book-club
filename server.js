import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'
import methodOverride from 'method-override'
import session from 'express-session'
import MongoStore from 'connect-mongo'
// import passUserToView from './middleware/passUserToView.js'
// import passErrorToView from './middleware/passErrorToView.js'

// Routers 


// Variables

const app = express()
const port = process.env.PORT || 3000

// Middleware

app.use(morgan('dev'))

// Routes
// Home page
app.get('/', (req,res) => {
return res.render('index.ejs')
})

// Users (register/login/profile)
// app.use('/', authRouter)
// app.use('/', userRouter)


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

















