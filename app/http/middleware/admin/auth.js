function auth (req, res, next) {
    //console.log(req.user.role)
    if(req.isAuthenticated && (req.user.role=="admin")){
        return next()
    }

    res.redirect('/')
}

module.exports = auth