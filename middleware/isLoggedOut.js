export default function isLoggedOut(req, res, next) {
  if (!req.session.user) {
    return next()
  }
  return res.redirect('/bookreviews')
}