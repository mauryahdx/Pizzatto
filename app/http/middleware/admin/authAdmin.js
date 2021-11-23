function authAdmin (req, res, next) {
    //console.log("inside admin middleware")
    if(req.user){
        if(req.isAuthenticated && (req.user.role=='admin')){
            return next()
        }
    }


    res.redirect('/')
}

module.exports = authAdmin