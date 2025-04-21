// This middelware function will deny access to any unauthenticed user
export default function isLoggedIn(req,res,next) {
    if (req.session.user) {
        return next()
    }
    return res.redirect('/auth/login')
}