function auth (req, res, next) {
    if(req.isAuthenticated){
        return next()
    }
    else{
        res.redirect('/')
    }


}

module.exports = auth