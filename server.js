



import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'
import methodOverride from 'method-override'
import session from 'express-session'
import MongoStore from 'connect-mongo'
// import passUserToView from './middleware/passUserToView.js'
// import passErrorToView from './middleware/passErrorToView.js'


mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB Atlas'));

// ! Variables
const app = express()
const port = process.env.PORT || 3000