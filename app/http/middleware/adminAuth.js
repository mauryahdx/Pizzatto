function auth (req, res, next) {
    if(!req.isAuthenticated && req.user.role=='admin'){
        return next()
    }

    res.redirect('/')
}

module.exports = authAdmin