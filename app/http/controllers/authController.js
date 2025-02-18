const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController() {
    const _getRedirectUrl = (req) => {
        //console.log('insideredirecturl')
        //console.log(req.user)
        return req.user.role === 'admin'? 'admin/orders' : 'customer/orders'
    }
    return {
        login(req, res) {
            res.render('auth/login')
        },

        loginPost(req, res, next) {
            const {email, password} = req.body
            if(!email || !password){
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }            
            passport.authenticate('local', (err, user, info ) => {
                if(err){
                    req.flash('error', info.message)
                    return next(err)
                }

                if(!user){
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }

                req.logIn(user, (err) => {
                    if(err){
                        req.flash('error', info .message)
                        return next(err)
                    }

                    return res.redirect(_getRedirectUrl(req))
                })
            })(req, res, next)
          //  res.render('auth/login')
        },

        register(req, res) {
            res.render('auth/register')
        },

        async registerPost(req, res) {
            const {name, email, password} = req.body
            if(!name || !email || !password){
                req.flash('error', 'All fields are required')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }

            // check if email exists

            User.exists({email: email}, (err, result) =>{
                if(result){
                    req.flash('error', 'Email already taken')
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect('/register')
                }
            })

            // Hash Password

            const hashedPassword = await bcrypt.hash(password, 10)

            // Create a user

            const user = new User({
                name,
                email,
                password: hashedPassword
            })

            user.save().then((user) => {
                //login
                return res.redirect('/')
            }).catch(err => {
                req.flash('error','Something went wrong')
                return res.redirect('/register')
            })

            //console.log(req.body )
        },

        logout(req, res) {
            req.logOut()

            return res.redirect('/login')
        }
    }
}

module.exports = authController