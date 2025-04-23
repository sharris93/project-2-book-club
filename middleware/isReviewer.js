import BookReview from '../models/BookReview.js'
import mongoose from 'mongoose'

export default async function isReviewer(req, res, next) {
  const { bookreviewId } = req.params

  if (!mongoose.isValidObjectId(bookreviewId)) return res.status(400).send('Invalid review ID')

  const bookreview = await BookReview.findById(bookreviewId)
  if (!bookreview) return res.status(404).send('Review not found')

  if (bookreview.reviewer.toString() !== req.session.user._id.toString()) {
    return res.status(403).send('Not authorized')
  }

  return next()
}